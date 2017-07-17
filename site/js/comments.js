window.ixs = window.ixs || {};

window.ixs.comments = {
    init: function () {
        this.initScrollAnimate();
        this.submit();
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
    submit: function () {
        $("#submit").off("click").on("click", function (e) {
            e.preventDefault();
            var data = {
                name: $("#name").val(),
                category: $("#category").val(),
                phone: $("#phone").val(),
                email: $("#email").val(),
                company: $("#company").val(),
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

            $.ajax({
                cache: false,
                url: 'http://www.xishouiot.com/smtp/SendEMail.ashx',
                dataType: "text",
                type: 'post',
                data: {
                    to: 'presales@xishouiot.com',
                    subject: '官网收到新的客户联系信息',
                    content: '姓名：' + data.name +
                    '<br/>手机：' + data.phone +
                    '<br/>电子邮箱：' + data.email +
                    '<br/>公司：' + data.company +
                    '<br/>类别：' + data.category +
                    '<br/>留言：' + data.desc,
                    successfulMsg: '感谢您的关注，我们会尽快联系您！',
                    failedMsg: '感谢您的关注，请完善联系人信息！',
                    name: data.name,
                    company: data.company,
                    telphone: data.phone,
                    email: data.email
                }
            }).done(function (data) {
                if (!!data) {
                    alert(data);
                    $("#comment-form")[0].reset();
                }
            }).fail(function (result, status) {
                console.log(result, status);
            });
        });
    }
}

ixs.comments.init();