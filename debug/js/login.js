$(function(){
	plumeLog("进入login模板自定义js-"+plumeTime());
	$(".login-btn-brand").bind("click",function(){
		sessionStorage.auth=[1,2,4,5,6,8];
		window.location.href="../index";
	});
	$(".login-btn-supplier").bind("click",function(){
		sessionStorage.auth=[3,4,5,7];
		window.location.href="../index";
	});
	$(".reg-btn").bind("click",function(){
		window.location.href="../secondreg?fullscreen";
	});
	$(".login-head-btn .btn1").bind("click",function(){
		$(".reg-block").fadeOut();
		$(".login-block").fadeIn();
	});
	$(".login-head-btn .btn2").bind("click",function(){
		$(".login-block").fadeOut();
		$(".reg-block").fadeIn();
	});
	$(".fetchpwd").bind("click",function(){
		window.location.href="../changepwd?fullscreen";
	});
});
