import logging
from datetime import datetime, timedelta, date
from dateutil.relativedelta import relativedelta
from odoo import api, fields, models, tools, SUPERUSER_ID
from odoo.tools.translate import _
from odoo.exceptions import UserError, AccessError


class ServiceType(models.Model):
    _name = 'service.type'
    _description = 'service type'

    name = fields.Char(string='Name', required=True)
    description = fields.Text(string='Description')


class CustomerLaunch(models.Model):
    _name = 'customer.launch'
    _order = 'id desc'
    _inherit = ['mail.thread', 'ir.needaction_mixin']
    _description = 'Customer launch screen model'

    @api.one
    def action_queue(self):
        self.state = '1_queue'

    @api.one
    def action_service(self):
        self.state = '2_service'

    @api.one
    def action_ready(self):
        self.state = '3_ready'

    @api.one
    def action_complete(self):
        self.state = '4_completed'

    @api.multi
    @api.constrains('odometer_reading')
    def check_vehicle_number(self):
        for rec in self:
            if not rec.odometer_reading:
                raise UserError(_('Odometer reading must be filled.'))

    name = fields.Char(string='Number', readonly=True)
    subject = fields.Char(string='Subject', required=True)
    customer_id = fields.Many2one('res.partner', string='Customer', required=True,track_visibility='onchange')
    vehicle_details = fields.Char(string='Vehicle number', required=True,track_visibility='onchange')
    email = fields.Char(related='customer_id.email',string='Email')
    mobile = fields.Char(related='customer_id.mobile',string='Mobile',required=True,track_visibility='onchange')
    service_type_id = fields.Many2many('service.type', string='Service type', required=True,track_visibility='onchange')
    salesperson_id = fields.Many2one('res.users', string='Sales person', required=True, default=lambda self: self.env.user)
    odometer_reading = fields.Integer(string='Running kilometer', required=True,track_visibility='onchange')
    software_ref = fields.Char(string='Software ref',track_visibility='onchange')
    priority = fields.Selection([('0','Low'),('1','Medium'),('2','High'),('3','Very high')],string='Priority',default='0')
    color = fields.Integer('Color Index', default=0)
    note = fields.Text(string='Note')
    company_id = fields.Many2one('res.company',string='Company',default=lambda self: self.env.user.company_id.id)
    state = fields.Selection([('1_queue','On queue'),
                              ('2_service','On service'),
                              ('3_ready','Ready for pickup'),
                              ('4_completed','Completed')], string='Status',default='1_queue',
                             track_visibility='onchange')

    @api.model
    def create(self, vals):
        vals['name'] = self.env['ir.sequence'].next_by_code('customer.launch') or _('New')
        return super(CustomerLaunch,self).create(vals)



