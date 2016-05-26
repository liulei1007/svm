$(function () {
    $(".alert-danger").hide();
    formCtrl();
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
                var d = data.data;
                if(d.baseCategoryId==1){
                    $(".material").show();
                    $(".material_temp").hide();
                }else{
                    $(".material").hide();
                    $(".material_temp").show();
                }
                $(".smg-basicInfo,.smg-base-attr").setPageData(d);
                $("#priceType").text(setListSystemCode(JSON.parse(session.price_tpye),$("#priceType").text()));
                $("#lvInfo").text(setListSystemCode(JSON.parse(session.product_lv),$("#lvInfo").text()));
                if(d.productInfoAttrUptORMs.length==0){
                    $(".smg-attr-block").hide();
                }else{
                    $(".smg-attr-block").show();
                }
                for (var i = 0; i < d.productInfoAttrUptORMs.length; i++) {
                    var p = d.productInfoAttrUptORMs[i];
                    var temp = '<div class="form-group required smg-base-attr">';
                    temp += '<label class="col-sm-2 control-label">' + p.productAttribute.attrNameFront + '</label>';
                    temp += '<div class="col-sm-4">';
                    temp += '<p class="col-sm-6 form-control-static" attrValueId="'+ p.attrValueId+'">' + p.productAttributeValue.valueName + '</p>';
                    temp += '</div>';
                    temp += '</div>';
                    $(".goodsAttr-content").append(temp);
                }
                for (var j = 0; j < d.productGoodsUpts.length; j++) {
                    var p = d.productGoodsUpts[j];
                    var temp = '<tr class="cmg-goodstr">';
                    temp += '<td>' + p.color + '</td>';
                    temp += '<td>' + p.standard + '</td>';
                    temp += '<td>' + p.salePrice + '</td>';
                    temp += '</tr>';
                    $(".standardtbody").append(temp);
                }
                for (var k = 0; k < d.productInfoPhotoUpts.length; k++) {
                    var p = d.productInfoPhotoUpts[k];
                    var temp = '<li class="goodsPic">';
                    temp += '<img src="' + p.picUrl + '"/>';
                    temp += '</li>';
                    $(".goodsPic-upload").append(temp);
                }
            }
        });
    }

    getProductInfoUpt();
    $(".smg-back").bind("click",function(){
        derict(this, "goodsAuditManage", "nochangeurl");
    })

});
