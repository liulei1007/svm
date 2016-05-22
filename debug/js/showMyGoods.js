$(function () {
    $(".alert-danger").hide();
    formCtrl();
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
                $(".smg-basicInfo,.smg-base-attr").setPageData(d);
                console.log(d.productInfoAttrUptORMs);
                for (var i = 0; i < d.productInfoAttrUptORMs.length; i++) {
                    var p = d.productInfoAttrUptORMs[i];
                    var temp = '<div class="form-group required smg-base-attr">';
                    temp += '<label class="col-sm-2 control-label">' + p.productAttribute.attrNameFront + '</label>';
                    temp += '<div class="col-sm-2">';
                    temp += '<p class="col-sm-4 form-control-static">' + p.attrValueId + '</p>';
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

});
