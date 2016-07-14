/**
 * Created by bus.zhang on 2016/7/4.
 */

(function ($) {

    // 配置初始化js、css加载
    $.initOperation = {

        indexInit: function () {
            console.log("初始化plume-indexInit");
            Plume.resource().loadJs(['/wms/js/json2.js', '/wms/js/base.js', '/wms/js/index.js']);
        },

        demoInit: function () {
            console.log("初始化plume-demoInit");
            Plume.resource().loadJs(['/wms/js/demo.js']);
        },

        demo1Init: function () {
            console.log("初始化plume-demo1Init");
            Plume.resource().loadJs(['/wms/js/demo1.js']);
        }
    };

})(jQuery);