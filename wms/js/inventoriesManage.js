$(function(){
	
	$.setPageCount();
	$('#createdFrom').cxCalendar();
    $('#createdTo').cxCalendar();
	datas={
      "warehouseCode": "",
      "companyCode": "",
	  "itemCode":"",
      "pageNo":"1",		
      "pageSize":"9"
     }

    //$.tableCheckBox(); 
	$.plumeLog("进入groundGoods模板自定义js-"+$.plumeTime());
    
	$.when(getWarehouseCodeAndCompanyCodeByUseId(), getWarehouseByUserId()).done(function () {
		  getInventoriesList();	
	});
	
	$('div.btn-search').bind('click',function() {
		datas.warehouseCode=$('#warehouseCode option:selected').val();
		datas.companyCode=$('#companyCode option:selected').val();
		if( datas.warehouseCode.length==0 || datas.companyCode.length==0){  
		    $.showPopTips('信息提示', 'warning', '仓库编码和货主编码不能为空');
		    return ;
        }  
		datas.itemBrand = $('#brand').val();
		datas.itemName=$('#itemName').val();
		datas.batch=$('#batch').val();
		if($('#createdFrom').val()!= ''){
			datas.createdFrom=$('#createdFrom').val()+" 00:00:00";
		}
		if($('#createdTo').val()!= ''){
			datas.createdTo=$('#createdTo').val()+" 23:59:59";
		}
		datas.itemCode = $('#itemCode').val();
		datas.parentCode = $('#parentCode').val();
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
  
 
function getWarehouseByUserId () {
	//获取仓库信息
	return $.commonAjax({
		url: 'selectWarehouseByUserId',
		type: "GET",
		urlParams: {
			userId: $.session.login_id
		},
		success: function (data) {
			if (data.ok == false) {
				alert(data.resDescription);
				return;
			}
		   $("#warehouseCode").empty() ;
		   for(var i=0; i<data.length; i++) {  
				$("#warehouseCode").append("<option value='"+data[i].warehouseCode+"'>"+data[i].warehouseName+"</option>");
		   } 
		   
		   datas.warehouseCode=$('#warehouseCode option:selected').val();
		}
	});
}
 
 
//获取仓库信息
function getWarehouseCodeAndCompanyCodeByUseId(){
	
	// 获取货主信息
	return $.commonAjax({
		url: 'selectCompanyByUserId',
		type: "GET",
		urlParams: {
			userId: $.session.login_id
		},
		success: function (data) {
			if (data.ok == false) {
				alert(data.resDescription);
				return;
			}
		   $("#companyCode").empty() ;
		   for(var i=0; i<data.length; i++) 
		   {  
		   $("#companyCode").append("<option value='"+data[i].companyCode+"'>"+data[i].companyName+"</option>");
		   } 
		   
		   datas.companyCode=$('#companyCode option:selected').val();
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

