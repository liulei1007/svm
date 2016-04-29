$(function(){
	plumeLog("进入msgmanage模板自定义js-"+plumeTime());
	$("#mm-addmsg").bind("click",function(){
		derict(this,"msgAdd","nochangeurl");
	});
})