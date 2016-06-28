$(function () {
    formCtrl();
    plumeLog("进入myGoods模板自定义js-" + plumeTime());
    // 绑定点击图片展示大图
    $(".createNewGoods").on("click", ".cmg-goodsimgs", function () {
        var imgSrc = $(this).attr("src");
        // 首先判断是否已经有大图显示
        if ($(".form-loading .media-show").html()) {
            $(".form-loading .media-show img").attr("src", imgSrc);
        }
        else {
            $(".form-loading").prepend('<div class="media-show"><span class="btn btn-close" onclick="closeBigImage()"></span><img src="' + imgSrc + '"></div>');
        }
    });
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
            derict(this, "userType", "nochangeurl");
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
        $("#brandId,#seriesId,#productName,#modelNumber").attr("disabled", true);
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

    //草稿初始化
    function myGoodsDraftInit() {
        //隐藏错误提示
        $(".alert-danger").hide();
        $(".changeType").hide();
        $(".mg-title").text("编辑商品");
        //返回按钮
        $(".cmg-cancel").bind("click", function () {
            derict(this, "goodsDraft", "nochangeurl");
        });
        getDraftDataInit();
    }

    if (session.goods_showMyGoods_type == "create") {
        $('.cmg-draft').show();
        myGoodsCreateInit();
    } else if (session.goods_showMyGoods_type == "edit") {
        myGoodsEditInit();
    } else if (session.goods_showMyGoods_type == "copy") {
        myGoodsCopyInit();
    } else if (session.goods_showMyGoods_type == "feed") {
        myGoodsFeedInit();
    } else if (session.goods_showMyGoods_type == "amend") {
        myGoodsAmendInit();
    }else if (session.goods_showMyGoods_type == "draft") {
        myGoodsDraftInit();
    }
    if (session.goods_baseCategoryId == 1) {
        $(".material").show();
        $(".material_temp").hide();
    } else {
        $(".material").hide();
        $(".checkShow").hide();
        $(".material_temp").show();
    }

    var standardUnitHtml = '';
    function getStandardUnit () {
        return $.commonAjax({
            url: 'standardUnit',
            type: 'get',
            success: function (data) {
                if (data.ok && data.data && data.data.length > 0) {
                    var data = data.data,
                        dataLen = data.length;

                    for (var i = 0; i < dataLen; i++) {
                        standardUnitHtml += '<option value="' + data[i].codeValueCode + '">' + data[i].codeValueName + '</option>';
                    }
                }
            }
        })
    }

    //草稿初始化
    function getDraftDataInit(){
        var code=JSON.parse(session.goods_code);
        var d = code;
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
        if (d.countryId == "CN") {
            $(".cmg-region1,.cmg-region2").show();
            $("#provinceId").val(d.provinceId);
            var adresscode = $("#provinceId").find("option:selected").attr("adresscode");
            if (adresscode && adresscode != "") {
                $.get(plumeApi["listNationRegion"] + "/" + adresscode, {}, function (data) {
                    $(".cmg-region2").setPageData(data);
                });
                $("#cityId").val(d.cityId);
            }
        } else {
            $(".cmg-region1,.cmg-region2").hide();
        }

        $("#modelNumber").val(d.modelNumber);
        $("#materialQuality").val(d.materialQuality);
        $("#marketPrice").val(d.marketPrice);
        $("#weight").val(d.weight);
        $("#chargeUnit").val(d.chargeUnit);
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
        var productGoods, productInfoPhotos, productInfoAttrORMs;
        if (session.goods_showMyGoods_type == "amend") {
            productGoods = d.productGoodsUpts;
            productInfoPhotos = d.productInfoPhotoUpts;
            productInfoAttrORMs = d.productInfoAttrUptORMs;
        } else {
            productGoods = d.goods;
            productInfoPhotos = d.photos;
            productInfoAttrORMs = d.attributes;
        }

        var showStandard = function () {
            for (var j = 0; j < productGoods.length; j++) {
                var p = productGoods[j];
                var temp = '<tr class="cmg-goodstr">';
                temp += '<td productGoodsId="' + p.productGoodsId + '" colorname="' + p.color + '" colorvalue="' + p.colorRgb + '" colorid="' + p.colorId + '">' + p.color + '</td>';
                temp += '<td><input type="text" class="form-control stand" value="' + p.standard + '"></td>';
                temp += '<td><select class="form-control standardUnit">' + standardUnitHtml + '</select></td>';
                // temp += '<td><input type="text" class="form-control marketPrice" value="' + p.salePrice + '"></td>';
                temp += '<td>';
                temp += '<button type="button" class="btn btn-default btn-sm cm-btn-del">删除</button>';
                temp += '</td>';
                temp += '</tr>';
                $(".standardtbody").append(temp);

                $($('.standardtbody tr').get(j)).find('.standardUnit').val(p.standardUnit);
                if ($(".tr" + p.colorId).length == 0) {
                    var temp1 = "<tr class='colortr tr" + p.colorId + "'  colorValue='" + p.colorRgb + "' colorid='" + p.colorId + "'><td class='colorName' colorDesc='' colorName='" + p.color + "' >" + p.color + "</td></tr>"
                    $(".cmg-table-color").append(temp1);
                }
            }
        };

        standardUnitHtml ? showStandard() : getStandardUnit().done(function () {
            showStandard();
        });

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
            $("[attributeid=" + p.attributeId + "]").val(p.attrValueId);
        }
        picMove();
        $.ajaxSetup({
            async: true
        });
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
                unloading();
                if (!data.data) {
                    $('.pop').loadTemp("popTips", "nochangeurl", function () {
                        $(".pop").find(".popup-title").html("信息提示");
                        $(".pop").find(".popup-icon").html('<i class="warning"></i>');
                        $(".pop").find(".popup-info").html("未查询到数据!");
                    });
                    return;
                }
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
                if (d.countryId == "CN") {
                    $(".cmg-region1,.cmg-region2").show();
                    $("#provinceId").val(d.provinceId);
                    var adresscode = $("#provinceId").find("option:selected").attr("adresscode");
                    if (adresscode && adresscode != "") {
                        $.get(plumeApi["listNationRegion"] + "/" + adresscode, {}, function (data) {
                            $(".cmg-region2").setPageData(data);
                        });
                        $("#cityId").val(d.cityId);
                    }
                } else {
                    $(".cmg-region1,.cmg-region2").hide();
                }

                $("#modelNumber").val(d.modelNumber);
                $("#materialQuality").val(d.materialQuality);
                $("#marketPrice").val(d.marketPrice);
                $("#weight").val(d.weight);
                $("#chargeUnit").val(d.chargeUnit);
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
                var productGoods, productInfoPhotos, productInfoAttrORMs;
                if (session.goods_showMyGoods_type == "amend") {
                    productGoods = d.productGoodsUpts;
                    productInfoPhotos = d.productInfoPhotoUpts;
                    productInfoAttrORMs = d.productInfoAttrUptORMs;
                } else {
                    productGoods = d.productGoods;
                    productInfoPhotos = d.productInfoPhotos;
                    productInfoAttrORMs = d.productInfoAttrORMs;
                }

                var showStandard = function () {
                    for (var j = 0; j < productGoods.length; j++) {
                        var p = productGoods[j];
                        var temp = '<tr class="cmg-goodstr">';
                        temp += '<td productGoodsId="' + p.productGoodsId + '" colorname="' + p.color + '" colorvalue="' + p.colorRgb + '" colorid="' + p.colorId + '">' + p.color + '</td>';
                        temp += '<td><input type="text" class="form-control stand" value="' + p.standard + '"></td>';
                        temp += '<td><select class="form-control standardUnit">' + standardUnitHtml + '</select></td>';
                        // temp += '<td><input type="text" class="form-control marketPrice" value="' + p.salePrice + '"></td>';
                        temp += '<td>';
                        temp += '<button type="button" class="btn btn-default btn-sm cm-btn-del">删除</button>';
                        temp += '</td>';
                        temp += '</tr>';
                        $(".standardtbody").append(temp);

                        $($('.standardtbody tr').get(j)).find('.standardUnit').val(p.standardUnit);

                        if ($(".tr" + p.colorId).length == 0) {
                            var temp1 = "<tr class='colortr tr" + p.colorId + "'  colorValue='" + p.colorRgb + "' colorid='" + p.colorId + "'><td class='colorName' colorDesc='' colorName='" + p.color + "' >" + p.color + "</td></tr>"
                            $(".cmg-table-color").append(temp1);
                        }
                    }
                };

                standardUnitHtml ? showStandard() : getStandardUnit().done(function () {
                    showStandard();
                });

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
                    $("[attributeid=" + p.attributeId + "]").val(p.attrValueId);
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
                unloading();
                if (!data.data) {
                    $('.pop').loadTemp("popTips", "nochangeurl", function () {
                        $(".pop").find(".popup-title").html("信息提示");
                        $(".pop").find(".popup-icon").html('<i class="warning"></i>');
                        $(".pop").find(".popup-info").html("未查询到数据!");
                    });
                    return;
                }
                $(".cmg-brand").setPageData(data);
                $("#brandId").bind("change", function () {
                    loading();
                    var brandId = $(this).val();
                    $.get(plumeApi["listOmsBrandSeries"] + "/" + brandId, {}, function (data) {
                        unloading();
                        $(".cmg-series").find("[list-node]").remove();
                        $(".cmg-series").setPageData(data);
                        $("#seriesId").find("[list-node]").eq(0).attr("selected","selected");
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
                temp += '<div class="col-sm-4">';
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

    var totalNum = 0;

    //初始化图片移动
    function picMove() {
        var len;
        var list;
        $('.upload-btn-left').off().on('click', leftEvent);
        $('.upload-btn-right').off().on('click', rightEvent);
        $('.upload-btn-delect').off().on('click', delectEvent);
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
            totalNum > 0 && totalNum--;
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
        var flag = true;

        $(".cmg-error").removeClass("cmg-error");
        $(".alert-danger").text("").hide();

        $(".notNull").each(function () {
            if ($(this).val() == "") {
                $(this).addClass("cmg-error");
                $(this).parent().parent().find(".alert-danger").text("数据项不能为空!").show();
                flag = false;
            } else {
                $(this).parent().parent().find(".alert-danger").hide();
            }
        });

        var $_countryId = $("#countryId"),
            $_provinceId = $('#provinceId'),
            $_cityId = $('#cityId');

        if ($_countryId.val() === "CN") {
            var pid = $.trim($_provinceId.val()), cid = $.trim($_cityId.val());

            var validAddress = function ($it, result) {
                var $obj = $it.parent().parent().find(".alert-danger");
                result ? $obj.text("数据项不能为空!").show() : $obj.text('').hide();
            };
            if (!pid || !cid) {
                pid ? validAddress($_cityId, true) : validAddress($_provinceId, true);
                flag = false;
            } else {
                validAddress($_cityId, false) && validAddress($_provinceId, false);
            }
        }

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
            var $color = $(".colortr"),
                stand = $("#standard").val(),
                marketPrice = $("#marketPrice").val();

            if (!$color || $color.length === 0) {
                $('.pop').loadTemp("popTips", "nochangeurl", function () {
                    $(".pop").find(".popup-title").html("信息提示");
                    $(".pop").find(".popup-icon").html('<i class="warning"></i>');
                    $(".pop").find(".popup-info").html('请选择颜色分类');
                });

                $('tr.cmg-goodstr').remove();

                return false;
            }

            var showStandard = function () {
                $(".colortr").each(function () {
                    var colorid = $(this).attr("colorid");
                    var colorvalue = $(this).attr("colorvalue");
                    var colorname = $(this).find(".colorName").text();stand
                    var temp = '<tr class="cmg-goodstr">';
                    temp += '<td colorname="' + colorname + '" colorvalue="' + colorvalue + '" colorid="' + colorid + '">' + colorname + '</td>';
                    temp += '<td><input type="text" class="form-control stand" value="' + stand + '"></td>';
                    temp += '<td><select class="form-control standardUnit">' + standardUnitHtml + '</select></td>';
                    // temp += '<td><input type="text" class="form-control marketPrice" value="' + marketPrice + '"></td>';
                    temp += '<td>';
                    temp += '<button type="button" class="btn btn-default btn-sm cm-btn-del">删除</button>';
                    temp += '</td>';
                    temp += '</tr>';
                    $(".standardtbody").append(temp);
                    $(".cm-btn-del").unbind().bind("click", function () {
                        $(this).parent().parent().remove();
                    });
                });
            };

            standardUnitHtml ? showStandard() : getStandardUnit().done(function () {
                showStandard();
            });
        });
    }

    //价格类型,等级初始化
    function dataInit() {
        // $(".cmg-initdata1").setPageData(JSON.parse(session.price_tpye));
        // 计价单位
        $("div.chargeUnit").setPageData(JSON.parse(session.unit));
        $('#chargeUnit option:eq(1)').prop('selected', 'selected');
        // 等级
        $(".cmg-initdata2").setPageData(JSON.parse(session.product_lv));
        $('#lvInfo option:eq(1)').prop('selected', 'selected');
    }

    //图片上传
    $("#cmg-upload").bind("click", function () {
        uploadPop(function () {
            $('#myform').ajaxForm({
                //  iframe: true,
                dataType: 'json',
                success: function (data) {
                    unloading();
                    if (!data.data) {
                        $('.pop').loadTemp("popTips", "nochangeurl", function () {
                            $(".pop").find(".popup-title").html("信息提示");
                            $(".pop").find(".popup-icon").html('<i class="warning"></i>');
                            $(".pop").find(".popup-info").html(data.resDescription);
                        });
                        return;
                    }
                    if (data.ok) {
                        var temp = [], baseUrl = JSON.parse(session.img_url).data,
                            imgUrl = data.data || 0,
                            imgUrlLen = imgUrl && imgUrl.length;

                        for (var i = 0; i < imgUrlLen; i++) {
                            temp.push('<li class="goodsPic">',
                                '<img class="cmg-goodsimgs" src="' + baseUrl[parseInt(Math.random() * (baseUrl.length))].codeValueCode + imgUrl[i].path  + '">',
                                '<div class="upload-btn upload-btn-left">',
                                '<div class="arrow-left"></div>',
                                '</div>',
                                '<div class="upload-btn upload-btn-right">',
                                '<div class="arrow-right"></div>',
                                '</div>',
                                '<div class="upload-btn upload-btn-delect">',
                                '<div class="arrow-close"></div>',
                                '</div></li>'
                            );
                        }

                        $(".goodsPic-upload").append(temp.join(''));
                        closeUploadPop();
                        picMove()
                    } else {
                        alert(data.resDescription);
                    }
                }

            });

            var errorTip = function (message) {
                $('.pop').loadTemp("popTips", "nochangeurl", function () {
                    $(".pop").find(".popup-title").html("信息提示");
                    $(".pop").find(".popup-icon").html('<i class="warning"></i>');
                    $(".pop").find(".popup-info").html(message);
                });
            };

            $(".pu-ok").bind("click", function () {
                var $file = $("[name=files]"),
                    len = $file.prop('files').length;

                if ($file.val() == "") {
                    errorTip('请选择图片');
                } else if (totalNum + len > 5) {
                    errorTip('最多上传5张图片');
                } else {
                    loading();
                    totalNum += len;
                    $('#myform').submit();
                }

            });
            $(".pu-cancel").bind("click", function () {
                closeUploadPop();
            });
        });
    });

    var getRequestData = function (sessionType) {
        var dataJson = {},
            $_countryId = $("#countryId"),
            $_cityId = $('#cityId');
            $_provinceId = $('#provinceId'),

        sessionType == 'edit' && (dataJson.productId = $("#productId").val());
        sessionType == 'feed' && (dataJson.productId = $("#productId").val());
        sessionType == 'amend' && (dataJson.uptId = session.goods_showMyGoods_uptId);

        dataJson.productName = $("#productName").val();
        dataJson.productSecondName = $("#productSecondName").val();
        dataJson.brandId = $("#brandId").val();
        dataJson.seriesId = $("#seriesId").val();
        dataJson.seriesName =  $("#seriesId").find("option:selected").text();
        dataJson.brandName = $("#brandId").find("option:selected").text();
        dataJson.countryId = $_countryId.val();
        dataJson.countryName = $_countryId.find("option:selected").text();

        dataJson.provinceId = $.trim($_provinceId.val()) ? $.trim($_provinceId.val()) : 0;
        dataJson.provinceName = $_provinceId.find("option:selected").text();
        dataJson.cityId = $.trim($_cityId.val()) ? $.trim($_cityId.val()) : 0;
        dataJson.cityName = $_cityId.find("option:selected").text();
        dataJson.modelNumber = $("#modelNumber ").val();
        dataJson.materialQuality = $("#materialQuality").val();
        dataJson.weight = $("#weight").val();
        dataJson.chargeUnit = $("#chargeUnit").val();
        dataJson.material = $("#material").val();
        dataJson.material1 = $("#material1").val();
        dataJson.material2 = $("#material2").val();
        dataJson.material3 = $("#material3").val();
        dataJson.marketPrice = '' && $("#marketPrice").val();
        dataJson.priceType = '';
        dataJson.lvInfo = $("#lvInfo").val();
        dataJson.categoryId = session.goods_categoryId;
        dataJson.categoryName = session.goods_categoryName;
        dataJson.subCategoryId = session.goods_subCategoryId;
        dataJson.subCategoryName = session.goods_subCategoryName;
        dataJson.baseCategoryId = session.goods_baseCategoryId;
        dataJson.baseCategoryName = session.goods_baseCategoryName;
        dataJson.saleStatus = '';

        var attrArray = [], attrJson;
        $(".cmg-attrs").each(function () {
            attrJson = {};
            if ($(this).attr("attr_type") == 1) {
                attrJson.attrValueId = '0';
                attrJson.attrValue = $(this).val();
            } else {
                attrJson.attrValueId = $(this).val();
                attrJson.attrValue = '';
            }
            attrJson.attributeId = $(this).attr("attributeId");
            attrArray.push(attrJson);
        });
        dataJson.attributes = attrArray;

        var photosArray = [], photosJson;
        $(".cmg-goodsimgs").each(function () {
            photosJson = {};
            photosJson.colorId = '0';
            photosJson.picUrl = $(this).attr("src");
            photosArray.push(photosJson);
        });
        dataJson.photos = photosArray;

        var goodsArray = [], goodsJson;
        $(".cmg-goodstr").each(function () {
            goodsJson = {};
            goodsJson.colorId = $(this).find('td').attr("colorid");
            goodsJson.colorRgb = $(this).find('td').attr("colorvalue");
            goodsJson.color = $(this).find('td').attr("colorname");
            goodsJson.standard = $(this).find(".stand").val();
            goodsJson.salePrice = 0;
            goodsJson.standardUnit = $(this).find(".standardUnit option:selected").val();
            goodsArray.push(goodsJson);
        });
        dataJson.goods = goodsArray;

        return dataJson;
    };

    //提交
    $(".cmg-ok").bind("click", function () {
        if (!validata()) {
            return false;
        }

        var own = this;
        $(own).attr('disabled', 'disabled');

        var url = '',
            sessionType = session.goods_showMyGoods_type,
            dataJson = getRequestData(sessionType);

        sessionType && (url = {
            'create': plumeApi["addProductInfo"],
            'copy': plumeApi["addProductInfo"],
            'edit': plumeApi["editProductInfo"],
            'feed': plumeApi["addProductInfoFeedback"],
            'amend': plumeApi["editProductInfoUpt"],
            'draft': plumeApi["addDrafts"] + '/' + session.goods_showMyGoods_productId
        }[sessionType]);

        loading();

        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(dataJson),
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

                $(own).removeAttr('disabled');
            }
        });
    });
    //存草稿
    $(".cmg-draft").bind("click", function () {
        var own = this;
        $(own).attr('disabled', 'disabled');
        var requestData = {
            pdtName: $("#productName").val(),
            categoryId: 0,
            jsonString: JSON.stringify(getRequestData())
        };

        loading();

        $.ajax({
            type: "POST",
            url: plumeApi["addDraft"],
            data: JSON.stringify(requestData),
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                unloading();
                if (data.ok) {
                    $('.pop').loadTemp("popTips", "nochangeurl", function () {
                        $(".pop").find(".popup-title").html("信息提示");
                        $(".pop").find(".popup-icon").html('<i class="success"></i>');
                        $(".pop").find(".popup-info").html("数据提交成功");
                        derict(null, "goodsDraft", "nochangeurl");
                    });
                } else {
                    $('.pop').loadTemp("popTips", "nochangeurl", function () {
                        $(".pop").find(".popup-title").html("信息提示");
                        $(".pop").find(".popup-icon").html('<i class="warning"></i>');
                        $(".pop").find(".popup-info").html(data.resDescription);
                    });
                }
                $(own).removeAttr('disabled');
            }
        });
    });
});