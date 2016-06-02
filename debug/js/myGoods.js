$(function () {
    plumeLog("进入myGoods模板自定义js-" + plumeTime());
    //创建初始化
    function myGoodsCreateInit() {
        //隐藏错误提示
        $(".alert-danger").hide();
        //修改类目参数
        $(".changeType").bind("click", function () {
            derict(this, "userType", "nochangeurl");
        });
        //返回按钮
        $(".cmg-cancel").bind("click", function () {
            derict(this, "goodsDataManage", "nochangeurl");
        });
        $(".userType").text(session.goods_userType);
        $(".mg-title").text("新增商品");
        formCtrl();
        getbrandList();
        getProductAttribute();
        setColors();
        getlistNationRegion();
        setStandard();
        dataInit();
    }

    //编辑初始化
    function myGoodsEditInit() {
        //隐藏错误提示
        $(".alert-danger").hide();
        $(".changeType").hide();
        $(".mg-title").text("编辑商品");
        //返回按钮
        $(".cmg-cancel").bind("click", function () {
            derict(this, "goodsDataManage", "nochangeurl");
        });
        getDataInit();
    }

    //复制初始化
    function myGoodsCopyInit() {
        //隐藏错误提示
        $(".alert-danger").hide();
        $(".changeType").hide();
        $(".mg-title").text("复制新增商品");
        //返回按钮
        $(".cmg-cancel").bind("click", function () {
            derict(this, "goodsDataManage", "nochangeurl");
        });
        getDataInit();
    }
    //错误反馈初始化
    function myGoodsFeedInit() {
        //隐藏错误提示
        $(".alert-danger").hide();
        $(".changeType").hide();
        $(".mg-title").text("商品错误信息反馈");
        //返回按钮
        $(".cmg-cancel").bind("click", function () {
            derict(this, "takingGoods", "nochangeurl");
        });
        getDataInit();
    }

    //待完善初始化
    function myGoodsAmendInit() {
        //隐藏错误提示
        $(".alert-danger").hide();
        $(".changeType").hide();
        $(".mg-title").text("商品待完善数据编辑");
        //返回按钮
        $(".cmg-cancel").bind("click", function () {
            derict(this, "noCompleteData", "nochangeurl");
        });
        getDataInit();
    }
    if (session.goods_showMyGoods_type == "create") {
        myGoodsCreateInit();
    } else if (session.goods_showMyGoods_type == "edit") {
        myGoodsEditInit();
    } else if (session.goods_showMyGoods_type == "copy") {
        myGoodsCopyInit();
    } else if (session.goods_showMyGoods_type == "feed") {
        myGoodsFeedInit();
    } else if (session.goods_showMyGoods_type == "amend") {
        myGoodsAmendInit();
    }
    if (session.goods_baseCategoryId == 1) {
        $(".material").show();
        $(".material_temp").hide();
    } else {
        $(".material").hide();
        $(".material_temp").show();
    }
    //获取初始化数据
    function getDataInit() {
        loading();
        var suburl = ""
        if (session.goods_showMyGoods_type == "amend") {
            suburl = plumeApi["getProductInfoUpt"] + "/" + session.goods_showMyGoods_uptId
        } else {
            suburl = plumeApi["getProductInfo"] + "/" + session.goods_showMyGoods_productId;

        }
        $.ajax({
            type: "GET",
            url: suburl,
            data: "",
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                if (!data.data) {
                    $('.pop').loadTemp("popTips", "nochangeurl", function () {
                        $(".pop").find(".popup-title").html("信息提示");
                        $(".pop").find(".popup-icon").html('<i class="warning"></i>');
                        $(".pop").find(".popup-info").html("未查询到数据!");
                    });
                }
                unloading();
                var d = data.data;
                $(".emg-initdata").setPageData(d);
                $.ajaxSetup({
                    async: false
                });
                getlistNationRegion();
                getbrandList();
                setColors();
                dataInit();
                $("#brandId").val(d.brandId);
                $.get(plumeApi["listOmsBrandSeries"] + "/" + d.brandId, {}, function (data) {
                    $(".cmg-series").find("[list-node]").remove();
                    $(".cmg-series").setPageData(data);
                });
                $("#seriesId").val(d.seriesId);
                $("#productSecondName").val(d.productSecondName);
                $("#productName").val(d.productName);

                $("#countryId").val(d.countryId);
                if(d.countryId=="CN"){
                    $(".cmg-region1,.cmg-region2").show();
                    $("#provinceId").val(d.provinceId);
                    var adresscode = $("#provinceId").find("option:selected").attr("adresscode");
                    if (adresscode && adresscode != "") {
                        $.get(plumeApi["listNationRegion"] + "/" + adresscode, {}, function (data) {
                            $(".cmg-region2").setPageData(data);
                        });
                        $("#cityId").val(d.cityId);
                    }
                }else{
                    $(".cmg-region1,.cmg-region2").hide();
                }

                $("#modelNumber").val(d.modelNumber);
                $("#materialQuality").val(d.materialQuality);
                $("#marketPrice").val(d.marketPrice);
                $("#weight").val(d.weight);
                $("#priceType").val(d.priceType);
                $("#lvInfo").val(d.lvInfo);
                $("#material").val(d.material);
                $("#material1").val(d.material1);
                $("#material2").val(d.material2);
                $("#material3").val(d.material3);
                session.goods_categoryId = d.categoryId;
                session.goods_categoryName = d.categoryName;
                session.goods_subCategoryId = d.subCategoryId;
                session.goods_subCategoryName = d.subCategoryName;
                session.goods_baseCategoryId = d.baseCategoryId;
                session.goods_baseCategoryName = d.baseCategoryName;
                if (session.goods_baseCategoryId == 1) {
                    $(".material").show();
                    $(".material_temp").hide();
                } else {
                    $(".material").hide();
                    $(".material_temp").show();
                }
                getProductAttribute();
                var productGoods, productInfoPhotos,productInfoAttrORMs;
                if (session.goods_showMyGoods_type == "amend") {
                    productGoods = d.productGoodsUpts;
                    productInfoPhotos = d.productInfoPhotoUpts;
                    productInfoAttrORMs= d.productInfoAttrUptORMs;
                } else {
                    productGoods = d.productGoods;
                    productInfoPhotos = d.productInfoPhotos;
                    productInfoAttrORMs= d.productInfoAttrORMs;
                }
                for (var j = 0; j < productGoods.length; j++) {
                    var p = productGoods[j];
                    var temp = '<tr class="cmg-goodstr">';
                    temp += '<td productGoodsId="'+ p.productGoodsId+'" colorname="' + p.color + '" colorvalue="' + p.colorRgb + '" colorid="' + p.colorId + '">' + p.color + '</td>';
                    temp += '<td><input type="text" class="form-control stand" value="' + p.standard + '"></td>';
                    temp += '<td><input type="text" class="form-control marketPrice" value="' + p.salePrice + '"></td>';
                    temp += '<td>';
                    temp += '<button type="button" class="btn btn-default btn-sm cm-btn-del">删除</button>';
                    temp += '</td>';
                    temp += '</tr>';
                    $(".standardtbody").append(temp);
                    if ($(".tr" + p.colorId).length == 0) {
                        var temp1 = "<tr class='colortr tr" + p.colorId + "'  colorValue='" + p.colorRgb + "' colorid='" + p.colorId + "'><td class='colorName' colorDesc='' colorName='" + p.color + "' >" + p.color + "</td></tr>"
                        $(".cmg-table-color").append(temp1);
                    }
                }
                $(".colortr").each(function () {
                    var colorid = $(this).attr("colorid");
                    var colorName = $(this).find(".colorName").attr("colorName");
                    var colorDesc = $(this).find(".colorName").attr("colordesc");
                    $(".color-box").each(function () {
                        var colorid_temp = $(this).attr("colorid");
                        if (colorid_temp == colorid) {
                            $(this).prop("checked", true);
                            $(this).parent().find(".cmg-colorDesc").val(colorDesc).show();
                            $(this).parent().find(".color-desc").show();
                        }
                    });
                })
                $(".cm-btn-del").unbind().bind("click", function () {
                    $(this).parent().parent().remove();
                });
                setStandard();
                for (var k = 0; k < productInfoPhotos.length; k++) {
                    var p = productInfoPhotos[k];
                    var temp = '<li class="goodsPic">';
                    temp += '<img class="cmg-goodsimgs" src="' + p.picUrl + '">';
                    temp += '<div class="upload-btn upload-btn-left">';
                    temp += '<div class="arrow-left"></div>';
                    temp += '</div>';
                    temp += '<div class="upload-btn upload-btn-right">';
                    temp += '<div class="arrow-right"></div>';
                    temp += '</div>';
                    temp += '<div class="upload-btn upload-btn-delect">';
                    temp += '<div class="arrow-close"></div>';
                    temp += '</div>';
                    temp += '</li>';
                    $(".goodsPic-upload").append(temp);
                }
                for (var l = 0; l < productInfoAttrORMs.length; l++) {
                    var p = productInfoAttrORMs[l];
                    $("[attributeid="+ p.attributeId+"]").val(p.attrValueId);
                }
                picMove();
                $.ajaxSetup({
                    async: true
                });
            }
        });
    }

    //设置品牌
    function getbrandList() {
        loading();
        var pram_str = '{';
        pram_str += '"start": 0,';
        pram_str += '"limit": 0,';
        pram_str += '"brandName": "",';
        pram_str += '"contract": "",';
        pram_str += '"contractTel": "",';
        pram_str += '"objectId": 0';
        pram_str += '}';
        $.ajax({
            type: "POST",
            url: plumeApi["listOmsBrand"],
            data: pram_str,
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                $(".cmg-brand").setPageData(data);
                unloading();
                $("#brandId").bind("change", function () {
                    loading();
                    var brandId = $(this).val();
                    $.get(plumeApi["listOmsBrandSeries"] + "/" + brandId, {}, function (data) {
                        unloading();
                        $(".cmg-series").find("[list-node]").remove();
                        $(".cmg-series").setPageData(data);
                    });
                });
            }
        });
    }

    //获取商品属性
    function getProductAttribute() {
        var categoryId = session.goods_categoryId;
        $.get(plumeApi["listProductAttribute"] + "/" + categoryId, {}, function (data) {
            if (data.data.length == 0) {
                $(".mg-attr-block").hide();
            } else {
                $(".mg-attr-block").show();
            }
            for (var i = 0; i < data.data.length; i++) {
                var d = data.data[i];
                var temp = '<div class="form-group required">';
                temp += '<label class="col-sm-2 control-label">' + d.attrNameFront + '</label>';
                temp += '<div class="col-sm-2">';
                if (d.attr_input == "text") {
                    temp += '<div class="col-sm-4"><input type="text" id="" attr_type="1" class="form-control cmg-attrs" attr_code="' + d.attr_code + ' /> </div>';
                } else {
                    temp += '<select type="text" class="form-control cmg-attrs" attr_type="2" attributeId="' + d.attributeId + '">';
                    for (var j = 0; j < d.productAttributeValues.length; j++) {
                        var x = d.productAttributeValues[j];
                        temp += '<option value="' + x.valueId + '">' + x.valueName + '</option>';
                    }
                    temp += '</select>';
                }
                temp += '</div>';
                temp += '</div>';
                $(".goodsAttr-content").append(temp);
            }

        });
    }

    //初始化图片移动
    function picMove() {
        var len;
        var list;
        $('.upload-btn-left').bind('click', leftEvent);
        $('.upload-btn-right').bind('click', rightEvent);
        $('.upload-btn-delect').bind('click', delectEvent);
        initialize();

        function initialize() {
            list = $('.goodsPic');
            len = list.length;
            list.first().addClass('first-upload-btn').find('.upload-btn-left').unbind('click', leftEvent);
            list.last().addClass('last-upload-btn').find('.upload-btn-right').unbind('click', rightEvent);
        }

        function leftEvent() {
            var iIndex = $('.upload-btn-left').index($(this));
            if (iIndex == len - 1) {
                $(this).siblings('.upload-btn-right').bind('click', rightEvent).parents('li').removeClass('last-upload-btn');
            }
            if (iIndex == 1) {
                list.first().removeClass('first-upload-btn').find('.upload-btn-left').bind('click', leftEvent);
            }
            $(this).parents('li').insertBefore($('.goodsPic').eq(iIndex - 1));
            initialize();
        }

        function rightEvent() {
            var iIndex = $('.upload-btn-right').index($(this));
            if (iIndex == 0) {
                $(this).siblings('.upload-btn-left').bind('click', leftEvent).parents('li').removeClass('first-upload-btn');
            }
            if (iIndex == len - 2) {
                list.last().removeClass('last-upload-btn').find('.upload-btn-right').bind('click', rightEvent)
            }

            $(this).parents('li').insertAfter($('.goodsPic').eq(iIndex + 1));
            initialize();
        }

        function delectEvent() {
            $(this).parents('li').remove();
            initialize();
        }
    }

    //颜色初始化
    function setColors() {
        //return;
        loading();
        $.get(plumeApi["getColorSeries"], {}, function (data) {
            unloading();
            $(".cm-color-title").setPageData(data);
            $($(".color-font")[1]).addClass("sel");
            $(".cm-color-body").setPageData(data.data[0]);
            bindFunc();
            //切换颜色标签
            $(".color-row").find("li").bind("click", function () {
                var i = parseInt($(this).attr("plumeindex"));
                $(".color-row").find(".sel").removeClass("sel");
                $(this).find(".color-font").addClass("sel");
                $(".cm-color-body").find("[list-node]").remove();
                $(".cm-color-body").setPageData(data.data[i]);
                //选择颜色
                bindFunc();
                $(".colortr").each(function () {
                    var colorid = $(this).attr("colorid");
                    var colorName = $(this).find(".colorName").attr("colorName");
                    var colorDesc = $(this).find(".colorName").attr("colordesc");
                    console.log(colorDesc)
                    $(".color-box").each(function () {
                        var colorid_temp = $(this).attr("colorid");
                        if (colorid_temp == colorid) {
                            $(this).prop("checked", true);
                            $(this).parent().find(".cmg-colorDesc").val(colorDesc).show();
                            $(this).parent().find(".color-desc").show();
                        }
                    });
                })
            });
        });
        function bindFunc() {
            $(".color-box").unbind().bind("click", function () {
                var c = $(this).is(':checked');
                var colorid = $(this).attr("colorid");
                var colorValue = $(this).parent().find(".cmg-colorValue").attr("colorValue");
                var colorName = $(this).parent().find(".cmg-colorName").text();
                var colorDesc = $(this).parent().find(".cmg-colorDesc").val();
                var n = colorName;
                if (colorDesc != "") {
                    n = colorDesc;
                }
                if (c) {
                    $(this).parent().find(".color-desc").show();
                    var temp = "<tr class='colortr tr" + colorid + "'  colorValue='" + colorValue + "' colorid='" + colorid + "'><td class='colorName' colorDesc='' colorName='" + colorName + "' >" + n + "</td></tr>"
                    $(".cmg-table-color").append(temp);
                } else {
                    $(this).parent().find(".color-desc").hide();
                    $(".cmg-table-color").find(".tr" + colorid).remove();
                }
            });
            //描述填写
            $(".cmg-colorDesc").unbind().bind("blur", function () {
                var colorid = $(this).parent().parent().find(".color-box").attr("colorid");
                var colorName = $(this).parent().parent().find(".cmg-colorName").text();
                var desc = $(this).val();
                if (desc != "") {
                    $(".cmg-table-color").find(".tr" + colorid).find(".colorName").attr("colorDesc", desc);
                    $(".cmg-table-color").find(".tr" + colorid).find(".colorName").text(desc);
                } else {
                    $(".cmg-table-color").find(".tr" + colorid).find(".colorName").text(colorName);
                }
            });
        }
    }

    //地区下拉列表
    function getlistNationRegion() {
        $.get(plumeApi["listNationCode"], {}, function (data) {
            $(".cmg-region0").find("[list-node]").remove();
            $(".cmg-region0").setPageData(data);
            $(".cmg-region0").find(".form-control").val("CN").bind("change", function () {
                if ($(this).val() == "CN") {
                    $(".cmg-region1,.cmg-region2").show();
                } else {
                    $(".cmg-region1,.cmg-region2").hide();
                }
            });
        });
        $.get(plumeApi["listNationRegion"], {}, function (data) {
            $(".cmg-region1").find("[list-node]").remove();
            $(".cmg-region1").setPageData(data);
            $(".cmg-region1").find(".form-control").bind("change", function () {
                var adresscode = $(this).find("option:selected").attr("adresscode");
                loading();
                $.get(plumeApi["listNationRegion"] + "/" + adresscode, {}, function (data) {
                    unloading();
                    $(".cmg-region2").find("[list-node]").remove();
                    $(".cmg-region2").setPageData(data);
                });
            });
        });
    }

    //表单验证
    function validata() {
        $(".cmg-error").removeClass("cmg-error");
        $(this).parent().parent().find(".alert-danger").text("").hide();
        var flag = true;
        $(".notNull").each(function () {
            if ($(this).val() == "") {
                $(this).addClass("cmg-error");
                $(this).parent().parent().find(".alert-danger").text("数据项不能为空!").show();
                flag = false;
            } else {
                $(this).parent().parent().find(".alert-danger").hide();
            }
        });

        var re = /^[0-9]+.?[0-9]*$/;
        $(".num").each(function () {
            if ($(this).val() != "") {
                if (re.test($(this).val())) {
                    $(this).parent().parent().find(".alert-danger").hide();
                } else {
                    $(this).addClass("cmg-error")
                    $(this).parent().parent().find(".alert-danger").text("请输入数字!").show();
                    flag = false;
                }
            }

        });
        $($(".cmg-error")[0]).focus();
        return flag;
    }

    //规格
    function setStandard() {
        $(".cmg-btn-addStandard").bind("click", function () {
            var stand = $("#standard").val();
            var marketPrice = $("#marketPrice").val();
            $(".colortr").each(function () {
                var colorid = $(this).attr("colorid");
                var colorvalue = $(this).attr("colorvalue");
                var colorname = $(this).find(".colorName").text();
                var temp = '<tr class="cmg-goodstr">';
                temp += '<td colorname="' + colorname + '" colorvalue="' + colorvalue + '" colorid="' + colorid + '">' + colorname + '</td>';
                temp += '<td><input type="text" class="form-control stand" value="' + stand + '"></td>';
                temp += '<td><input type="text" class="form-control marketPrice" value="' + marketPrice + '"></td>';
                temp += '<td>';
                temp += '<button type="button" class="btn btn-default btn-sm cm-btn-del">删除</button>';
                temp += '</td>';
                temp += '</tr>';
                $(".standardtbody").append(temp);
                $(".cm-btn-del").unbind().bind("click", function () {
                    $(this).parent().parent().remove();
                });
            });
        });
    }

    //价格类型,等级初始化
    function dataInit() {
        $(".cmg-initdata1").setPageData(JSON.parse(session.price_tpye));
        $(".cmg-initdata2").setPageData(JSON.parse(session.product_lv));
    }

    //图片上传
    $("#cmg-upload").bind("click", function () {
        uploadPop(function () {
            $('#myform').ajaxForm({
                //iframe: true,
                success: function (data) {
                    unloading();
                    if (data.ok) {
                        $("#filepath").val(data.data);
                        var temp = '<li class="goodsPic">';
                        temp += '<img class="cmg-goodsimgs" src="' + (JSON.parse(session.img_url).data)[parseInt(Math.random() * (JSON.parse(session.img_url).data.length))].codeValueCode + $("#filepath").val() + '">';
                        temp += '<div class="upload-btn upload-btn-left">';
                        temp += '<div class="arrow-left"></div>';
                        temp += '</div>';
                        temp += '<div class="upload-btn upload-btn-right">';
                        temp += '<div class="arrow-right"></div>';
                        temp += '</div>';
                        temp += '<div class="upload-btn upload-btn-delect">';
                        temp += '<div class="arrow-close"></div>';
                        temp += '</div>';
                        temp += '</li>';
                        $(".goodsPic-upload").append(temp);
                        closeUploadPop();
                        picMove()
                    } else {
                        alert(data.resDescription);
                    }
                }

            });
            $(".pu-ok").bind("click", function () {
                //http://10.11.25.215/group01/M00/00/82/CgsZ2Fc-uPGADkdMAABXomkTTPc662.jpg

                if($("[name=file]").val()==""){
                    $('.pop').loadTemp("popTips", "nochangeurl", function () {
                        $(".pop").find(".popup-title").html("信息提示");
                        $(".pop").find(".popup-icon").html('<i class="warning"></i>');
                        $(".pop").find(".popup-info").html("请选择图片!");
                    });
                }else{
                    loading();
                    $('#myform').submit();
                }

            });
            $(".pu-cancel").bind("click", function () {
                closeUploadPop();
            });
        });
    });
    //提交
    $(".cmg-ok").bind("click", function () {
        console.log(validata())
        if (!validata()) {
            return false;
        }
        var pram_str = '{';
        if (session.goods_showMyGoods_type == "create" || session.goods_showMyGoods_type == "copy") {
            pram_str += '';
        } else if (session.goods_showMyGoods_type == "edit" || session.goods_showMyGoods_type == "feed") {
            pram_str += '"productId": "' + $("#productId").val() + '",';
        } else if (session.goods_showMyGoods_type == "amend") {
            pram_str += '"uptId": "' + session.goods_showMyGoods_uptId + '",';
        }
        pram_str += '"productName": "' + $("#productName").val() + '",';
        pram_str += '"productSecondName": "' + $("#productSecondName").val() + '",';
        pram_str += '"brandId": "' + $("#brandId").val() + '",';
        pram_str += ' "seriesId": "' + $("#seriesId").val() + '",';
        pram_str += '"seriesName": "' + $("#seriesId").find("option:selected").text() + '",';
        pram_str += ' "brandName": "' + $("#brandId").find("option:selected").text() + '",';
        pram_str += ' "countryId": "' + $("#countryId").val() + '",';
        pram_str += '"countryName": "' + $("#countryId").find("option:selected").text() + '",';
        var pid = "0";
        var cid = "0";
        var pname = "";
        var cname = "";
        if ($("#countryId").val() == "CN") {
            pid = $("#provinceId").val();
            pname = $("#provinceId").find("option:selected").text();
            cid = $("#cityId").val();
            cname = $("#cityId").find("option:selected").text();
        }
        pram_str += '"provinceId": "' + pid + '",';
        pram_str += '"provinceName": "' + pname + '",';
        pram_str += '"cityId": "' + cid + '",';
        pram_str += '"cityName": "' + cname + '",';
        pram_str += '"modelNumber": "' + $("#modelNumber ").val() + '",';
        pram_str += ' "materialQuality": "' + $("#materialQuality").val() + '",';
        pram_str += '"weight": "' + $("#weight").val() + '",';
        pram_str += '"chargeUnit": "元",';
        pram_str += '"material": "' + $("#material").val() + '",';
        pram_str += ' "material1": "' + $("#material1").val() + '",';
        pram_str += ' "material2": "' + $("#material2").val() + '",';
        pram_str += '"material3": "' + $("#material3").val() + '",';
        pram_str += '"marketPrice": "' + $("#marketPrice").val() + '",';
        pram_str += ' "priceType": "' + $("#priceType").val() + '",';
        pram_str += '"lvInfo": "' + $("#lvInfo").val() + '",';
        pram_str += '"categoryId": "' + session.goods_categoryId + '",';
        pram_str += '"categoryName": "' + session.goods_categoryName + '",';
        pram_str += ' "subCategoryId":' + session.goods_subCategoryId + ',';
        pram_str += '"subCategoryName": "' + session.goods_subCategoryName + '",';
        pram_str += ' "baseCategoryId": "' + session.goods_baseCategoryId + '",';
        pram_str += '"baseCategoryName": "' + session.goods_baseCategoryName + '",';
        pram_str += ' "saleStatus": "",';
        pram_str += '"attributes": [';
        var attrs_pram_str = "";
        $(".cmg-attrs").each(function () {
            attrs_pram_str += ' {';
            if ($(this).attr("attr_type") == 1) {
                attrs_pram_str += '"attrValueId": 0,';
                attrs_pram_str += ' "attrValue": "' + $(this).val() + '",';
            } else {
                attrs_pram_str += '"attrValueId": ' + $(this).val() + ',';
                attrs_pram_str += ' "attrValue": "",';
            }
            attrs_pram_str += ' "attributeId": ' + $(this).attr("attributeId");
            attrs_pram_str += '},';
        });
        pram_str += attrs_pram_str.substring(0, attrs_pram_str.length - 1);
        pram_str += '],';
        pram_str += '  "photos": [';
        var imgs_pram_str = "";
        $(".cmg-goodsimgs").each(function () {
            imgs_pram_str += '{';
            imgs_pram_str += '  "colorId": 0,';
            imgs_pram_str += ' "picUrl": "' + $(this).attr("src") + '"';
            imgs_pram_str += ' },';
        });
        pram_str += imgs_pram_str.substring(0, imgs_pram_str.length - 1);
        pram_str += ' ],';
        pram_str += ' "goods": [';
        var goods_pram_str = "";
        $(".cmg-goodstr").each(function () {
            goods_pram_str += '{';
            goods_pram_str += ' "colorId": ' + $(this).children().first().attr("colorid") + ',';
            goods_pram_str += '"colorRgb": "' + $(this).children().first().attr("colorvalue") + '",';
            goods_pram_str += '"color": "' + $(this).children().first().attr("colorname") + '",';
            goods_pram_str += '"standard": "' + $(this).find(".stand").val() + '",';
            goods_pram_str += ' "salePrice": "' + $(this).find(".marketPrice").val() + '"';
            goods_pram_str += '},';
        });
        pram_str += goods_pram_str.substring(0, goods_pram_str.length - 1);
        pram_str += ']';
        pram_str += '}';

        loading();
        var sub_url = "";
        if (session.goods_showMyGoods_type == "create" || session.goods_showMyGoods_type == "copy") {
            sub_url = plumeApi["addProductInfo"];
        } else if (session.goods_showMyGoods_type == "edit") {
            sub_url = plumeApi["editProductInfo"];
        } else if (session.goods_showMyGoods_type == "feed") {
            sub_url = plumeApi["addProductInfoFeedback"];
        } else if (session.goods_showMyGoods_type == "amend") {
            sub_url = plumeApi["editProductInfoUpt"];
        }
        $.ajax({
            type: "POST",
            url: sub_url,
            data: pram_str,
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                unloading();
                if (data.ok) {
                    $('.pop').loadTemp("popTips", "nochangeurl", function () {
                        $(".pop").find(".popup-title").html("信息提示");
                        $(".pop").find(".popup-icon").html('<i class="success"></i>');
                        $(".pop").find(".popup-info").html("数据提交成功");
                        if (session.goods_showMyGoods_type == "feed") {
                            derict(null, "takingGoods", "nochangeurl");
                        } else {
                            derict(null, "goodsAuditManage", "nochangeurl");
                        }
                    });
                } else {
                    $('.pop').loadTemp("popTips", "nochangeurl", function () {
                        $(".pop").find(".popup-title").html("信息提示");
                        $(".pop").find(".popup-icon").html('<i class="warning"></i>');
                        $(".pop").find(".popup-info").html(data.resDescription);
                    });
                }
            }
        });
    });
});
