openerp.customer_launch = function(instance, local) {
    var _t = instance.web._t,
        _lt = instance.web._lt;
    var QWeb = instance.web.qweb;

    local.HomePage = instance.Widget.extend({
        template: "HomePage",

        init : function(view, code){
			this._super(view, code);

		},
        start: function () {
            var self = this;
            var my_widget = this.createList();
            var my_widget_2 = this.createList2();
            var company_list = this.company_list();
            self.PlaySound();


            setInterval(function () {
                window.location.reload(false);
            }, 40000);

        },

        createList: function(){
            var my_widget = new local.ServiceList(this);
                my_widget.appendTo(this.$(".cust_launch"));
                return my_widget;
        },

        createList2: function(){
            var my_widget = new local.ServiceList2(this);
                my_widget.appendTo(this.$(".cust_launch2"));
                return my_widget;
        },

        company_list: function(){
            var my_widget = new local.CompanyList(this);
                my_widget.appendTo(this.$("#service_name_div"));
                return my_widget;
        },

        PlaySound: function() {
            var audio = new Audio();
            audio.src = openerp.session.url("/customer_launch/static/src/audio/alert.wav");
            audio.play();
        }
    });

    local.ServiceList = instance.Widget.extend({
        template: 'ServiceList',

        start: function () {
            var self = this;
            return new instance.web.Model('customer.launch')
                .query(['name', 'customer_id','vehicle_details','state','service_type_id'])
                .filter([ ['state', 'in', ['2_service']],['company_id','=',self.session.company_id] ])
                .limit(100)
                .all()
                .then(function (results) {
                    _(results).each(function (item) {
                        self.$el.append(QWeb.render('ServiceVehicle', {item: item}));
                    })
                    
                    if($('#owl-demo .item').length > 0){

						if((results.length) < 2){
							$(self.$el[0]).owlCarousel({
								items:4,
								loop:false,
								margin:5,
								autoplay:true,
								autoplayTimeout:3000,
								autoplayHoverPause:false,

								stagePadding:10,
								smartSpeed:1600,
							});
						}
						if((results.length) >= 2){
							$(self.$el[0]).owlCarousel({
								items:4,
								loop:true,
								margin:5,
								autoplay:true,
								autoplayTimeout:3000,
								autoplayHoverPause:false,

								stagePadding:10,
								smartSpeed:1600,
							});
						}
						
						
					}

                    
                });
        },
    });

    local.ServiceList2 = instance.Widget.extend({
        template: 'ServiceList2',

        start: function () {
            var self = this;
            return new instance.web.Model('customer.launch')
                .query(['name', 'customer_id','vehicle_details','state','service_type_id'])
                .filter([ ['state', 'in', ['3_ready']],['company_id','=',self.session.company_id] ])
                .limit(100)
                .all()
                .then(function (results) {
                    _(results).each(function (item) {
                        self.$el.append(QWeb.render('ServiceVehicle2', {item: item}));
                    })
                    
                    if($('#owl-demo2 .item2').length > 0){
						console.log("QQQQQQQ",results.length);
						if((results.length) < 2){
							$(self.$el[0]).owlCarousel({
								items:4,
								loop:false,
								margin:5,
								autoplay:true,
								autoplayTimeout:3000,
								autoplayHoverPause:false,

								stagePadding:10,
								smartSpeed:1600,
								//rtl:true
							});
						}
						if((results.length) >= 2){
							$(self.$el[0]).owlCarousel({
								items:4,
								loop:true,
								margin:5,
								autoplay:true,
								autoplayTimeout:3000,
								autoplayHoverPause:false,

								stagePadding:10,
								smartSpeed:1600,
							});
						}
						
						
							
					}
                    
                });
        },
    });

    local.CompanyList = instance.Widget.extend({
        template: 'CompanyList',

        start: function () {
            var self = this;
            return new instance.web.Model('res.company')
                .query(['rml_header1','name','phone','fax','email','website','logo'])
                .filter([ ['id','=',self.session.company_id] ])
                .limit(10)
                .all()
                .then(function (results) {
                    _(results).each(function (item) {
                        self.$el.append(QWeb.render('CompanyDetails', {company: item}));
                    })

                });
        },
    });

    instance.web.client_actions.add('customer.launch', 'instance.customer_launch.HomePage');
}
