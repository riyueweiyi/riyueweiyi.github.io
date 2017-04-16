(function () {
    $('.redbutton').click(function () {
        $('.red').addClass('shake-chunk');

        setTimeout(function () {
            //获取领取金额
            $.ajax({
                url: "",
                data: {},
                success: function (res) {
                    //mock数据，对接时去掉下面这句话
                    res = { success: true, price: 1.88 }
                    if (res.success) {
                        $('.red').removeClass('shake-chunk');
                        $('.redbutton').css("display", "none");
                        $('.red > span').css("background-image", "url(./img/red-y.png)");
                        $(".surprises").hide();
                        $("#prize").text(res.price);

                        $('.red-jg').css("display", "block");
                        $("body").addClass('isOpen')
                    } else {
                        weui.alert(res.message)
                    }
                }
            })
        }, 300);
    });

    //完成wx.config，执行这里  
    wx.ready(function () {
        //分享到朋友圈  
        wx.onMenuShareTimeline({
            title: '领取现金红包', // 分享标题  
            link: window.location.href,
            imgUrl: "", // 分享图标  
            success: function () {
                // 分享成功执行此回调函数  
                weui.alert('success');
                //红包到账
                $.ajax({
                    url: "",
                    data: {},
                    success: function (res) {

                    }
                })
            },
            cancel: function () {
                weui.alert('cancel');
            }
        });

        //分享给朋友  
        wx.onMenuShareAppMessage({
            title: '领取现金红包', // 分享标题  
            desc: '领取现金红包',
            link: window.location.href,
            imgUrl: "", // 分享图标  
            trigger: function (res) {
                // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回  
            },
            success: function (res) {
                // 分享成功执行此回调函数  
                weui.alert('已分享');
                //红包到账
                $.ajax({
                    url: "",
                    data: {},
                    success: function (res) {

                    }
                })
            },
            cancel: function (res) {
                weui.alert('已取消');
            },
            fail: function (res) {
                alert(JSON.stringify(res));
            }
        });
    })

})()
