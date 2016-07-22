$(function(){
	plumeLog("进入takingGoods模板自定义js-"+plumeTime());
	$(".alert-danger").hide();
	getProductInfo();

	$('tbody').on('click','.btn-delect',function() {
		$(this).parents('tr').hide();
	})


	$('.btn-next').bind('click',function() {
		if($(".taking-color input:checked").length==0||$(".taking-size input:checked").length==0){
			alert("至少添加一组店铺商品信息")
		}else{
			var productShopGoodsAddVos=[];
			// $('tbody tr').each(function() {
			// 	if($(this).css('display')=="none"){
			// 		$(this).remove();
			// 	}
			// });

			$('tbody tr[sel="true"]').each(function(i){
				productShopGoodsAddVos[i]={
					"productGoodsId":$(this).find('.productGoodsId').html(),
					"salePrice":parseFloat($(this).find('.salePrice').val()),
					"priceType":$(this).find('.priceType').val(),
					"inventory":parseFloat($(this).find('.inventory').val()),
					"saleStatus": $(".allState").find("input[name='ground']:checked").val()
				}
			});


			var body = {
				"productId":session.productGoods_productId,
				"productShopGoodsAddVos":productShopGoodsAddVos
			}	
			
			addProductShopGoods(body);
		}
	});

	$('#all-price').bind('keyup',function() {
		var allPriceValue = $(this).val();
		$('.salePrice').each(function() {
			$(this).val(allPriceValue);
		});
	});

	$('#all-priceType').bind('change',function() {
		var allPriceType = $(this).val();
		if(allPriceType==1){
			$('.priceType').each(function() {
				$(this).val(1)
			});
		}else{
			$('.priceType').each(function() {
				$(this).val(2)
			});
		}
	});

	$('#all-inventory ').bind('keyup',function() {
		var allInventoryValue = $(this).val();
		$('.inventory').each(function() {
			$(this).val(allInventoryValue);
		});
	});


	$('.btn-errors').bind('click',function() {
		session.goods_showMyGoods_type = "feed";
		 derict(this, "myGoods", "nochangeurl");
	});

	$(".btn-cancel").bind("click",function() {
		derict(this, "takingGoodsData", "nochangeurl");
	});

})