$(function(){
	
	setPageCount();
	datas={
      "warehouseCode": "SJZ01",
      "companyCode": "JLM",
	  "itemCode":"",
      "pageNo":"1",
      "pageSize":"9"
      }

    $.tableCheckBox();
	plumeLog("进入groundGoods模板自定义js-"+plumeTime());

	getInventoriesList();
	$('.btn-search').bind('click',function() {
		datas.warehouseCode=$('#warehouseCode option:selected').val();
		datas.companyCode=$('#companyCode').val();
		if( datas.warehouseCode.length==0 || datas.companyCode.length==0){
		   $('.pop').loadTemp("popTips", "nochangeurl", function () {
                $(".pop").find(".popup-title").html("信息提示");
                $(".pop").find(".popup-icon").html('<i class="warning"></i>');
                $(".pop").find(".popup-info").html("仓库编码和货主编码不能为空");
            });
			datas.warehouseCode = "SJZ01";
			datas.companyCode = "JLM";
		    return ;
        }
		datas.itemCode=$('#itemCode').val();
		getInventoriesList();
        $(".nav-pagination").off();
	})

	//库存列表

function getInventoriesList() {
    loading();
    var newData = JSON.stringify(datas)
    $.ajax({
        url: plumeApi["getInventoriesList"], /*+"?currentPage=1&onePageCount="+onePageCount(),*/
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        data: newData,
        dataType:"json",
        success: function (data) {
            unloading();
            $("[list-node]").remove();
            $(".table-block").setPageData(JSON.parse(data.data));


			// 分页
			totalPage = Math.ceil(JSON.parse(data.data).total / 9);
			newPage(totalPage || 1, function (i) {
				datas.pageNo = i;
				var newData = JSON.stringify(datas);
				unloading();
				$.ajax({
					url: plumeApi["getInventoriesList"],
					type: "POST",
					data: newData,
					dataType: "json",
					contentType: "application/json; charset=utf-8",
					success: function (data) {
						$("[list-node]").remove();
						$(".table-block").setPageData(JSON.parse(data.data));
					}
				});
			});
        }
    });
}



//清空搜索
    $('.btn-empty').bind('click', function() {
        window.location.reload();
    });

//回车搜索
    keyDown('.btn-search');


});

