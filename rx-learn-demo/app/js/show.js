(function(){
    var mock = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1492658543&di=aa594e7a45def8ff6635f8efbd12f6bb&imgtype=jpg&er=1&src=http%3A%2F%2Fpic2.ooopic.com%2F11%2F40%2F61%2F73b1OOOPICe9.jpg";

    //获取展示数据
    var _getShowData = function(){
        $.ajax({
            url: "",
            data: {},
            success: function(res) {
                res = {success: true, data: [mock]}; //测试数据，正式开发请去掉
                if (res.success) {
                    for (var i = 0; i < res.data.length; i++) {
                        $("#container").append($("<img width='100%' src='" + res.data[i] + "'/>"))
                    }
                } else {
                    weui.alert(res.message)
                }
            },
            error: function(){
                weui.alert("请求出错请联系管理员")
            }
        })
    }
    _getShowData();
})()