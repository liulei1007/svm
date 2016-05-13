$(function(){
	plumeLog("进入compileGoods模板自定义js-"+plumeTime());
	getGoodsInfo()
	$(".btn-compileGoods").on('click','.btn-back',function() {
		derict(this, "groundGoods", "nochangeurl");
	})

	$('.btn-compileGoods').on('click','.btn-next',function() {
		loading()
		var price = $("#price").val();
		var priceType = $("#priceType").val();
		var inventory = $("#inventory").val();
		var saleStatus = $("input[name='ground']:checked").val()
		 $.ajax({
            url:"http://192.168.222.162:8080/productShopGoods/editProductShopGoods",
            type:"POST",
            contentType: "application/json;charset=UTF-8",
            data:JSON.stringify(
            {
			  "psgId": session.goods_psgId,
			  "salePrice": price,
			  "priceType":priceType,
			  "inventory": inventory,
			  "saleStatus":saleStatus
			}
          	),
            success:function(data){
            	unloading()
            	derict(this, "groundGoods", "nochangeurl");
            }
        })
	})
})