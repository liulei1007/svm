$(function(){
	plumeLog("进入groundGoods模板自定义js-"+plumeTime());
	$('.btn-delect').bind('click',function(){
		delectData(this)
	})
})