$(function(){
	plumeLog("进入compileGoods模板自定义js-"+plumeTime());
	getGoodsInfo()
	$(".btn-compileGoods").on('click','.btn-back',function() {
		derict(this, "groundGoods", "nochangeurl");
	})

	$('.btn-compileGoods').on('click','.btn-next',function() {
		var price = $("#price").val();
		var priceType = $("#priceType").val()==="明码标价"?0 : 1 ;
		 $.ajax({
            url:"http://192.168.222.162:8080/productShopGoods/editProductShopGoods",
            type:"POST",
            contentType: "application/json;charset=UTF-8",
            data:JSON.stringify(
            {
			  "psgId": session.goods.psgId,
			  "salePrice": price,
			  "discount": 0,
			  "inventory": 0,
			  "saleStatus":priceType
			}
          	),
            success:function(data){
            	window.location.href="/debug/groundGoods"
            }
        })
	})
})