window.ixs = window.ixs || {};

window.ixs.product = {
    init: function () {
        this.tpl = $("#template").html();
        this.container = $("#tpl-container");
        this.tabs = $("#ixs-tabs > li");

        this.data = [
            {
                imgSrc: "images/product/pic_item_1.jpg",
                name: "授权自助机",
                text: "作为酒店的核心环节，PMS授权是流程中不可缺少的一环。针对厂家对接PMS的痛点，栖舍云推出了这款产品"
            },
            {
                imgSrc: "images/product/pic_item_2.jpg",
                name: "酒店服务器",
                text: "为了酒店设备更加稳定的运行，为了酒店数据更加安全的管理。栖舍云推出了这款工业级的酒店服务器"
            },
            {
                imgSrc: "images/product/pic_item_3.jpg",
                name: "智能主机",
                text: "为了酒店设备更加稳定的运行，为了酒店数据更加安全的管理。栖舍云推出了这款工业级的酒店服务器"
            },
            {
                imgSrc: "images/product/pic_item_4.jpg",
                name: "门锁控制器",
                text: "为了酒店设备更加稳定的运行，为了酒店数据更加安全的管理。栖舍云推出了这款工业级的酒店服务器"
            },
            {
                imgSrc: "images/product/pic_item_5.jpg",
                name: "智能取电",
                text: "为了酒店设备更加稳定的运行，为了酒店数据更加安全的管理。栖舍云推出了这款工业级的酒店服务器"
            },
            {
                imgSrc: "images/product/pic_item_6.jpg",
                name: "单火/零火触摸开关",
                text: "为了酒店设备更加稳定的运行，为了酒店数据更加安全的管理。栖舍云推出了这款工业级的酒店服务器"
            },
            {
                imgSrc: "images/product/pic_item_7.jpg",
                name: "门磁传感器",
                text: "为了酒店设备更加稳定的运行，为了酒店数据更加安全的管理。栖舍云推出了这款工业级的酒店服务器"
            },
            {
                imgSrc: "images/product/pic_item_8.jpg",
                name: "红外人体感应",
                text: "为了酒店设备更加稳定的运行，为了酒店数据更加安全的管理。栖舍云推出了这款工业级的酒店服务器"
            },
            {
                imgSrc: "images/product/pic_item_9.jpg",
                name: "窗帘控制电机",
                text: "为了酒店设备更加稳定的运行，为了酒店数据更加安全的管理。栖舍云推出了这款工业级的酒店服务器"
            }
        ];
        this.toggle();
    },
    toggle: function () {
        var self = this;
        
        this.tabs.off("click").on("click", function () {
            var _this = $(this);

            if (_this.hasClass('active')) {
                return;
            }
            _this.siblings('.active').removeClass('active');
            _this.addClass('active');
            self.render(function(){
                self.gotoDetail.call(self);
            });
        })
    },
    gotoDetail(){
        this.container.find('.ixs-btn').off('click').on('click', function(){
            alert(1);
        });
    },
    render: function(cb) {
        this.container.html(this.attachTemplateToData(this.tpl, this.data));
        $.isFunction(cb) && cb();
    },
    attachTemplateToData: function (template, data) {
        var i = 0,
            len = data.length,
            fragment = '';

        // 遍历数据集合里的每一个项，做相应的替换
        function replace(obj) {
            var t, key, reg;

            //遍历该数据项下所有的属性，将该属性作为key值来查找标签，然后替换
            for (key in obj) {
                reg = new RegExp('{{' + key + '}}', 'ig');
                t = (t || template).replace(reg, obj[key]);
            }
            return t;
        }

        for (; i < len; i++) {
            fragment += replace(data[i]);
        }

        return fragment;
    }
}

ixs.product.init();