$(function(){
	plumeLog("进入applyPriceTagManage模板自定义js-"+plumeTime());

	function getTableData(){
		$.get("test/data.txt",function(data){
			data=$.parseJSON(data);
			$(".table-block").setPageData(data);
		});
	}

	$('.table-block').on('click','.btn-compile',function() {
		getGoodsPsgId(this);
		derict(this, "compileGoods", "nochangeurl");
	});		

	getGoodsDate();
})