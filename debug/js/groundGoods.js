

$(function(){
	datas={
		  "productName": "",
		  "modelNumber": "",
		  "saleStatus": ""
		 }
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
	var nowPage =1;
	getGoodsData();
	$('.btn-search').bind('click',function() {
		data.productName=$('#productName').val();
		data.modelNumber=$('#modelNumber').val();
		data.saleStatus=$('#saleStatus').val();
		getGoodsData();
	})

	//上下架商品列表

function getGoodsData() {
    loading();
    var newData = JSON.stringify(datas)
    $.ajax({
        url: plumeApi["listProductShopGoods"]+"?currentPage=1&onePageCount=10",
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        data: newData,
        success: function (data) {
            unloading();
            $("[list-node]").remove();
            $(".table-block").setPageData(data);
            filter();

            totalPage=Math.ceil(data.countRecord/10);
			newPage(totalPage,function(i){
			var newData = JSON.stringify(datas);
			$.ajax({
				url: plumeApi["listProductShopGoods"]+"?currentPage="+i+"&onePageCount=10",
				type: "POST",
				data: newData,
				dataType: "json",
				contentType: "application/json; charset=utf-8",
				success: function(data) {
					 unloading();
            $("[list-node]").remove();
            $(".table-block").setPageData(data);
            	filter();
				},
				});
			});


        }
    });
}


//信息过滤
	function filter() {
		 $('.createDate').each(function () {
                $(this).html(getLocalTime($(this).html()));
                var aTr = $(this).parents('tr');
                var saleStatus = aTr.find('.saleStatus');
                var btnGround = aTr.find('.btn-ground');
                if (saleStatus.html() == 0) {
                    saleStatus.html('下架中');
                    btnGround.html('上架');
                } else {
                    saleStatus.html('上架中');
                    btnGround.html('下架');
                }
            });
	}
})

