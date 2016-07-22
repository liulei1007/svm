$(function(){
	
	$.plumeLog("进入receiptManage模板自定义js-" +$.plumeTime());
	$.setPageCount();
	$('#createdFrom').cxCalendar();
    $('#createdTo').cxCalendar();
	datas={
			"warehouseCode": "",
			"companyCode": "",
			"pageNo":"1",		
			"pageSize":"10"
			}

    $.tableCheckBox();
    
   
	
	
    $.when(getWarehouseCodeAndCompanyCodeByUseId(), getWarehouseByUserId()).done(function () {
		  getReceiptList();	
	});
	$('div.btn-search').bind('click',function() {
		datas.warehouseCode=$('#warehouseCode option:selected').val();
		datas.companyCode=$('#companyCode option:selected').val();
		datas.receiptCode=$('#receiptCode').val();
		datas.trailingSts = $('#trailingSts option:selected').val();
		datas.erpOrderCode = $('#erpOrderCode').val();
		datas.itemName=$('#itemName').val();
		datas.brand=$('#brand').val();
		datas.batch=$('#batch').val();
		if($('#createdFrom').val()!= ''){
			datas.createdFrom=$('#createdFrom').val()+" 00:00:00";
		}
		if($('#createdTo').val()!= ''){
			datas.createdTo=$('#createdTo').val()+" 23:59:59";
		}
		if( datas.warehouseCode.length==0 || datas.companyCode.length==0){
            $.showPopTips('信息提示', 'warning', '仓库编码和货主编码不能为空');
		    return ;
        }  
		getReceiptList();
        $(".nav-pagination").off();
	})

	
	function bindListEvent () {
		
		var dataBack = {} ;
		 //点击查看
		$("tbody").off().on("click", '.bl-btn-look', function () {
			//获取返回数据
			dataBack.code = $(this).parents('tr').find('.codeClass').html();
           	dataBack.receiptType= $(this).parents('tr').find('.receiptTypeClass').html();
            dataBack.leadingStatus= $(this).parents('tr').find('.leadingStatusClass').html();	
            dataBack.erpOrderCode= $(this).parents('tr').find('.erpOrderCodeClass').html();
            dataBack.created= $(this).parents('tr').find('.createdClass').html();				
            $.session.dataBack = JSON.stringify(dataBack)  ;
			
			$.getReceiptId(this);	
			$.directPage('receiptListShow');
		});
	}
	
	//入库单列表

   function getReceiptList() {
	    datas.pageSize = $.onePageCount();
    	$.commonAjax({
            url: 'getReceiptList',
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
				bindListEvent();
                var pageSize = Math.ceil(JSON.parse(data.data).total / $.onePageCount());

                newPage(pageSize, function (page) {
					datas.pageNo = page ;
					datas.pageSize = $.onePageCount();
                    $.commonAjax({
                        url: 'getReceiptList', /* +"?currentPage="+i+"&onePageCount="+onePageCount(),*/
                        type: "POST",
                        data: datas,
                        list: true,
                        success: function (data) {
                            $("[list-node]").remove();
                            $(".table-block").setPageData(JSON.parse(data.data));
                            bindListEvent();
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
				   for(var i=0; i<data.length; i++) 
				   {  
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