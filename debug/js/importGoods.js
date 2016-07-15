$(function () {

    var importGoods={

        //初始参数
      init: function() {
        session.goods_baseCategoryId = "";
        session.goods_subCategoryId = "";
        session.goods_categoryId = "";

        return this;
      },

      //事件绑定
      bindEvent: function() {
          var $_this = this;
          $(".close").bind("click", function() {
            $(this).parents(".alert").hide();
          });
          $(".btn-chooseSort").bind("click", function() {
            $(".popSort").loadTemp("popUserType", "nochangeurl");
          });
          $(".ex-ok").bind("click", $_this.submitForm);
          $(".btn-loadModule").bind("click", function () {
            if (session.goods_baseCategoryId) {
              var count = $(".btn-count input").val();
              $_this.downloadModule();
            } else {
              unloading();
              showPopTips('请选择分类',"warning","");
            }
          });

          return $_this;
      },




      //页面ajaxForm请求
      ajaxForm: function() {
        $('#myForm').ajaxForm(function (data) {
          data.ok?(
            unloading(),
            $(".loadFile").val(""),
            $('#fileSuffix').html(""),
            showPopTips('上传成功',"warning","")
            )
            :(
              unloading(),
            alert(data.resDescription || data.data),
            $('.pop').hide()
            );
        });
      },


      //ajax提交
      submitForm: function() {
        $_this = this;
        var filePath  = ($('#fileSuffix').html());

        var fileSuffix = filePath.substring(filePath.lastIndexOf(".")+1);

        if(fileSuffix!="xlsx"&&fileSuffix!=""&&fileSuffix!="xls"){

          showPopTips('上传格式不正确',"warning","");

        }else if(!session.goods_baseCategoryId){

        showPopTips('请选择分类',"warning","");

        }else if(fileSuffix==""){

          showPopTips('未选择上传文件',"warning","");  
              
        }

        if (($("#file").val()&&(fileSuffix=="xlsx"||fileSuffix=="xls")&&session.goods_baseCategoryId)) {

           loading();

           document.myForm.action = plumeApi["uploadEx"] + session.goods_baseCategoryId + "/" + session.goods_subCategoryId + "/" + session.goods_categoryId

           $('#myForm').submit();         
                
        }
      },


      //下载模板
      downloadModule: function() {
        window.location = plumeApi["downloadEx"] + session.goods_baseCategoryId + "/" + session.goods_subCategoryId + "/" + session.goods_categoryId + "?count=1000"
      },


      //控制器
      importGoodsController: function() {
        this.init().bindEvent().ajaxForm();
      }
    }

    importGoods.importGoodsController();
   
})