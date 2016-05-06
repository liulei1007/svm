$(function(){
	plumeLog("进入childIdCreate模板自定义js-"+plumeTime());
	tablecheckbox();
	$(".cic-btn-add").bind("click",function(){
		$(".form-horizontal").append($(".cic-brand").clone());
	});
	$(".btn-back").bind("click",function(){
		derict(this, "idmanage", "nochangeurl");
	});
});