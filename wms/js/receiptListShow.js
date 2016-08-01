$(function() {

	$('.btn-back').bind('click',function() {
		$.directPage('receiptManage');
	});
    
	
	function getReceiptDetail() {
		var dataAll = {} ;
    $.commonAjax({
            url: 'getReceiptDetail',
            type: "GET",
            urlParams: {
                receiptHeaderId: $.session.receipt_receiptId
            },
            list: true,
            success: function (data) {
                
                if (data.ok == false) {
                    alert(data.resDescription);
                    return;
                }
				dataAll.receiptBase = JSON.parse($.session.dataBack) ;
				dataAll.receiptDetail = data.data ;
                $(".body-typein").setPageData(dataAll);
            }
        }); 

}

getReceiptDetail()
});