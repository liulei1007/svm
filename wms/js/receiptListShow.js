$(function() {
    formCtrl();
	$('.btn-back').bind('click',function() {
		derict(this,"receiptManage","nochangeurl");
	});

	function getReceiptDetail() {
    loading();
    $.ajax({
        url: plumeApi["getReceiptDetail"]+"?receiptHeaderId="+session.receipt_receiptId,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
        	unloading();
            $(".body-typein").setPageData(JSON.parse(data.data));
        }
    });
}



getReceiptDetail()
});