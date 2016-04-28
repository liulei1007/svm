$(function(){
	setPrams();
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
	$(".agencyList").bind("click",function(){
		derict(this,"agencyList","nochangeurl");
	});
	$(".agencyCreateCompany").bind("click",function(){
		derict(this,"agencyCreateCompany","nochangeurl");
	});
	$(".agencyCreatePersonal").bind("click",function(){
		derict(this,"agencyCreatePersonal","nochangeurl");
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
	$(".shopCreate").bind("click",function(){
		derict(this,"shopCreate","nochangeurl");
	});

	$(".agencyList").bind("click",function(){
		derict(this,"agencyList","nochangeurl");
	});
	$(".seriesManage").bind("click",function(){
		derict(this,"seriesManage","nochangeurl");
	});
	$(".goodsDataManage").bind("click",function(){
		derict(this,"goodsDataManage","nochangeurl");
	});
	$(".goodsAuditManage").bind("click",function(){
		derict(this,"goodsAuditManage","nochangeurl");
	});
	$(".addGoodsData").bind("click",function(){
		derict(this,"addGoodsData","nochangeurl");
	});
	$(".batchlead").bind("click",function(){
		derict(this,"batchlead","nochangeurl");
	});
	$(".noCompleteData").bind("click",function(){
		derict(this,"noCompleteData","nochangeurl");
	});
	$(".amendmentInfo").bind("click",function(){
		derict(this,"amendmentInfo","nochangeurl");
	});
	$(".takingGoodsData").bind("click",function(){
		derict(this,"takingGoodsData","nochangeurl");
	});
	$(".groundGoods").bind("click",function(){
		derict(this,"groundGoods","nochangeurl");
	});
	$(".applySeries").bind("click",function(){
		derict(this,"applySeries","nochangeurl");
	});


	$(".shopShowCompany").bind("click",function(){
		derict(this,"shopShowCompany","nochangeurl");
	});
	$(".shopAlter").bind("click",function(){
		derict(this,"shopAlter","nochangeurl");
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
	console.log($(o).parents(".slidebar-title"));
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
	if(temp!="index"&&temp!=""){
		$(".work-space").loadTemp(temp,"nochangeurl");
	}
}
