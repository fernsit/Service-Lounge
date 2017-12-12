# -*- coding: utf-8 -*-
{
    'name': 'Customer Lounge',
    'version': '1.0',
    'category': 'Sales',
    'sequence': 5,
    'author': 'Ferns IT Team',
    'summary': 'Customer Lounge Screen For All Types Of Vehicle Service Centers',
    'price': 55.00,
    'currency': 'EUR',
    'images': ['images/main_1.png', 'images/main_2.png', 'static/src/img/main_screenshot.png'],
    'description': """
Customer Lounge Screen For All Types Of Vehicle Service Centers
==========================================

""",
    'website': '',
    'depends': [
        'base_setup',
        'base',
        'web',
        'mail'
    ],
    'data': [
             "security/launch_security.xml",
             "security/ir.model.access.csv",
             "views/customer_launch_view.xml",
             "data/sequence.xml",
             "views/customer_launch_assets.xml"
    ],
    'demo': [
    ],
    'qweb':['static/src/xml/customer_launch.xml'],
    'images': ['static/description/banner.jpg'],
    'installable': True,
    'application': True,
    'auto_install': False,
}
