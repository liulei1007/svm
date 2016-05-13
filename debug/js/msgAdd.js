$(function () {
    plumeLog("进入msgAdd模板自定义js-" + plumeTime());
    $("#ma-reset").bind("click", function () {
        derict(this, "msgmanage", "nochangeurl");
    });
    $(".ma-btn-sub").bind("click", function () {
        var pram_str = '{';
        pram_str += '"brandId": 0,';
        pram_str += '"brandName": "",';
        pram_str += '"feedbackType": "",';
        pram_str += '"feedbackCategory": "",';
        pram_str += '"feedbackContent": ""';
        pram_str += '}';
        loading();
        $.ajax({
            type: "POST",
            url: plumeApi["addProductInfo"],
            data: pram_str,
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                unloading();
                if (data.ok) {
                    $('.pop').loadTemp("popTips", "nochangeurl", function () {
                        $(".pop").find(".popup-title").html("信息提示");
                        $(".pop").find(".popup-icon").html('<i class="success"></i>');
                        $(".pop").find(".popup-info").html("增加成功");
                    });
                } else {
                    $('.pop').loadTemp("popTips", "nochangeurl", function () {
                        $(".pop").find(".popup-title").html("信息提示");
                        $(".pop").find(".popup-icon").html('<i class="warning"></i>');
                        $(".pop").find(".popup-info").html("增加失败");
                    });
                }
                console.log(data);
            }
        });
    });
})