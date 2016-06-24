$(function () {

    var feedMyGoodsInit = {

        OLD_DATA: [],

        NEW_DATA: [],

        /**
         * 初始化数据
         */
        initData: function () {
            var own = this;

            own.initEvent();

            $.when(own.getOldData(), own.getNewData()).done(function () {
                own.addEmptyDom();
                own.compareData();
            });
        },

        addEmptyDom: function () {
            var html = '',
                oldLen = this.OLD_DATA.length,
                newLen = this.NEW_DATA.length;

            if (oldLen > newLen) {
                for (var i = 0, len = (oldLen - newLen); i < len; i++) {
                    html += '<tr style="height: 34px;" class="cmg-goodstr"><td class="color"></td>' +
                        '<td class="standard"></td>' +
                        '<td class="salePrice"></td></tr>';
                }
                $(".standardtbody1").append(html);
            } if (!oldLen < newLen) {
                for (var i = 0, len = (newLen - oldLen); i < len; i++) {
                    html += '<tr style="height: 34px; class="cmg-goodstr"><td class="color"></td>' +
                        '<td class="standard"></td>' +
                        '<td class="salePrice"></td></tr>';
                }
                $(".standardtbody1").append(html);
            }
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

                    if (data.material) {
                        $('div.good1').hide();
                        $('div.good2').hide();
                        $('div.material').show();
                    } else {
                        $('div.good1').show();
                        $('div.good2').show();
                        $('div.material').hide();
                    }

                    var productGood = data.productGoodsUpts || data.productGoods,
                        productPhoto = data.productInfoPhotoUpts || data.productInfoPhotos;

                    own.showHtml().showGoodsUpt(option.standardBody, productGood);

                    own.showHtml().showPhoto(option.goodsPicUpload, productPhoto);
                },

                showGoodsUpt: function (obj, data) {
                    var html = '', goodsUptLen = data.length;
                    for (var i = 0; i < goodsUptLen; i++) {
                        html += '<tr class="cmg-goodstr"><td class="color">' + data[i].color + '</td>' +
                            '<td title="' + data[i].standard + '" class="standard">' + data[i].standard + '</td>' +
                            '<td class="salePrice">' + data[i].salePrice + '</td></tr>';
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
        getNewData: function () {
            var own = this;

            return $.commonAjax({
                type: "GET",
                url: 'getProductInfoUpt',
                operationId: session.goods_showMyGoods_uptId,
                success: function (data) {
                    own.NEW_DATA = data.data && data.data.productGoodsUpts;
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
        getOldData: function () {
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

                    own.OLD_DATA = data.data && data.data.productGoods;

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
            $(".smg-basicInfo1, .good1").find(".form-horizontal").find("p").each(function (i) {
                var t1 = $(this).text(),
                    t2 = $($(".smg-basicInfo2").find(".form-horizontal").find("p")[i]).text(),
                    t3 = $($(".good2").find(".form-horizontal").find("p")[i]).text();
                if (t1 != t2) {
                    $($(".smg-basicInfo1").find(".form-horizontal").find("p")[i]).css({
                        "background": "#f0d6d0"
                    });
                }
                if (t1 != t3) {
                    $($(".good1").find(".form-horizontal").find("p")[i]).css({
                        "background": "#f0d6d0"
                    });
                }
            });

            var $standardt = $('tbody.standardtbody1 tr'),
                newLen = this.NEW_DATA.length,
                oldLen = this.OLD_DATA.length,
                len = oldLen > newLen ? oldLen : newLen;
            for (var i = 0; i < len; i++) {
                var color = {"background": "#f0d6d0"},
                    newData = this.NEW_DATA[i],
                    oldData = this.OLD_DATA[i],
                    $tr = $($standardt.get(i));

                (oldData && oldData.color) != (newData && newData.color) && $tr.find('.color').css(color);
                (oldData && oldData.standard) != (newData && newData.standard) && $tr.find('.standard').css(color);
                (oldData && oldData.salePrice) != (newData && newData.salePrice) && $tr.find('.salePrice').css(color);
            }
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