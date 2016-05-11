$(function(){
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
		$('.pop').loadTemp("popTips", "nochangeurl", function () {
				if($(this).html()=="上架"){
			 			$(".pop").find(".popup-title").html("上架成功");
					}else{
						$(".pop").find(".popup-title").html("下架成功");
					}
				$(".pop").find(".popup-icon").html('<i class="confirm"></i>');
				$(".pop").find(".popup-info").html("确认");
				$('.pop').on('click', '.btn-back', function () {
             	$('.pop').hide();
             	$('.pop').off('click', '.btn-back');
        	});
		});
	});

	getGoodsData();

	$('.btn-search').bind('click',function() {
		var productName=$('#productName').val();
		var modelNumber=$('#modelNumber').val();
		var saleStatus=$('#saleStatus').val();
		getGoodsData(productName,modelNumber,saleStatus)
	})

})

