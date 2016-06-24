$(function () {

    var showMyGoods = {

        // 规格参数
        standardUnit: [],

        /**
         * 初始化控制器
         */
        initData: function () {
            var own = this;

            formCtrl();

            this.bindEvent().getStandardUnit().done(function () {
                own.initDetail();
            });
        },

        /**
         * 初始化绑定页面事件
         */
        bindEvent: function () {
            $(".smg-back").bind("click", function () {
                derict(this, session.goods_back_page, "nochangeurl");

                return false;
            });

            return this;
        },

        /**
         * 获取规格参数数据
         * @returns {*}
         */
        getStandardUnit: function () {
            var own = this;
            return $.commonAjax({
                url: 'standardUnit',
                type: 'get',
                success: function (data) {
                    if (data.ok && data.data && data.data.length > 0) {
                        var data = data.data,
                            dataLen = data.length;

                        var obj;
                        for (var i = 0; i < dataLen; i++) {
                            obj = {};
                            obj.code = data[i].codeValueCode;
                            obj.name = data[i].codeValueName;
                            own.standardUnit.push(obj);
                        }
                    }
                }
            });
        },

        /**
         * 绑定图片事件
         */
        bingDataEvent: function () {
            // 绑定点击图片展示大图
            $(".showGoods").on("click", ".goodsPic img", function () {
                console.log("shiw");
                var imgSrc = $(this).attr("src");
                // 首先判断是否已经有大图显示
                if ($(".form-loading .media-show").html()) {
                    $(".form-loading .media-show img").attr("src", imgSrc);
                }
                else {
                    $(".form-loading").prepend('<div class="media-show"><span class="btn btn-close" onclick="closeBigImage()"></span><img src="' + imgSrc + '"></div>');
                }
            });
        },

        /**
         * 展示接口数据
         * @param data
         */
        showData: function (data) {

            if (data.baseCategoryId == 1) {
                $(".material").show();
                $(".material_temp").hide();
            } else {
                $(".material").hide();
                $(".material_temp").show();
            }

            var goodsAttr = data.productInfoAttrUptORMs || data.productInfoAttrORMs,
                goodsUpts = data.productGoodsUpts || data.productGoods;

            data.countryId == "CN" ? $("#provinceName,#cityName").show() : $("#provinceName,#cityName").hide();
            $(".smg-basicInfo,.smg-base-attr").setPageData(data);
            $("#priceType").text(setListSystemCode(JSON.parse(session.price_tpye), $("#priceType").text()));
            $("#lvInfo").text(setListSystemCode(JSON.parse(session.product_lv), $("#lvInfo").text()));
            (!goodsAttr || goodsAttr.length == 0) ? $(".smg-attr-block").hide() : $(".smg-attr-block").show();

            var goodsAttrHtml = '',
                goodsAttrLen = goodsAttr && goodsAttr.length;

            for (var i = 0; i < goodsAttrLen; i++) {
                goodsAttrHtml += '<div class="form-group required smg-base-attr">' +
                    '<label class="col-sm-2 control-label">' + goodsAttr[i].productAttribute.attrNameFront + '</label>' +
                    '<div class="col-sm-4">' +
                    '<p class="col-sm-6 form-control-static" attrValueId="' + goodsAttr[i].attrValueId + '">' + goodsAttr[i].productAttributeValue.valueName + '</p>' +
                    '</div>' +
                    '</div>';
            }
            $(".goodsAttr-content").append(goodsAttrHtml);

            var goodsUptsHtml = '',
                goodsUptsLen = goodsUpts && goodsUpts.length;

            for (var j = 0; j < goodsUptsLen; j++) {
                var p = goodsUpts[j],
                    standardName = '';

                for (var x = 0; x < this.standardUnit.length; x++) {
                    if (this.standardUnit[x].code == p.standardUnit) {
                        standardName = this.standardUnit[x].name;
                        break;
                    }
                }
                goodsUptsHtml += '<tr class="cmg-goodstr">' +
                    '<td>' + p.color + '</td>' +
                    '<td>' + p.standard + '</td>' +
                    '<td>' + standardName + '</td>' +
                    '<td>' + p.salePrice + '</td></tr>';
            }
            $(".standardtbody").append(goodsUptsHtml);

            var goodsPhotoHtml = '',
                goodsPhoto = data.productInfoPhotoUpts || data.productInfoPhotos,
                goodsPhotoLen = goodsPhoto && goodsPhoto.length;

            for (var k = 0; k < goodsPhotoLen; k++) {
                goodsPhotoHtml += '<li class="goodsPic"><img src="' + goodsPhoto[k].picUrl + '"/></li>';
            }
            $(".goodsPic-upload").append(goodsPhotoHtml);

            this.bingDataEvent();
        },

        /**
         * 获取详情接口数据
         */
        initDetail: function () {
            var own = this,
                uptId = session.goods_detail_productId,
                url = session.goods_detail_type == 'true' ? 'getProductInfo' : 'getProductInfoUpt';

            $.commonAjax({
                type: "GET",
                url: url,
                operationId: uptId ? uptId : productId,
                success: function (data) {
                    own.showData(data.data);
                }
            });
        }
    };

    showMyGoods.initData();
});
