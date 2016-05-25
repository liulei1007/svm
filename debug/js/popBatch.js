$(function() {
	$(".btn-cancel").bind("click",function() {
		$(".pop").hide();
	});


	 $('#myForm').ajaxForm(function (data) {
                unloading();
                if (data.ok) {
                    alert("上传成功");
                    $('.pop').hide();
                } else {
                    alert(data.resDescription || data.data);
                    $('.pop').hide();
                }
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
         }
	});
});