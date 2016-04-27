$(function(){
	setPrams();
	plumeLog("进入index模板自定义js-"+plumeTime());

	$(".welcome").bind("click",function(){
		derict(this,"welcome","nochangeurl");
	});
	$(".test").bind("click",function(){
		derict(this,"test","nochangeurl");
	});
	$(".test1").bind("click",function(){
		derict(this,"test1","nochangeurl");
	});
	$(".agencyList").bind("click",function(){
		derict(this,"agencyList","nochangeurl");
	});
	$(".agencyCreateCompany").bind("click",function(){
		derict(this,"agencyCreateCompany","nochangeurl");
	});
	$(".agencyShowCompany").bind("click",function(){
		derict(this,"agencyShowCompany","nochangeurl");
	});
	$(".agencyAddAccount").bind("click",function(){
		derict(this,"agencyAddAccount","nochangeurl");
	});
	$(".shopList").bind("click",function(){
		derict(this,"shopList","nochangeurl");
	});

	$(".idmanage").bind("click",function(){
		derict(this,"idmanage","nochangeurl");
	});
	$(".msgmanage").bind("click",function(){
		derict(this,"msgmanage","nochangeurl");
	});
	$(".changepwd").bind("click",function(){
		derict(this,"changepwd","nochangeurl");
	});
	// 左侧导航栏鼠标滑过显示二级分类
	$(".slidebar-title").bind("mouseenter", function() {
		$(this).find(".slidebar-list").show();
	}).bind("mouseleave", function() {
		$(this).find(".slidebar-list").hide();
	})
});
var derict_lock=false;
function derict(o,temp,cache){
	if(derict_lock){
		return;
	}
	derict_lock=true;
	$(".slidebar").find(".active").removeClass("active");
	$(o).parents(".slidebar-title").addClass("active");
	$(".work-space").removeClass("work-space-active").fadeOut(function(){
		$(this).remove();
		$(".page-content").append('<div class="work-space work-space-active"></div>');
		$(".work-space-active").loadTemp("transmit","nochangeurl");
		$(".work-space-active").delay(500).fadeOut(function(){
			$(this).html("").fadeIn();
			$(".work-space-active").loadTemp(temp,cache);
			derict_lock=false;
		});
	})
}
function setPrams(){
	plumeLog("进入setPrams-"+plumeTime());
	var path=window.location.href+"";
	var prams=path.substring(path.indexOf("?")+1);
	var temp=path.substring(path.lastIndexOf("/")+1);
	if(prams.indexOf("fullscreen")!=-1){
		$(".slidebar").hide();
		$(".page-content").css({"width":($(window).width()-10),"left":0});
		$(".container-fixed").fadeIn();
	}else{
		$(".container-fixed").fadeIn();
	}
	if(temp!="index"){
		$(".work-space").loadTemp(temp,"nochangeurl");
	}
}
