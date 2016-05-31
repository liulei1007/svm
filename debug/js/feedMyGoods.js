$(function () {
    loading();
    //获取反馈信息
    var json1_1,json1_2,json1_3,json2_1,json2_2,json2_3;
    function getProductInfoUpt() {
        $.ajax({
            type: "GET",
            url: plumeApi["getProductInfoUpt"] + "/" + session.goods_showMyGoods_uptId,
            data: "",
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                var d = data.data
                $(".smg-basicInfo1,.smg-base-attr1").setPageData(d);
                $("#priceType1").text(setListSystemCode(JSON.parse(session.price_tpye),$("#priceType1").text()));
                $("#lvInfo1").text(setListSystemCode(JSON.parse(session.product_lv),$("#lvInfo1").text()));
                json1_1=d.productInfoAttrUptORMs;
                json1_2=d.productGoodsUpts;
                json1_3=d.productInfoPhotoUpts;
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
                getProductInfo();
            }
        });
    }
    //获取产品信息
    function getProductInfo() {
        $.ajax({
            type: "GET",
            url: plumeApi["getProductInfo"] + "/" + session.goods_showMyGoods_productId,
            data: "",
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                var d = data.data
                $(".smg-basicInfo2,.smg-base-attr2").setPageData(d);
                $("#priceType2").text(setListSystemCode(JSON.parse(session.price_tpye),$("#priceType2").text()));
                $("#lvInfo2").text(setListSystemCode(JSON.parse(session.product_lv),$("#lvInfo2").text()));
                json2_1=d.productInfoAttrORMs;
                json2_2=d.productGoods;
                json2_3=d.productInfoPhotos;
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
                setDifferent();
            }
        });
    }
    //设置差异
    function setDifferent(){

        $(".smg-basicInfo1").find(".form-horizontal").find("p").each(function(i){
            var t1=$(this).text();
            var t2=$($(".smg-basicInfo2").find(".form-horizontal").find("p")[i]).text();
            if(t1!=t2){
                $($(".smg-basicInfo2").find(".form-horizontal").find("p")[i]).css({
                    "background":"#f0d6d0"
                });
                $(".json_title0").css({
                    "color":"#C13535"
                })
            }
        });
        unloading();
        return;
        var rst_1=true;
        for(key in json1_1){
            if(json1_1[key]!=json2_1[key]){
                rst_1=false;
                break;
            }
        }
        if(!rst_1){
            $(".json_title1").css({
                "color":"#C13535"
            })
        }
        var rst_2=true;
        for(key in json1_2){
            if(json1_2[key]!=json2_2[key]){
                rst_2=false;
                break;
            }
        }
        if(!rst_2){
            $(".json_title2").css({
                "color":"#C13535"
            })
        }
        var rst_3=true;
        for(key in json1_3){
            if(json1_3[key]!=json2_3[key]){
                rst_3=false;
                break;
            }
        }
        if(!rst_3){
            $(".json_title3").css({
                "color":"#C13535"
            })
        }

    }

    getProductInfoUpt();

    $(".fmg-back").bind("click",function(){
        derict(this, "amendmentInfo", "nochangeurl");
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
