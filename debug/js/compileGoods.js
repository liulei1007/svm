$(function(){
	  $(".alert-danger").hide();
	plumeLog("进入compileGoods模板自定义js-"+plumeTime());
	getGoodsInfo()
	$(".btn-compileGoods").on('click','.btn-back',function() {
		derict(this, "groundGoods", "nochangeurl");
	})

	$('.btn-compileGoods').on('click','.btn-next',function() {
		loading()
		editProductShopGoods()
	})
})