$(function () {

    var feedMyGoodsInit = {

        OLD_DATA: '',

        NEW_DATA: '',

        /**
         * 初始化数据
         */
        initData: function () {
            var own = this;

            own.initEvent();

            $.when(own.getOldData(), own.getNewData()).done(function () {
                own.compareData();
            });
        },

        /**
         * 初始化绑定事件
         */
        initEvent: function () {
            var own = this;

            $(".fmg-back").bind("click", function () {
                derict(this, "amendmentInfo", "nochangeurl");
            });
            $(".fmg-ok").bind("click", function () {
                own.operationData();
            });
        },

        /**
         * 展示页面内容
         * @returns {{showController: showController, showUptOrm: showUptOrm, showGoodsUpt: showGoodsUpt, showPhoto: showPhoto}}
         */
        showHtml: function () {
            var own = this;

            return {

                showController: function (data, option) {
                    $(option.setData).setPageData(data);
                    $("#" + option.priceType).text(
                        (JSON.parse(session.price_tpye),
                            $("#" + option.priceType).text())
                    );
                    $("#" + option.lvInfo).text(
                        setListSystemCode(JSON.parse(session.product_lv),
                            $("#" + option.lvInfo).text())
                    );

                    // 显示
                    own.showHtml().showUptOrm(option.goodsAttrContent, data.productInfoAttrUptORMs || data.productInfoAttrORMs);

                    own.showHtml().showGoodsUpt(option.standardBody, data.productGoodsUpts || data.productGoods);

                    own.showHtml().showPhoto(option.goodsPicUpload, data.productInfoPhotoUpts || data.productInfoPhotos);
                },

                showUptOrm: function (obj, data) {
                    var html = '', uptOrmLen = data.length;
                    for (var i = 0; i < uptOrmLen; i++) {
                        html += '<div class="form-group required smg-base-attr">' +
                            '       <label class="col-sm-2 control-label">' + data[i].productAttribute.attrNameFront + '</label>' +
                            '       <div class="col-sm-4">' +
                            '           <p class="col-sm-10 form-control-static" attrValueId="' + data[i].attrValueId + '">' +
                                            data[i].productAttributeValue.valueName +
                            '           </p>' +
                            '       </div></div>';
                    }
                    $("." + obj).append(html);
                },

                showGoodsUpt: function (obj, data) {
                    var html = '', goodsUptLen = data.length;
                    for (var i = 0; i < goodsUptLen; i++) {
                        html += '<tr class="cmg-goodstr"><td>' + data[i].color + '</td>' +
                            '<td title="' + data[i].standard + '">' + data[i].standard + '</td>' +
                            '<td>' + data[i].salePrice + '</td></tr>';
                    }
                    $("." + obj).append(html);
                },

                showPhoto: function (obj, data) {
                    var html = '', photoLen = data.length;
                    for (var i = 0; i < photoLen; i++) {
                        html += '<li class="goodsPic"><img src="' + data[i].picUrl + '"/></li>';
                    }
                    $("." + obj).append(html);
                }
            };
        },

        /**
         * 获取原始数据
         * @returns {*}
         */
        getOldData: function () {
            var own = this;

            return $.commonAjax({
                type: "GET",
                url: 'getProductInfoUpt',
                operationId: session.goods_showMyGoods_uptId,
                success: function (data) {
                    own.showHtml().showController(data.data, {
                        setData: '.smg-basicInfo1, .smg-base-attr1',
                        priceType: 'priceType1',
                        lvInfo: 'lvInfo1',
                        goodsAttrContent: 'goodsAttr-content1',
                        standardBody: 'standardtbody1',
                        goodsPicUpload: 'goodsPic-upload1'
                    });
                }
            });
        },

        /**
         * 获取最新数据
         * @returns {*}
         */
        getNewData: function () {
            var own = this;

            return $.commonAjax({
                type: "GET",
                url: 'getProductInfo',
                operationId: session.goods_showMyGoods_productId,
                success: function (data) {

                    if (!data.data) {
                        alert("该商品已经删除!") && derict(this, "amendmentInfo", "nochangeurl");
                        return;
                    }

                    own.showHtml().showController(data.data, {
                        setData: '.smg-basicInfo2,.smg-base-attr2',
                        priceType: 'priceType2',
                        lvInfo: 'lvInfo2',
                        goodsAttrContent: 'goodsAttr-content2',
                        standardBody: 'standardtbody2',
                        goodsPicUpload: 'goodsPic-upload2'
                    });
                }
            });
        },

        /**
         * 数据对比
         */
        compareData: function () {
            $(".smg-basicInfo1").find(".form-horizontal").find("p").each(function (i) {
                var t1 = $(this).text();
                var t2 = $($(".smg-basicInfo2").find(".form-horizontal").find("p")[i]).text();
                if (t1 != t2) {
                    $($(".smg-basicInfo2").find(".form-horizontal").find("p")[i]).css({
                        "background": "#f0d6d0"
                    });
                    $(".json_title0").css({
                        "color": "#C13535"
                    });
                }
            });
        },

        /**
         * 处理请求
         */
        operationData: function () {

            var auditData = function () {
                var audit = {
                    "uptIds": [session.goods_showMyGoods_uptId],
                    "reviewStatus": $('.reviewStatus').find("input[name='audit']:checked").val(),
                    "remark": $('.remark').val()
                };
                $.commonAjax({
                    url: 'reviewProductInfo',
                    type: "POST",
                    data: audit,
                    success: function (data) {
                        if (data.ok) {
                            popTips("处理成功", "success");
                            derict(this, "amendmentInfo", "nochangeurl");
                        } else {
                            popTips("处理失败", "warning");
                        }
                    }
                });
            };

            $('.pop').loadTemp("popAudit", "nochangeurl", function () {
                $('.pop').on('click', '.btn-sure', function () {
                    auditData();
                    $('.pop').hide();
                    $('.pop').off('click', '.btn-sure');
                    $('.pop').off('click', '.btn-cancel');
                }).on('click', '.btn-cancel', function () {
                    $('.pop').hide();
                    $('.pop').off('click', '.btn-sure');
                    $('.pop').off('click', '.btn-cancel');
                });
            });
        }
    };

    feedMyGoodsInit.initData();
});