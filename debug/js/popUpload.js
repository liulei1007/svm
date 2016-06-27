$(function () {
    plumeLog("进入popUpload模板自定义js-"+plumeTime());
    $("#myform").attr("action",plumeApi_Host+"common/uploadFiles");
    //$(".pu-ok").bind("click", function () {
    //    loading();
    //    $('#myform').submit();
    //})
    //$('#myform').ajaxForm(function (data) {
    //    unloading();
    //    if(data.ok){
    //        $("#filepath").val(data.data);
    //        var temp='<li class="goodsPic">';
    //        temp+='<img class="cmg-goodsimgs" src="'+"http://img2.hxmklmall.cn"+$("#filepath").val()+'">';
    //        temp+='<div class="upload-btn upload-btn-left">';
    //        temp+='<div class="arrow-left"></div>';
    //        temp+='</div>';
    //        temp+='<div class="upload-btn upload-btn-right">';
    //        temp+='<div class="arrow-right"></div>';
    //        temp+='</div>';
    //        temp+='<div class="upload-btn upload-btn-delect">';
    //        temp+='<div class="arrow-close"></div>';
    //        temp+='</div>';
    //        temp+='</li>';
    //        $(".goodsPic-upload").append(temp);
    //        closeUploadPop();
    //    }else{
    //        alert(data.resDescription);
    //    }
    //});
})