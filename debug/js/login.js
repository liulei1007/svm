$(function(){
	plumeLog("进入login模板自定义js-"+plumeTime());
	$(".login-btn").bind("click",function(){
		window.location.href="index.html";
	});
	$(".reg-btn").bind("click",function(){
		window.location.href="index.html?regsuccess";
	});
	$(".login-head-btn .btn1").bind("click",function(){
		$(".reg-block").fadeOut();
		$(".login-block").fadeIn();
	});
	$(".login-head-btn .btn2").bind("click",function(){
		$(".login-block").fadeOut();
		$(".reg-block").fadeIn();
	});
});
