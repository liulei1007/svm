$(function () {
    var timer = null;
    session.goods_baseCategoryId = "";
    session.goods_subCategoryId = "";
    session.goods_categoryId = "";

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
              clearTimeout(timer);
               var filePath  = ($('#fileSuffix').html());
               var fileSuffix = filePath.substring(filePath.lastIndexOf(".")+1);
               if(fileSuffix!="xlsx"&&fileSuffix!=""&&fileSuffix!="xls"){
                  alert("上传格式不正确");
               }else if(!session.goods_baseCategoryId){
                alert("请选择分类");
               }
               if (($("#file").val()&&(fileSuffix=="xlsx"||fileSuffix=="xls")&&session.goods_baseCategoryId)) {
                   document.myForm.action = plumeApi["uploadEx"] + session.goods_baseCategoryId + "/" + session.goods_subCategoryId + "/" + session.goods_categoryId

                   timer = setTimeout(function(){
                      $('#myForm').submit();
                   } ,2000)           
               }
           });

           $(".btn-loadModule").bind("click", function () {
               if (session.goods_baseCategoryId) {
                   var count = $(".btn-count input").val();
                   window.location = plumeApi["downloadEx"] + session.goods_baseCategoryId + "/" + session.goods_subCategoryId + "/" + session.goods_categoryId + "?count=1000"
               } else {
                   alert("请选择类目");
               }
           });

   // })
  
})