$(function(){
	  $(".alert-danger").hide();
	plumeLog("进入compileGoods模板自定义js-"+plumeTime());
	getGoodsInfo();
	$(".btn-compileGoods").on('click','.btn-back',function() {
		derict(this, "groundGoods", "nochangeurl");
	});

	$('.btn-compileGoods').on('click','.btn-next',function() {
		loading();
		editProductShopGoods();
	});


	//获取商品信息
function getGoodsInfo() {
    try {
        loading();
        $.ajax({
            url: plumeApi["getProductShopGoods"] + session.goods_psgId,
            type: "GET",
            contentType: "application/json;charset=UTF-8",
            success: function (data) {
                if(data.ok){
                    unloading();
                    if(data.data.productGoodsORM.productInfoORM.baseCategoryId==1){
                        $(".material").show();
                        $(".material_temp").hide();
                     }else{
                        $(".material").hide();
                        $(".material_temp").show();
                    }
                    $('.body-typein').setPageData(data.data);
                    var formsList = "";
                    $(data.data.productGoodsORM.productInfoORM.productInfoAttrORMs).each(function (i, good) {
                        formsList += '<div class="form-group"><label class="col-sm-3 control-label">' + good.productAttribute.attrNameBack + '：</label><p class="col-sm-6 form-control-static">' + good.attrValue + '</p></div>'
                    });
                    $(".forms-block").append(formsList);
                    $(".weight-info").html($(".weight-info").html()+"KG")
                    $(".priceType-info").text(setListSystemCode(JSON.parse(session.price_tpye),$(".priceType-info").text()));
                    $(".level-info").text(setListSystemCode(JSON.parse(session.product_lv),$(".level-info").text()));
                     if(data.data.saleStatus==1){
                         $(".taking-size input").eq(0).attr('checked','checked');
                     }else{
                        $(".taking-size input").eq(1).attr('checked','checked');
                     }
                     if(data.data.priceType==1){
                        $("#priceType option").eq(0).attr('selected','selected');
                     }else{
                        $("#priceType option").eq(1).attr('selected','selected');
                     }
                }else{
                     unloading();
                      $('.pop').loadTemp("popTips", "nochangeurl", function () {
                        $(".pop").find(".popup-title").html(data.resDescription);
                        $(".pop").find(".popup-icon").html('<i class="warning"></i>');
                        $(".pop").find(".popup-info").html("");
                        derict(this, "groundGoods", "nochangeurl");
                    });
                }
            }
        })
    } catch (e) {
        window.location.href = "/";
    }
}


//编辑店铺商品
function editProductShopGoods() {
    var price = $("#price").val();
    var priceType = $("#priceType").val();
    var inventory = $("#inventory").val();
    var saleStatus = $("input[name='ground']:checked").val()
    loading();
    $.ajax({
        url: plumeApi["editProductShopGoods"],
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(
            {
                "psgId": session.goods_psgId,
                "salePrice": price,     
                "priceType": priceType,
                "inventory": inventory,
                "saleStatus": saleStatus
            }
        ),
        success: function (data) {
            if (data.ok) {
                unloading();
                popTips("商品编辑成功", "success");
                derict(this, "groundGoods", "nochangeurl");
            } else {
                unloading();
                 $('.pop').loadTemp("popTips", "nochangeurl", function () {
                    $(".pop").find(".popup-title").html("商品编辑失败");
                    $(".pop").find(".popup-icon").html('<i class="warning"></i>');
                    $(".pop").find(".popup-info").html(data.resDescription);
                  });
            }
        }
    });
}

});