$(function () {
  var importSelfGoods = {
    bindEvent: function() {
      $_this = this;
      $(".close").bind("click", function() {
        $(this).parents(".alert").hide();
      });
      $(".btn-chooseSort").bind("click", function() {
        $(".popSort").loadTemp("popUserType", "nochangeurl", function () {});
      });
      $(".btn-cancel").bind("click",function() {
        $(".pop").hide();
      });
      $(".btn-loadModule").bind("click", function() {
        window.location = plumeApi["exportProductStashTemplate"] + "?count=1000"
      });
      $(".ex-ok").bind("click", $_this.submitForm);

      return $_this;
    },

    //页面ajaxForm请求
    ajaxForm: function() {
      $('#myForm').ajaxForm(function (data) {
        if (data.ok) {
          unloading();
          $(".loadFile").val("");
          $('#fileSuffix').html("");
          showPopTips('上传成功',"warning","");
        } else {
          unloading();
          alert(data.resDescription || data.data);
          $('.pop').hide();
        }
      });
    },



    //ajax提交
    submitForm: function() {
      $_this = this;
      var filePath  = ($('#fileSuffix').html());

      var fileSuffix = filePath.substring(filePath.lastIndexOf(".")+1);

      if(fileSuffix!="xlsx"&&fileSuffix!=""&&fileSuffix!="xls"){

        showPopTips('上传格式不正确',"warning","");

      }else if(fileSuffix==""){

        showPopTips('未选择上传文件',"warning","");  
            
      }

      if (($("#file").val()&&(fileSuffix=="xlsx"||fileSuffix=="xls"))) {

        loading();

        document.myForm.action = plumeApi["importProductStash"]

        $('#myForm').submit();         
              
      }
    },

    //控制器
    importSelfGoodsController: function() {
      this.bindEvent().ajaxForm();
    }
  }

   importSelfGoods.importSelfGoodsController();

})