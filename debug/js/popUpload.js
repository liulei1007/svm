$(function () {
    plumeLog("进入popUpload模板自定义js-"+plumeTime());
    $(".pu-ok").bind("click", function () {
        $('#myform').submit();
    })
    $('#myform').ajaxForm(function (data) {
        if(data.ok){
            $("#filepath").val(data.data);
        }else{
            alert(data.resDescription);
        }
    });
})