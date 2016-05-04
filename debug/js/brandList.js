var brandList_json={
	"pram1":"",
	"pram2":""
};
$(function(){
	plumeLog("进入brandList模板自定义js-"+plumeTime());
	getTableData();
	$(".btn-addbrand").bind("click",function(){
		brandList_json.pram1="xxxxx";
		derict(this,"brandAdd","nochangeurl",function(){
			$(".ba-back").bind("click",function(){
				derict(this,"brandList","nochangeurl");
			})
		});
	});
	function getTableData(){
		$.get(plumeApi["listAgentsBrandInfoList-brand"],{"page":0,"perPage":3},function(data){
			$(".table-block").setPageData(data);
		})
	}
})