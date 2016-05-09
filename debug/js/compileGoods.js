$(function(){
	plumeLog("进入compileGoods模板自定义js-"+plumeTime());
	$(".btn-compileGoods").on('click','.btn-back',function() {
		derict(this, "groundGoods", "nochangeurl");
	})
})