$(function(){
	plumeLog("进入commondityManagement1模板自定义js-"+plumeTime());
	$('.table-block').on('click','.btn-taking',function() {
		derict(this, "takingGoods", "nochangeurl");
	});		

	getGoodsDate();
})