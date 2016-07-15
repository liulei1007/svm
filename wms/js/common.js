/**
 * Created by lenovo on 2016/7/05.
 */
// 公用请求方法
(function ($) {

    var commonData = {

        init: function () {

            this.commonFun('price_tpye', function (data) {
                if (data.ok) {
                    $.session.price_tpye = JSON.stringify(data);
                } else {
                    $.plumeLog("获取price_tpye信息失败:" + data.resDescription);
                }
            });

            this.commonFun('product_lv', function (data) {
                if (data.ok) {
                    $.session.product_lv = JSON.stringify(data);
                } else {
                    $.plumeLog("获取price_tpye信息失败:" + data.resDescription);
                }
            });

            this.commonFun('standard_unit', function (data) {
                if (data.ok) {
                    $.session.standard_unit = JSON.stringify(data);
                } else {
                    plumeLog("获取standard_unit信息失败:" + data.resDescription);
                }
            });

            this.commonFun('img_url', function (data) {
                if (data.ok) {
                    $.session.img_url = JSON.stringify(data);
                } else {
                    plumeLog("获取price_tpye信息失败:" + data.resDescription);
                }
            });

            this.commonFun('unit', function (data) {
                if (data.ok) {
                    $.session.unit = JSON.stringify(data);
                } else {
                    plumeLog("获取price_tpye信息失败:" + data.resDescription);
                }
            });
        },

        commonFun: function (operationId, fun) {
            $.commonAjax({
                type: "get",
                url: 'listSystemCode',
                operationId: operationId,
                requestType: true,
                success: function (data) {
                    typeof fun === 'function' && fun(data);
                }
            });

            return this;
        }
    };

    commonData.init();

})(jQuery);