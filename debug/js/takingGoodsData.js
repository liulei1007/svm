$(function(){
	plumeLog("进入commondityManagement1模板自定义js-"+plumeTime());

	var datas ={
		"keyword":"",
		"currentPage":0,
		"onePageCount":10
	}


	$('.table-block').on('click','.btn-taking',function() {
		getProductId(this);
		derict(this, "takingGoods", "nochangeurl");
	});		

	$('.table-block').on('click','.btn-compile',function() {
		getGoodsPsgId(this);
		derict(this, "compileGoods", "nochangeurl");
	});

	$(".btn-search").bind('click',function() {
		datas.keyword = $('#keyword').val();
		getProductGoodsData()
	});

	$('.btn-selfGoods').bind('click',function() {
		derict(this,"releaseSelfGoods","nochangeurl");
	});





//工厂商品列表
 $('.alert-info strong').html(0);	
function getProductGoodsData() {
    loading();
    $.ajax({
        url: plumeApi["listProductGoods"],
        type: "GET",
        data:datas,
   		dataType:'json',
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
            totalPage = Math.ceil(data.countRecord/10);
            unloading();
            if(data.countRecord){
            $('.alert-info strong').html(data.countRecord);
        	}else{
        	 $('.alert-info strong').html(0);	
        	}
            $("[list-node]").remove();
            $(".table-block").setPageData(data);

            newPage(totalPage,function(i){
			var newData = JSON.stringify(datas);
			$.ajax({
				url: plumeApi["listProductGoods"],
				type: "GET",
				data: datas,
				dataType: "json",
				contentType: "application/json; charset=utf-8",
				success: function(data) {
					unloading();
		            $('.alert-info strong').html(data.countRecord);
		            $("[list-node]").remove();
		            $(".table-block").setPageData(data);
				},
				});
			});
        }
    });
}

});