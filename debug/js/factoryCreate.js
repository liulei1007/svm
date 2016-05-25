$(function() {
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
                    $(".ac-cityId1").setPageData(data);
                });
            });
            
        });
    }
    getlistNationRegion();

    function checkNull() {
    	var flag = true;
    	$(".form-group.required").each(function() {
    		var $this = $(this);
    		$this.removeClass("has-warning").find(".alert").remove();
    		if ($this.find("input").val().trim() == "") {
    			console.log("null");
    			$this.addClass("has-warning").append('<div class="col-sm-2 alert alert-info">请输入</div>');
    			flag = false;
    		}
    	});
    	return flag;
    }

    // 点击“提交”
    $(".btn-submit").bind("click", function() {
    	// 确保必填项不为空
    	if (checkNull()) {
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
    	}
    });

    // 点击“返回”
    $(".btn-back").bind("click", function() {
        window.location.href="/secondreg?fullscreen";
    });
})