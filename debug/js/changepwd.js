$(function(){
	plumeLog("进入changepwd模板自定义js-"+plumeTime());
	$("#cpdnext").bind("click",function(){
		$(".cpdstep1").hide();
		$(".cpdstep2").fadeIn();
	});
	$("#cpdsub").bind("click",function(){
		$(".cpdstep2").hide();
		$(".cpdstep1").fadeIn();
	});
})