$(function(){
	plumeLog("进入takingGoods模板自定义js-"+plumeTime());
	getProductInfo();

	$('tbody').on('click','.btn-delect',function() {
		$(this).parents('tr').hide();
	})


	$('.btn-next').bind('click',function() {
		var productShopGoodsAddVos=[];
		$('tbody tr').each(function() {
			if($(this).css('display')=="none"){
				$(this).remove();
			}
		});

		$('tbody tr').each(function(i){
			productShopGoodsAddVos[i]={
				"productGoodsId":$(this).find('.productGoodsId').html(),
				"salePrice":$(this).find('.salePrice').val(),
				"priceType":$(this).find('.priceType').val(),
				"inventory":$(this).find('.inventory').val(),
				"saleStatus": ""
			}
		});


		var body = {
			"productId":session.productGoods_productId,
			"productShopGoodsAddVos":productShopGoodsAddVos
		}

		console.log(body)
		addProductShopGoods(body)
	});
})