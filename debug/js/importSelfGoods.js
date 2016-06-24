$(function () {
    $(".close").bind("click", function() {
        $(this).parents(".alert").hide();
    });
    $(".btn-chooseSort").bind("click", function() {
    	$(".popSort").loadTemp("popUserType", "nochangeurl", function () {
            
        });
    });
    $(".btn-cancel").bind("click",function() {
    	$(".pop").hide();
    });

       // $(".btn-import-data").bind("click", function () {
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
           $('.btn-cancel').bind('click', function () {
               $(".pop").hide();
           });


           $(".ex-ok").bind("click", function () {
               var filePath  = ($('#fileSuffix').html());
               var fileSuffix = filePath.substring(filePath.lastIndexOf(".")+1);
               if(fileSuffix!="xlsx"&&fileSuffix!=""&&fileSuffix!="xls"){
                  alert("上传格式不正确");
               }
               if (($("#file").val()&&(fileSuffix=="xlsx"||fileSuffix=="xls"))) {
                   document.myForm.action = plumeApi["importProductStash"]
                   $('#myForm').submit();  
               }
           });

           $(".btn-loadModule").bind("click", function () {
                  window.location = plumeApi["exportProductStashTemplate"] + "?count=1000"
           });

   // })
  
})