$(function(){
	plumeLog("进入secondreg模板自定义js-"+plumeTime());
	var t1="";
	var t2="";
	$(".sd-next").bind("click",function(){
		$(".reg-msg-block").hide();
		$(".sd-choose-step1").fadeIn();
	});
	$(".sd-btn-back0").bind("click",function(){
		$(".sd-choose-step1").hide();
		$(".reg-msg-block").fadeIn();
	});
	$(".sd-btn-back1").bind("click",function(){
		$(".sd-choose-step2").hide();
		$(".sd-choose-step1").fadeIn();
	});
	$(".sd-step1-btn1,.sd-step1-btn2").bind("click",function(){
		$(".sd-choose-step1").hide();
		$(".sd-choose-step2").fadeIn();
		t1=$(this).attr("tag");
	});
	$(".sd-step2-btn1,.sd-step2-btn2").bind("click",function(){
		t2=$(this).attr("tag");
		var flag=t1+t2;
		if(flag=="11"){
			window.location.href="brandCreateCompany";
		}else if(flag=="21"){
			window.location.href="brandCreateCompany";
		}else if(flag=="12"){
			window.location.href="agencyCreatePersonal";
		}else if(flag=="22"){
			window.location.href="agencyCreateCompany";
		}
	});
})