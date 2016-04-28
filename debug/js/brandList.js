var brandList_json={
	"pram1":"",
	"pram2":""
};
$(function(){
	plumeLog("进入brandList模板自定义js-"+plumeTime());
	$(".btn-addbrand").bind("click",function(){
		brandList_json.pram1="xxxxx";
		derict(this,"brandAdd","nochangeurl",function(){

			$(".ba-back").bind("click",function(){
				//返回
				derict(this,"brandList","nochangeurl");
			})
		});
	});
})