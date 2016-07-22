$(function() {
	// 初始化传输数据
	var datas = {
		"brandName": "",
		"pdtName": "",
		"categoryId": 0,
		"categoryName": "",
		"pgtType": "",
		"standard": "",
		"material": "",
		"orgName": "",
		"priceType": "",
		"salePrice": 0,
		"saleStatus": "",
		"standardUnit":""
	}

	getlistNationRegion();


	// 如果是复制，将复制的商品的信息写入表单
	if (session.stashGoods_operate == "edit") {
		getSelfData($(".form-block"), session.stashGoods_stashId);
	}
	// 如果是新增商品信息，获取产品一级分类
	else getFirstCategory($(".form-block"), null);

	// 绑定检验表单事件
	checkForm();

	// 绑定“提交”按钮
	$(".form-block .btn-submit").bind("click", function() {
		checkSelfGoods("发布", datas, plumeApi["addProductStash"]);
	});

	// 绑定“取消”按钮
	$(".form-block .btn-cancel").bind("click", function() {
		derict(this, "releaseSelfGoods", "nochangeurl");
	});

	//单位规格
	var standardUnit = JSON.parse(session.standard_unit);

	$("#standardUnit").setPageData(standardUnit);

	$("#standardUnit").find("option").eq(1).prop('selected','selected');

	//计价单位

	var unit = JSON.parse(session.unit);

	$("#chargeUnit").setPageData(unit);

	$("#chargeUnit").find("option").eq(1).prop('selected','selected');

	 //地区下拉列表
    function getlistNationRegion(defaultAddress) {
        var productType = session.goods_showMyGoods_type == "create",
            defaultType = productType && defaultAddress;

        $.get(plumeApi["listNationCode"], {}, function (data) {
            $(".cmg-region0").find("[list-node]").remove();
            $(".cmg-region0").setPageData(data);

            if (defaultType && defaultAddress[0]) {
                $("#countryId").val(defaultAddress[0]);
                defaultAddress[0] == 'CN' ? $(".cmg-region1,.cmg-region2").show() : $(".cmg-region1,.cmg-region2").hide();
            } else {
                $(".cmg-region0").find(".form-control").val("CN");
            }

            $("#countryId").on("change", function () {
                if ($(this).val() == "CN") {
                    $(".cmg-region1,.cmg-region2").show();
                } else {
                    $(".cmg-region1,.cmg-region2").hide();
                    $(this).val() && $(this).parent().parent().find('.alert-danger').hide();
                }
            });
        });

        var getSubAddress = function (adresscode) {
            $.get(plumeApi["listNationRegion"] + "/" + adresscode, {}, function (data) {
                unloading();
                $(".cmg-region2").find("[list-node]").remove();
                $(".cmg-region2").setPageData(data);
                defaultType && defaultAddress[2] && $("#cityId").val(defaultAddress[2]);
                $("#cityId").on("change", function () {
                    $(this).val() && $(this).parent().parent().find('.alert-danger').hide();
                });
            });
        };

        $.get(plumeApi["listNationRegion"], {}, function (data) {
            $(".cmg-region1").find("[list-node]").remove();
            $(".cmg-region1").setPageData(data);
            if (defaultType && defaultAddress[1]) {
                $("#provinceId").val(defaultAddress[1]);
                getSubAddress(defaultAddress[1])
            }
            $("#provinceId").on("change", function () {
                var adresscode = $(this).find("option:selected").attr("adresscode");
                loading();
                getSubAddress(adresscode);
            });
        });
    }
});