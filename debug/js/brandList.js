$(function(){
	var brandName ="";
	var contract ="";
	var telNumber ="";

	plumeLog("进入brandList模板自定义js-"+plumeTime());
	//getTableData();
	$(".btn-addbrand").bind("click",function(){
		session.pram1="xxxxx";
		derict(this,"brandAdd","nochangeurl",function(){
			$(".ba-back").bind("click",function(){
				derict(this,"brandList","nochangeurl");
			})
		});
	});

	$("tbody").on("click",'.btn-look',function() {
		getBrandId(this)
		derict(this,"brandListShow","nochangeurl");
	})

	$(".btn-search").bind('click',function() {
		 brandName =$("#brandName").val();
		 contract =$("#contract").val();
	     telNumber =$("#telNumber").val();
		getTableData(brandName,contract,telNumber)
	})


	getTableData(brandName,contract,telNumber)
});
