window.ixs = window.ixs || {};

window.ixs.join = {
    init: function () {
        this.initScrollAnimate();
        this.toggle();
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
    toggle: function () {
        $("#jobs li").off("click").on("click", function () {
            var _this = $(this),
                siblingsActiveEle = _this.siblings('.active');

            if (_this.hasClass('active')) {
                _this.find('.job-desc').slideUp(function () {
                    _this.removeClass('active');
                });
                return;
            }
            siblingsActiveEle.find('.job-desc').slideUp(function () {
                siblingsActiveEle.removeClass('active');
            });
            _this.addClass('active').find('.job-desc').slideDown();
        })
    }
}

ixs.join.init();