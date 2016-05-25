$(function () {
    loading();
    function getProductInfoUpt() {
        $.ajax({
            type: "GET",
            url: plumeApi["getProductInfoUpt"] + "/" + session.goods_showMyGoods_uptId,
            data: "",
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                unloading();
                var d = data.data
                $(".smg-basicInfo1,.smg-base-attr1").setPageData(d);
                $("#priceType1").text(setListSystemCode(JSON.parse(session.price_tpye),$("#priceType1").text()));
                $("#lvInfo1").text(setListSystemCode(JSON.parse(session.product_lv),$("#lvInfo1").text()));
                for (var i = 0; i < d.productInfoAttrUptORMs.length; i++) {
                    var p = d.productInfoAttrUptORMs[i];
                    var temp = '<div class="form-group required smg-base-attr">';
                    temp += '<label class="col-sm-2 control-label">' + p.productAttribute.attrNameFront + '</label>';
                    temp += '<div class="col-sm-4">';
                    temp += '<p class="col-sm-10 form-control-static" attrValueId="'+ p.attrValueId+'">' + p.productAttributeValue.valueName + '</p>';
                    temp += '</div>';
                    temp += '</div>';
                    $(".goodsAttr-content1").append(temp);
                }
                for (var j = 0; j < d.productGoodsUpts.length; j++) {
                    var p = d.productGoodsUpts[j];
                    var temp = '<tr class="cmg-goodstr">';
                    temp += '<td>' + p.color + '</td>';
                    temp += '<td>' + p.standard + '</td>';
                    temp += '<td>' + p.salePrice + '</td>';
                    temp += '</tr>';
                    $(".standardtbody1").append(temp);
                }
                for (var k = 0; k < d.productInfoPhotoUpts.length; k++) {
                    var p = d.productInfoPhotoUpts[k];
                    var temp = '<li class="goodsPic">';
                    temp += '<img src="' + p.picUrl + '"/>';
                    temp += '</li>';
                    $(".goodsPic-upload1").append(temp);
                }
            }
        });
    }
    function getProductInfo() {
        $.ajax({
            type: "GET",
            url: plumeApi["getProductInfo"] + "/" + session.goods_showMyGoods_productId,
            data: "",
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                unloading();
                var d = data.data
                $(".smg-basicInfo2,.smg-base-attr2").setPageData(d);
                $("#priceType2").text(setListSystemCode(JSON.parse(session.price_tpye),$("#priceType2").text()));
                $("#lvInfo2").text(setListSystemCode(JSON.parse(session.product_lv),$("#lvInfo2").text()));
                for (var i = 0; i < d.productInfoAttrORMs.length; i++) {
                    var p = d.productInfoAttrORMs[i];
                    var temp = '<div class="form-group required smg-base-attr">';
                    temp += '<label class="col-sm-2 control-label">' + p.productAttribute.attrNameFront + '</label>';
                    temp += '<div class="col-sm-4">';
                    temp += '<p class="col-sm-10 form-control-static" attrValueId="'+ p.attrValueId+'">' + p.productAttributeValue.valueName + '</p>';
                    temp += '</div>';
                    temp += '</div>';
                    $(".goodsAttr-content2").append(temp);
                }
                for (var j = 0; j < d.productGoods.length; j++) {
                    var p = d.productGoods[j];
                    var temp = '<tr class="cmg-goodstr">';
                    temp += '<td>' + p.color + '</td>';
                    temp += '<td>' + p.standard + '</td>';
                    temp += '<td>' + p.salePrice + '</td>';
                    temp += '</tr>';
                    $(".standardtbody2").append(temp);
                }
                for (var k = 0; k < d.productInfoPhotos.length; k++) {
                    var p = d.productInfoPhotos[k];
                    var temp = '<li class="goodsPic">';
                    temp += '<img src="' + p.picUrl + '"/>';
                    temp += '</li>';
                    $(".goodsPic-upload2").append(temp);
                }
            }
        });
    }

    getProductInfoUpt();
    getProductInfo();
    $(".fmg-back").bind("click",function(){
        derict(this, "goodsAuditManage", "nochangeurl");
    });
    $(".fmg-ok").bind("click",function(){
        auditFun();
    })
    function auditFun() {

        var uptIds = [];
        uptIds.push(session.goods_showMyGoods_uptId);
        $('.pop').loadTemp("popAudit", "nochangeurl", function () {
            $('.pop').on('click', '.btn-sure', function () {
                var audit = {
                    "uptIds": uptIds,
                    "reviewStatus": $('.reviewStatus').find("input[name='audit']:checked").val(),
                    "remark": $('.remark').val()
                };
                loading();
                $.ajax({
                    url: plumeApi["reviewProductInfo"],
                    type: "POST",
                    contentType: "application/json;charset=UTF-8",
                    data: JSON.stringify(audit),
                    success: function (data) {
                        if (data.ok) {
                            unloading();
                            popTips("处理成功", "success");
                            derict(this, "amendmentInfo", "nochangeurl");
                        } else {
                            unloading();
                            popTips("处理失败", "warning");
                        }
                    }
                });
                $('.pop').hide();
                $('.pop').off('click', '.btn-sure');
                $('.pop').off('click', '.btn-cancel');
            });
            $('.pop').on('click', '.btn-cancel', function () {
                $('.pop').hide();
                $('.pop').off('click', '.btn-sure');
                $('.pop').off('click', '.btn-cancel');
            });
        });
    }

});
