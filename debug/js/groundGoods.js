$(function(){
	plumeLog("进入groundGoods模板自定义js-"+plumeTime());
	$('.table-block').on('click','.btn-delect',function(){
		getGoodsPsgId(this);
		delectGoodsData();
	});
	$('.table-block').on('click','.btn-compile',function() {
		getGoodsPsgId(this);
		derict(this, "compileGoods", "nochangeurl");
	});
	$('.table-block').on('click','.btn-ground',function() {
		$('.pop').loadTemp("popGroundSuccess", "nochangeurl", function () {
				$('.pop').on('click', '.btn-back', function () {
             	$('.pop').hide();
             	$('.pop').off('click', '.btn-back');
        	});
		});
	});
	getGoodsDate();
})