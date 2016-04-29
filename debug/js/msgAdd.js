$(function(){
	plumeLog("进入msgAdd模板自定义js-"+plumeTime());
	$("#ma-reset").bind("click",function(){
		derict(this,"msgmanage","nochangeurl");
	});
})