$(function(){
	plumeLog("进入commondityManagement1模板自定义js-"+plumeTime());
	$(".btn-releaseGoods").bind('click',function() {
		$('.work-space').loadTemp("releaseGoods","nochangeurl")
	})
})