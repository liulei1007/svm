$(function(){
	plumeLog("进入idmanage模板自定义js-"+plumeTime());
	tablecheckbox();
	$(".im-btn-add").bind("click",function(){
		derict(this, "childIdCreate", "nochangeurl");
	});
});