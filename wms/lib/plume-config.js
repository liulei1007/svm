/**
 * Created by bus.zhang on 2016/7/4.
 */

(function ($) {

    var href = window.document.location + '',
        plumePath = href.substring(0, href.lastIndexOf('/') + 1);


    // 配置初始化js、css加载
    $.initOperation = {

        indexInit: function () {
            console.log("初始化plume-indexInit");
            Plume.resource().loadJs([
                plumePath + 'js/index.js'
            ]);
        },

        // ----弹出框----
        popTips_init: function () {
            console.log("初始化plume-indexInit");
            Plume.resource().loadJs([
                    plumePath + 'js/popTips.js'
            ]);
        },

        inventoriesManageInit: function () {
            console.log("初始化plume-demoInit");
            Plume.resource().loadJs([
                plumePath + 'js/inventoriesManage.js'
            ]);
        },

        receiptListShowInit: function () {
            console.log("初始化plume-demo1Init");
            Plume.resource().loadJs([
                    plumePath + 'js/receiptListShow.js'
            ]);
        },

        receiptManageInit: function () {
            console.log("初始化plume-demo1Init");
			Plume.resource().loadCss([
				plumePath + 'css/reciept_shipment.css'
			])
            Plume.resource().loadJs([
                    plumePath + 'js/receiptManage.js'
            ]);
        },

        shipmentDetailInit: function () {
            console.log("初始化plume-demo1Init");
            Plume.resource().loadJs([
                    plumePath + 'js/shipmentDetail.js'
            ]);
        },

        shipmentManageInit: function () {
            console.log("初始化plume-demo1Init");
			Plume.resource().loadCss([
				plumePath + 'css/reciept_shipment.css'
			])
            Plume.resource().loadJs([
                    plumePath + 'js/shipmentManage.js'
            ]);
        }
    };

})(jQuery);