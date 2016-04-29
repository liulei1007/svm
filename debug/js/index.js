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
	$(".agencyCreatePersonal").bind("click",function(){
		derict(this,"agencyCreatePersonal","nochangeurl");
	});
	$(".agencyShowCompany").bind("click",function(){
		derict(this,"agencyShowCompany","nochangeurl");
	});
	$(".agencyShowPersonal").bind("click",function(){
		derict(this,"agencyShowPersonal","nochangeurl");
	});
	$(".agencyAddAccount").bind("click",function(){
		derict(this,"agencyAddAccount","nochangeurl");
	});

	$(".shopListAgency").bind("click",function(){
		derict(this,"shopListAgency","nochangeurl");
	});
	$(".shopCreateAgency").bind("click",function(){
		derict(this,"shopCreateAgency","nochangeurl");
	});
	$(".shopShowAgency").bind("click",function(){
		derict(this,"shopShowAgency","nochangeurl");
	});
	$(".shopAlterAgency").bind("click",function(){
		derict(this,"shopAlterAgency","nochangeurl");
	});

	$(".shopList").bind("click",function(){
		derict(this,"shopList","nochangeurl");
	});
	$(".shopCreate").bind("click",function(){
		derict(this,"shopCreate","nochangeurl");
	});
	$(".shopShowCompany").bind("click",function(){
		derict(this,"shopShowCompany","nochangeurl");
	});
	$(".shopAlter").bind("click",function(){
		derict(this,"shopAlter","nochangeurl");
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

	$(".idmanage").bind("click",function(){
		derict(this,"idmanage","nochangeurl");
	});
	$(".msgmanage").bind("click",function(){
		derict(this,"msgmanage","nochangeurl");
	});
	$(".changepwd").bind("click",function(){
		derict(this,"changepwd","nochangeurl");
	});
	$(".brandList").bind("click",function(){
		derict(this,"brandList","nochangeurl");
	});
	$(".brandAdd").bind("click",function(){
		derict(this,"brandAdd","nochangeurl");
	});
	$(".reviewList").bind("click",function(){
		derict(this,"reviewList","nochangeurl");
	});
	$(".reviewShowCompany").bind("click",function(){
		derict(this,"reviewShowCompany","nochangeurl");
	});
	$(".reviewShowPersonal").bind("click",function(){
		derict(this,"reviewShowPersonal","nochangeurl");
	});
	$(".reviewCompany").bind("click",function(){
		derict(this,"reviewCompany","nochangeurl");
	});
	$(".reviewPersonal").bind("click",function(){
		derict(this,"reviewPersonal","nochangeurl");
	});
	// 左侧导航栏鼠标滑过显示二级分类
	$(".slidebar-title").bind("mouseenter", function() {
		$(this).find(".slidebar-list").show();
	}).bind("mouseleave", function() {
		$(this).find(".slidebar-list").hide();
	});
	// 左侧导航栏二级分类点击隐藏
	$(".slidebar-list li").bind("click", function() {
		$(this).parents(".slidebar-list").hide().parents(".slidebar-title").addClass("active").siblings().removeClass("active");
	});


	$(".index-head-user").bind("mouseenter", function() {
		$(".index-head-user .ihu-title-block").show();
	}).bind("mouseleave", function() {
		$(".index-head-user .ihu-title-block").hide();
	});
	$(".ihu-exit").bind("click",function(){
		window.location.href="login";
	});
	$(".ihu-changepwd").bind("click",function(){
		window.location.href="changepwd";
	});
});
var derict_lock=false;
function derict(o,temp,cache,fun){
	if(derict_lock){
		return;
	}
	derict_lock=true;
	$(".work-space").removeClass("work-space-active").fadeOut(function(){
		$(this).remove();
		$(".page-content").append('<div class="work-space work-space-active"></div>');
		$(".work-space-active").loadTemp("transmit","nochangeurl");
		$(".work-space-active").delay(300).fadeOut(function(){
			$(this).html("").fadeIn();
			$(".work-space-active").loadTemp(temp,cache,fun);
			try{window.history.pushState({},0,temp)}catch(e){plumeLog("提示:无法动态改变地址:"+e.message);}
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
		$(".page-content").show();
		$(".page-content").css({"width":($(window).width()-10),"left":0});
		$(".container-fixed").fadeIn();
	}else{
		$(".container-fixed").fadeIn();
	}
	try{
		if(temp!="index"&&temp!=""){
			$(".work-space").loadTemp(temp,"nochangeurl");
		}else{
			$(".work-space").loadTemp("welcome","nochangeurl");
		}
	}catch(e){
		$(".work-space").loadTemp("welcome","nochangeurl");
	}

}
