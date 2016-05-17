$(function () {
	listProductInfoUpt();

    tablecheckbox();
	$('.table-block').on('click','.btn-audit',function() {
		var uptIds = [];
        uptIds.push($(this).parents("tr").find(".uptId").html());
		auditFun();
	});
    
    $('.btn-allAudit').click(function() {
        var uptIds = [];
        $('tbody input:checkbox').each(function(i,checkbox) {
            if($(this).prop('checked')==true){
                uptIds.push($(this).parents('tr').find('.uptId').html());
            }
        });
        auditFun();
    });
});



function auditFun() {
    $('.pop').loadTemp("popAudit", "nochangeurl",function() {
            $('.pop').on('click', '.btn-sure', function () {
            var audit = {
                "uptIds":uptIds,
                "reviewStatus": $('.reviewStatus').find("input[name='audit']:checked").val(),
                "remark": $('.remark').val()
            };
            loading();
            $.ajax({
                url:plumeApi["reviewProductInfo"] ,
                type: "POST",
                contentType: "application/json;charset=UTF-8",
                data:JSON.stringify(audit),
                success: function (data) {
                    if(data.ok){
                        unloading();
                        popTips("审核成功","success");
                        listProductInfoUpt();
                    }else{
                        unloading();
                        popTips("审核失败","warning");
                        listProductInfoUpt();
                }
            }
            });
            $('.pop').hide();
            $('.pop').off('click', '.btn-sure');
            $('.pop').off('click', '.btn-cancel');
        });
        $('.pop').on('click', '.btn-cancel', function () {
            $('.pop').hide();
            $('.pop').off('click', '.btn-sure');
            $('.pop').off('click', '.btn-cancel');
        });
         }); 
}