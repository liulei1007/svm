/**
 * Created by bus.zhang on 2016/7/4.
 */

(function ($) {

    // 配置初始化js、css加载
    $.initOperation = {

        indexInit: function () {
            console.log("初始化plume-indexInit");
            Plume.resource().loadJs(['/wms/js/common.js', '/wms/js/index.js']);
        },

        inventoriesManageInit: function () {
            $.initOperation.indexInit();
            console.log("初始化plume-demoInit");
            Plume.resource().loadJs(['/wms/js/inventoriesManage.js']);
        },

        receiptListShowInit: function () {
            $.initOperation.indexInit();
            console.log("初始化plume-demo1Init");
            Plume.resource().loadJs(['/wms/js/receiptListShow.js']);
        },

        receiptManageInit: function () {
            $.initOperation.indexInit();
            console.log("初始化plume-demo1Init");
            Plume.resource().loadJs(['/wms/js/receiptManage.js']);
        },

        shipmentDetailInit: function () {
            $.initOperation.indexInit();
            console.log("初始化plume-demo1Init");
            Plume.resource().loadJs(['/wms/js/shipmentDetail.js']);
        },

        shipmentManageInit: function () {
            $.initOperation.indexInit();
            console.log("初始化plume-demo1Init");
            Plume.resource().loadJs(['/wms/js/shipmentManage.js']);
        }
    };

})(jQuery);