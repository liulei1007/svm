$(function(){
	
	$.setPageCount();
	datas={
      "warehouseCode": "SJZ01",
      "companyCode": "JLM",
	  "itemCode":"",
      "pageNo":"1",		
      "pageSize":"9"
     }

    $.tableCheckBox(); 
	$.plumeLog("进入groundGoods模板自定义js-"+$.plumeTime());

	getInventoriesList();
	$('div.btn-search').bind('click',function() {
		datas.warehouseCode=$('#warehouseCode option:selected').val();
		datas.companyCode=$('#companyCode').val();
		if( datas.warehouseCode.length==0 || datas.companyCode.length==0){  
		    $.showPopTips('信息提示', 'warning', '仓库编码和货主编码不能为空');
			datas.warehouseCode = "SJZ01";
			datas.companyCode = "JLM";
		    return ;
        }  
		datas.itemBrand = $('#brand').val();
		datas.itemName=$('#itemName').val();
		datas.batch=$('#batch').val();
		getInventoriesList();
        $(".nav-pagination").off();
	})

	//库存列表

function getInventoriesList() {
	datas.pageSize = $.onePageCount();
	$.commonAjax({
            url: 'getInventoriesList',
            type: "POST",
            data: datas,
            list: true,
            success: function (data) {

                if (data.ok == false) {
                    alert(data.resDescription);
                    return;
                }
                $("[list-node]").remove();
                $(".table-block").setPageData(JSON.parse(data.data));

                var totalPage = Math.ceil(JSON.parse(data.data).total / $.onePageCount());

                newPage(totalPage, function (page) {
					datas.pageNo = page ;
					datas.pageSize = $.onePageCount();
                    $.commonAjax({
                        url: 'getInventoriesList', /* +"?currentPage="+i+"&onePageCount="+onePageCount(),*/
                        type: "POST",
                        data: datas,
                        list: true,
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
     $.key.keydownEnter('.btn-search');


});

