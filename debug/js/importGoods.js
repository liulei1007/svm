$(function () {
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
               if (data.ok) {
                unloading()
                $(".loadFile").val("");
                $('#fileSuffix').html("");
                   alert("上传成功");
                   $('.pop').hide();
               } else {
                  unloading();
                   alert(data.resDescription || data.data);
                   $('.pop').hide();
               }
           });
           $('.btn-cancel').bind('click', function () {
               $(".pop").hide();
           });

           $(".ex-ok").bind("click", importUpLoad);

           $(".btn-loadModule").bind("click", function () {
               if (session.goods_baseCategoryId) {
                   var count = $(".btn-count input").val();
                   window.location = plumeApi["downloadEx"] + session.goods_baseCategoryId + "/" + session.goods_subCategoryId + "/" + session.goods_categoryId + "?count=1000"
               } else {
                  unloading();
                   alert("请选择类目");
               }
           });

          function importUpLoad() {

               var filePath  = ($('#fileSuffix').html());
               var fileSuffix = filePath.substring(filePath.lastIndexOf(".")+1);
               if(fileSuffix!="xlsx"&&fileSuffix!=""&&fileSuffix!="xls"){
                  alert("上传格式不正确");
               }else if(!session.goods_baseCategoryId){
                alert("请选择分类");
               }else if(fileSuffix==""){
                alert("请选择上传格式")
               }
               if (($("#file").val()&&(fileSuffix=="xlsx"||fileSuffix=="xls")&&session.goods_baseCategoryId)) {
                    loading();
                   document.myForm.action = plumeApi["uploadEx"] + session.goods_baseCategoryId + "/" + session.goods_subCategoryId + "/" + session.goods_categoryId
                      $('#myForm').submit();         
               }
          }
   // })
  
})