$(function(){
	plumeLog("进入receiptManage模板自定义js-" + plumeTime());
    $('#createdFrom').cxCalendar();
    $('#createdTo').cxCalendar()
	setPageCount();
	datas={
		"warehouseCode": "SJZ01",
		"companyCode": "JLM",
		"leadingSts":"900",
		"createdFrom":"2016-07-05 17:18:39",
		"fields":"id,code,receiptType,companyCode,erpOrderCode,totalLines,leadingSts,trailingSts,shipFromAttentionTo,scheduledArriveDate",
		"pageNo":"1",		
		"pageSize":"8"
		}
		 
	tablecheckbox();
	plumeLog("进入groundGoods模板自定义js-"+plumeTime());
    
    //点击查看
	$("tbody").on("click", '.bl-btn-look', function () {
        getReceiptId(this);
        derict(this, "receiptListShow", "nochangeurl");
    })
	
	
	getReceiptList();
	$('.btn-search').bind('click',function() {
		datas.warehouseCode=$('#warehouseCode option:selected').val();
		datas.companyCode=$('#companyCode').val();
		datas.receiptCode=$('#receiptCode').val();
		datas.leadingSts=$('#leadingSts').val();
		datas.createdFrom=$('#createdFrom').val()+" 00:00:00";
		datas.createdTo=$('#createdTo').val()+" 00:00:00";
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
		getReceiptList();
        $(".nav-pagination").off();
	})

	//入库单列表

function getReceiptList() {
    loading();
    var newData = JSON.stringify(datas)
    $.ajax({
        url: plumeApi["getReceiptList"], /*+"?currentPage=1&onePageCount="+onePageCount(),*/
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
					url: plumeApi["getReceiptList"],
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