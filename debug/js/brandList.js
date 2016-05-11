$(function(){
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


	function getTableData(pram){
		$.get(plumeApi["listAgentsBrandInfoList-brand"],pram,function(data){
			$(".table-block").setPageData(data);
		})
	}
	getTableData()
})