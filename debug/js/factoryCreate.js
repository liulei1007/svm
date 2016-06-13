$(function() {
    var ifNull = false, ifRegionChoosed = false;
    // 绑定表单输入框验证不为空事件
    formControl();

    // 显示地区下拉列表
    getlistNationRegion();

    // // 验证手机号码
    // $("#mobliephone").blur(function() {
    //     checkPhone($(this), "create");
    // });

    // 显示地区下拉列表
	function getlistNationRegion() {
        loading();
        $.get(plumeApi["listNationRegion"], {}, function (data) {
            unloading();
            $(".ac-provinceId").setPageData(data);
            $("#provinceId1").bind("change", function () {
                var adresscode = $(this).find("option:selected").attr("adresscode");
                loading();
                $.get(plumeApi["listNationRegion"] + "/" + adresscode, {}, function (data) {
                    unloading();
                    $(".ac-cityId1").find("[list-node]").remove();
                    $(".ac-cityId1").setPageData(data);
                });
            });
            
        });
    }

    // 点击“提交”
    $(".btn-submit").bind("click", function() {
        ifNull = false;
        // 首先确保数据都输入了
        $(".form-group.required input").each(function() {
            if (!checkFormNull($(this))) ifNull = true;
        });
        // 检验是否选择了所在城市
        var $formBlock = $("#cityId1").parents(".form-group");
        // 如果当前输入框已有其他提示信息，退出
        if ($formBlock.hasClass("has-warning") || $formBlock.hasClass("has-error")) {
            ifRegionChoosed = false;
            return;
        }
        if ($("#cityId1").find("option:selected").text() == "") {
            ifRegionChoosed = false;
            $formBlock.addClass("has-warning").append('<div class="col-sm-2 alert alert-info">请选择所在城市</div>');
        }
        else {
            ifRegionChoosed = true;
        }
        // 确保输入的数据都有效
        // if (!ifPhoneSuccess || !ifRegionChoosed || ifNull) { return; }
        if (!ifRegionChoosed || ifNull) { return; }
    	
        var pram_str = '{';
        pram_str += '"brandName": "' + $("#brandName").val() + '",';
        pram_str += '"contacts": "' + $("#contacts").val() + '",';
        pram_str += '"mobliephone": "' + $("#mobliephone").val() + '",';
        pram_str += '"provinceId": "' + $("#provinceId1").val() + '",';
        pram_str += '"provinceName": "' + $("#provinceId1").find("option:selected").text() + '",';
        pram_str += '"cityId": "' + $("#cityId1").val() + '",';
        pram_str += '"cityName": "' + $("#cityId1").find("option:selected").text()+ '",';
        pram_str += '"marketId": "' + $("#marketId1").val() + '"';
        pram_str += '}';
        loading();
        $.ajax({
            type: "POST",
            url: plumeApi["addCompanyInfoFactory"],
            data: pram_str,
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                unloading();
                if (data.ok) {
                    $('.pop').loadTemp("popTips", "nochangeurl", function () {
                        $(".pop").find(".popup-title").html("信息提示");
                        $(".pop").find(".popup-icon").html('<i class="success"></i>');
                        $(".pop").find(".popup-info").html("提交成功");
                    });
                    window.location.href="waitCheck?fullscreen";
                }
                else {
                    $('.pop').loadTemp("popTips", "nochangeurl", function () {
                        $(".pop").find(".popup-title").html("信息提示");
                        $(".pop").find(".popup-icon").html('<i class="warning"></i>');
                        $(".pop").find(".popup-info").html("提交失败:"+data.data);
                    });
                }
            }
        });
    });

    // 点击“返回”
    $(".btn-back").bind("click", function() {
        window.location.href="/secondreg?fullscreen";
    });
})