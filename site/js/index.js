window.ixs = {
    init: function () {
        this.initScrollAnimate();
        this.submit();
        this.toggle();
        this.initResponsiveSlides("#slider2", {
            auto: true,
            pager: true,
            speed: 500,
            namespace: "transparent-btns"
        });
        this.initResponsiveSlides("#slider1", {
            auto: true,
            pager: true,
            speed: 500,
            maxwidth: 1200,
            namespace: "centered-btns"
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
    initResponsiveSlides: function (id, options) {
        return $(id).responsiveSlides(options);
    },
    toggle: function () {
        $("#ixs-list .ixs-list-item").off("click").on("click", function (e) {
            var _this = $(this);

            if (_this.hasClass('active')) {
                return;
            }
            _this.siblings('.active').removeClass('active');
            _this.addClass('active');
        })
    },
    submit: function () {
        $("#submit").off("click").on("click", function (e) {
            e.preventDefault();
            var data = {
                name: $("#name").val(),
                sex: $("input[name=sex]").val(),
                phone: $("#phone").val(),
                email: $("#email").val(),
                city: $("#city").val(),
                desc: $("#desc").val(),
            };

            if (!/^[\u4e00-\u9fa5 ]{2,20}$/.test(data.name)) {
                alert('请输入正确的姓名');
                return;
            }
            if (!(/^1[34578]\d{9}$/.test(data.phone))) {
                alert('请输入正确的联系方式');
                return;
            }
            if (data.email && !/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(data.email)) {
                alert('请输入正确的邮箱');
                return;
            }
            if (!/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/.test(data.city)) {
                alert('请输入正确的城市名');
                return;
            }
            
            $.ajax({
                cache: false,
                url: 'http://www.xishouiot.com/smtp/SendEMail.ashx',
                dataType: "text",
                type: 'post',
                data: {
                    to: 'presales@xishouiot.com',
                    subject: '官网收到新的客户联系信息',
                    content: '姓名：' + data.name +
                    '<br/>性别：' + data.sex == 0 ? '男' : '女' +
                    '<br/>手机：' + data.phone +
                    '<br/>电子邮箱：' + data.email +
                    '<br/>城市：' + data.city +
                    '<br/>留言：' + data.desc,
                    successfulMsg: '感谢您的关注，我们会尽快联系您！',
                    failedMsg: '感谢您的关注，请完善联系人信息！',
                    name: data.name,
                    company: "",
                    telphone: data.phone,
                    email: data.email
                }
            }).done(function (data) {
                if (!!data) {
                    alert(data);
                    $("#contact-form")[0].reset();
                }
            }).fail(function (result, status) {
                console.log(result, status);
            });
        });
    }
}

ixs.init();