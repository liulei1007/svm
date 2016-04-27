$(function(){
	plumeLog("进入index模板自定义js-"+plumeTime());
	// $(".doc-body").css({
	// 	"height":($(document.body).height()-45)+"px"
	// });
	// $(".menus-btn-auto").css({
	// 	"height":($(".doc-body-left").height()-($(".menus-btn").length*$(".menus-btn").height()))+"px"
	// });
	var overtag1=true;
	var overtag2=true;
	var nowtag="";
	$(".menus-btn").bind("mouseenter",function(){
		overtag1=false;
		var t=$(this).position().top;
		var l=$(this).width();
		$(".menus-nodes").hide();
		if($("."+nowtag+"-block").is(":hidden")){
			$("[tag="+nowtag+"]").removeClass("choose");
		}
		nowtag=$(this).attr("tag");
		$("."+nowtag+"-block").css({
			"top":(t-1)+"px",
			"left":l+"px"
		}).show();
		$(this).addClass("choose")
	}).bind("mouseleave",function(){
		overtag1=true;
		if(overtag1&&overtag2){
			if($("."+nowtag+"-block").is(":hidden")){
				$(this).removeClass("choose")
			}
			//$(".menus-nodes").hide();
		}
	});
	$(".menus-nodes").bind("mouseenter",function(){
		overtag2=false;
	}).bind("mouseleave",function(){
		overtag2=true;
		if(overtag1&&overtag2){
			$("[tag="+nowtag+"]").removeClass("choose");
			$(".menus-nodes").hide();
		}
	}).bind("click",function(){
		$(this).fadeOut("fast");
		$(".doc-body-left").find(".active").removeClass("active");
		$("[tag="+nowtag+"]").addClass("active");
	});
	$(".work-space").loadTemp("welcome","nochangeurl");
	$(".welcome").bind("click",function(){
		derict(this,"welcome","nochangeurl");
	});
	$(".test").bind("click",function(){
		derict(this,"test","nochangeurl");
	});
	$(".test1").bind("click",function(){
		derict(this,"test1","nochangeurl");
	});
	$(".transmit").bind("click",function(){
		derict(this,"transmit","nochangeurl");
	});
	$(".mytable").bind("click",function(){
		derict(this,"mytable","nochangeurl");
	});
	$(".agencyList").bind("click",function(){
		derict(this,"agencyList","nochangeurl");
	});
	$(".basicDataManagement1").bind("click",function(){
		derict(this,"basicDataManagement1","nochangeurl");
	});
	$(".basicDataManagement2").bind("click",function(){
		derict(this,"basicDataManagement2","nochangeurl");
	});
	$(".basicDataManagement3").bind("click",function(){
		derict(this,"basicDataManagement3","nochangeurl");
	});
	$(".basicDataManagement4").bind("click",function(){
		derict(this,"basicDataManagement4","nochangeurl");
	});
	$(".basicDataManagement5").bind("click",function(){
		derict(this,"basicDataManagement5","nochangeurl");
	});
	$(".basicDataManagement6").bind("click",function(){
		derict(this,"basicDataManagement6","nochangeurl");
	});
	$(".basicDataManagement7").bind("click",function(){
		derict(this,"basicDataManagement7","nochangeurl");
	});
	$(".commodityManagement1").bind("click",function(){
		derict(this,"commodityManagement1","nochangeurl");
	});
	$(".commodityManagement2").bind("click",function(){
		derict(this,"commodityManagement2","nochangeurl");
	});
	$(".commodityManagement3").bind("click",function(){
		derict(this,"commodityManagement3","nochangeurl");
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
	console.log($(o).parents(".slidebar-title"));
	if(derict_lock){
		return;
	}
	derict_lock=true;
	$(".slidebar").find(".active").removeClass("active");
	$(o).parents(".slidebar-title").addClass("active");
	$(".work-space").removeClass("work-space-active").css({"opacity":"1"}).animate({
		"left":"-120%",
		"opacity":"0"
	},500,function(){
		$(this).remove();
	})
	$(".page-content").append('<div class="work-space work-space-active"></div>');
	$(".work-space-active").loadTemp("transmit","nochangeurl");
	$(".work-space-active").delay(800).fadeOut(function(){
		$(this).html("").fadeIn();
		$(".work-space-active").loadTemp(temp,cache);
		derict_lock=false;
	});
}