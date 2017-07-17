var data = [
    {
        id: 1,
        imgSrc: "images/product/pic_item_1.jpg",
        name: "授权自助机",
        text: "作为酒店的核心环节，PMS授权是流程中不可缺少的一环。针对厂家对接PMS的痛点，栖舍云推出了这款产品"
    },
    {
        id: 2,
        imgSrc: "images/product/pic_item_2.jpg",
        name: "酒店服务器",
        text: "为了酒店设备更加稳定的运行，为了酒店数据更加安全的管理。栖舍云推出了这款工业级的酒店服务器"
    },
    {
        id: 3,
        imgSrc: "images/product/pic_item_3.jpg",
        name: "智能主机",
        text: "为了酒店设备更加稳定的运行，为了酒店数据更加安全的管理。栖舍云推出了这款工业级的酒店服务器"
    },
    {
        id: 4,
        imgSrc: "images/product/pic_item_4.jpg",
        name: "门锁控制器",
        text: "为了酒店设备更加稳定的运行，为了酒店数据更加安全的管理。栖舍云推出了这款工业级的酒店服务器"
    },
    {
        id: 5,
        imgSrc: "images/product/pic_item_5.jpg",
        name: "智能取电",
        text: "为了酒店设备更加稳定的运行，为了酒店数据更加安全的管理。栖舍云推出了这款工业级的酒店服务器"
    },
    {
        id: 6,
        imgSrc: "images/product/pic_item_6.jpg",
        name: "单火/零火触摸开关",
        text: "为了酒店设备更加稳定的运行，为了酒店数据更加安全的管理。栖舍云推出了这款工业级的酒店服务器"
    },
    {
        id: 7,
        imgSrc: "images/product/pic_item_7.jpg",
        name: "门磁传感器",
        text: "为了酒店设备更加稳定的运行，为了酒店数据更加安全的管理。栖舍云推出了这款工业级的酒店服务器"
    },
    {
        id: 8,
        imgSrc: "images/product/pic_item_8.jpg",
        name: "红外人体感应",
        text: "为了酒店设备更加稳定的运行，为了酒店数据更加安全的管理。栖舍云推出了这款工业级的酒店服务器"
    },
    {
        id: 9,
        imgSrc: "images/product/pic_item_9.jpg",
        name: "窗帘控制电机",
        text: "为了酒店设备更加稳定的运行，为了酒店数据更加安全的管理。栖舍云推出了这款工业级的酒店服务器"
    },
    {
        id: 10,
        imgSrc: "images/product/pic_item_10.jpg",
        name: "酒店门锁",
        text: "为了酒店设备更加稳定的运行，为了酒店数据更加安全的管理。栖舍云推出了这款工业级的酒店服务器"
    },
    {
        id: 11,
        imgSrc: "images/product/pic_item_11.jpg",
        name: "酒店音响",
        text: "为了酒店设备更加稳定的运行，为了酒店数据更加安全的管理。栖舍云推出了这款工业级的酒店服务器"
    }
];
window.ixs = window.ixs || {};

window.ixs.product = {
    init: function () {
        this.tpl = $("#template").html();
        this.doorTpl = $("#door-template").html();

        this.container = $("#tpl-container");
        this.tabs = $("#ixs-tabs > li");
        this.initScrollAnimate();
        this.data = data;
        this.toggle();

        this.gotoDetail()
        this.closeModal();
    },
    toggle: function () {
        var self = this;

        this.tabs.off("click").on("click", function () {
            var _this = $(this),
                hrefId = _this.data("href-id");

            $("#pagination").remove();
            if (_this.hasClass('active')) {
                return;
            }

            _this.siblings('.active').removeClass('active');
            _this.addClass('active');

            if (hrefId === "pic_item_10") {
                self.initDoorView(self);
                return;
            }
            self.container.removeClass('door');
            self.render(function () {
                $('html,body').animate({ scrollTop: $("#" + hrefId).offset().top - 30 }, 'slow');
                self.gotoDetail.call(self);
            });
        })
    },
    initPagination(self) {
        self.container.after("<div id='pagination'></div>");
        var num_entries = $("#hiddenresult div.result").length;

        function pageselectCallback(page_index, jq) {
            var new_content = $("#hiddenresult div.result:eq(" + page_index + ")").clone();
            $("#tpl-container").empty().prepend("<li class='title'>门锁</li>").append(new_content); //装载对应分页的内容
            $('html,body').animate({ scrollTop: $("#tpl-container").offset().top - 30 }, 'slow');
            self.gotoDoorDetail(self);
            return false;
        }
        // 创建分页
        $("#pagination").pagination(num_entries, {
            num_edge_entries: 1, //边缘页数
            num_display_entries: 4, //主体页数
            callback: pageselectCallback,
            items_per_page: 1 //每页显示1项
        });
    },
    initDoorView: function (self) {
        self.container.addClass('door');

        $('html,body').animate({ scrollTop: $("#tpl-container").offset().top - 30 }, 'slow');
        self.initPagination(self);
        self.gotoDoorDetail(self);
    },
    closeModal: function () {
        $('#close-modal').click(function () {
            $("#modal-container").removeClass('door-modal').addClass('out');
            $('body').removeClass('modal-active');
        });
    },
    initScrollAnimate: function () {
        AOS.init({
            offset: 200,
            duration: 600,
            easing: 'ease-in-sine',
            disable: 'mobile',
            once: true
        });
    },
    gotoDoorDetail: function (self) {
        self.container.find('.ixs-btn').off('click').on('click', function () {
            var id = $(this).data("id");

            $.get("./js/json/door.json").then(function (res) {
                var data = res.filter(function (item) {
                    return item.id == id;
                });

                var tmpl = '<div class="m-header"><img src="' + data[0].detailImg +
                    '" alt="">';

                tmpl += "</div><div class='door-product-paramster'><h3>特征参数</h3><ul>";
                for (var i = 0; i < data[0].parameter.length; i++) {
                    tmpl += '<li>' + data[0].parameter[i] + '</li>';
                }

                tmpl += "</ul></div>";
                $("#close-modal").text("x");
                $("#ixs-modal-content").html(tmpl);

                $('#modal-container').removeAttr('class').addClass('two door-modal');
                $('body').addClass('modal-active');
            });
        })
    },
    gotoDetail: function () {
        this.container.find('.ixs-btn').off('click').on('click', function () {
            var id = $(this).data("id");

            $.get("./js/json/product.json").then(function (res) {
                var data = res.filter(function (item) {
                    return item.id == id;
                });

                var tmpl = '<div class="m-header"><img src="' + data[0].images +
                    '" width="180px" alt=""><h2>' + data[0].name + '</h2><p>' +
                    data[0].desc + '</p></div><div class="m-content"><h3>产品特性</h3><ul>';

                for (var i = 0; i < data[0].feature.length; i++) {
                    tmpl += '<li>' + data[0].feature[i] + '</li>';
                }
                tmpl += "</ul ><h3>特征参数</h3><ul>";
                for (var i = 0; i < data[0].parameter.length; i++) {
                    tmpl += '<li>' + data[0].parameter[i] + '</li>';
                }

                tmpl += "</ul></div>";
                $("#close-modal").text("关闭窗口");
                $("#ixs-modal-content").html(tmpl);

                $('#modal-container').removeAttr('class').addClass('one');
                $('body').addClass('modal-active');
            })
        });
    },
    render: function (cb) {
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