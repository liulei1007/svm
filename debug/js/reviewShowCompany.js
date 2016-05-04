$(function() {
	plumeLog("进入reviewShowCompany模板自定义js-"+plumeTime());
	$(".btn-back").bind("click",function(){
		derict(this,"reviewList","nochangeurl");
	});
});