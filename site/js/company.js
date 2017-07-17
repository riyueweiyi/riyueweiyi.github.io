window.ixs = window.ixs || {};

window.ixs.company = {
    init: function () {
        this.initScrollAnimate();
      
    },
     initScrollAnimate: function(){
        AOS.init({
            offset: 200,
            duration: 600,
            easing: 'ease-in-sine',
            disable: 'mobile',
            once: true
        });
    },
  
}

ixs.company.init();