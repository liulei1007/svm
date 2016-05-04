$(function() {
	plumeLog("进入reviewShowCompany模板自定义js-"+plumeTime());
	formCtrl();
	$(".btn-back").bind("click",function(){
		derict(this,"reviewList","nochangeurl");
	});
});