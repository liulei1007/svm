$(function(){
	tablecheckbox();
	plumeLog("进入groundGoods模板自定义js-"+plumeTime());
	$('.table-block').on('click','.btn-delect',function(){
		getGoodsPsgId(this);
		delectGoodsData();
	});
	$('.table-block').on('click','.btn-compile',function() {
		getGoodsPsgId(this);
		derict(this, "compileGoods", "nochangeurl");
	});
	$('.table-block').on('click','.btn-ground',function() {
		getGoodsPsgId(this);
		if($(this).html()=="上架"){
			 	groundGoods() 
			}else{
				soldOutGoods()
			}
	});

	getGoodsData();

	$('.btn-search').bind('click',function() {
		var productName=$('#productName').val();
		var modelNumber=$('#modelNumber').val();
		var saleStatus=$('#saleStatus').val();
		getGoodsData(productName,modelNumber,saleStatus)
	})

})

