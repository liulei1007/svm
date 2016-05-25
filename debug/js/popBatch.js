$(function() {
	$(".btn-cancel").bind("click",function() {
		$(".pop").hide();
	});

	$(".btn-loadModule").bind("click",function() {
		 if($(".btn-count input").val()){
                var count=$(".btn-count input").val();
             window.location = plumeApi["downBatch"]+"?count="+count
            }else{
                alert(请选择模板列数)
            }
	});

	$(".ex-ok").bind("click",function() {
		 if (($("#file").val())) {
                    document.myForm.action=plumeApi["upBacth"]
                    $('#myForm').submit();
                    session.goods_baseCategoryId="";
                    session.goods_subCategoryId="";
                    session.goods_categoryId="";
         }
	});
});