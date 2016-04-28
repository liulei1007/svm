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
	$(".shopList").bind("click",function(){
		derict(this,"shopList","nochangeurl");
	});
	$(".shopCreate").bind("click",function(){
		derict(this,"shopCreate","nochangeurl");
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
	});
	// 左侧导航栏二级分类点击隐藏
	$(".slidebar-list li").bind("click", function() {
		$(this).parents(".slidebar-list").hide();
	});


	$(".index-head-user").bind("mouseenter", function() {
		$(".index-head-user .ihu-title-block").fadeIn();
	}).bind("mouseleave", function() {
		$(".index-head-user .ihu-title-block").fadeOut();
	});
	$(".ihu-exit").bind("click",function(){
		window.location.href="login";
	});
	$(".ihu-changepwd").bind("click",function(){
		window.location.href="changepwd";
	});
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
	if(temp!="index"&&temp!=""){
		$(".work-space").loadTemp(temp,"nochangeurl");
	}else{
		$(".work-space").loadTemp("welcome","nochangeurl");
	}
}
