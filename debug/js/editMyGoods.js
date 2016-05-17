$(function () {
    formCtrl();
    function getGoodsInfo() {
        loading();
        var productId = session.goods_edit_productId;
        $.ajax({
            type: "POST",
            url: plumeApi["getProductInfo"] + "/" + productId,
            data: "",
            async:"",
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                unloading();
                var d = data.data;
                $("#productName").val(d.productName);
                $("#productSecondName").val(d.productSecondName);
                $("#brandId").val(d.brandId);
                $("#seriesId").val(d.seriesId);
                //$("#cityId").val(d.cityId);
                $("#modelNumber ").val(d.modelNumber);
                $("#materialQuality").val(d.materialQuality);
                $("#weight").val(d.weight);
                $("#material1").val(d.material1);
                $("#material2").val(d.material2);
                $("#material3").val(d.material3);
            }
        })
    }

    getGoodsInfo();

    $(".alert-danger").hide();
    //类目参数
    function userTypeInit() {
        $(".userType").text(session.goods_userType);
    }

    userTypeInit();
    $(".changeType").bind("click", function () {
        derict(this, "userType", "nochangeurl");
    });
    var len;
    var list
    $('.upload-btn-left').bind('click', leftEvent);
    $('.upload-btn-right').bind('click', rightEvent);
    $('.upload-btn-delect').bind('click', delectEvent);
    initialize()
    // 初始化
    function initialize() {
        list = $('.goodsPic');
        len = list.length;
        list.first().addClass('first-upload-btn').find('.upload-btn-left').unbind('click', leftEvent);
        list.last().addClass('last-upload-btn').find('.upload-btn-right').unbind('click', rightEvent);
    }

    // 左按钮事件
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

    //右按钮事件
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

    //删除事件
    function delectEvent() {
        $(this).parents('li').remove();
        initialize();
    }

    //图片上传
    $("#cmg-upload").bind("click", function () {
        uploadPop(function () {
            $(".pu-ok").bind("click", function () {
                //closeUploadPop();
            });
            $(".pu-cancel").bind("click", function () {
                closeUploadPop();
            });
        });
    });
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
                var colorName = $(this).parent().find(".cmg-colorName").val();
                var colorDesc = $(this).parent().find(".cmg-colorDesc").val();
                var n = colorName;
                if (colorDesc != "") {
                    n = colorDesc;
                }
                if (c) {
                    $(this).parent().find(".color-desc").show();
                    var temp = "<tr class='colortr tr" + colorid + "'  colorValue='" + colorValue + "' colorid='" + colorid + "'><td class='colorName' colorDesc='' colorName='" + colorName + "' >" + n + "</td><td></td></tr>"
                    $(".cmg-table-color").append(temp);
                } else {
                    $(this).parent().find(".color-desc").hide();
                    $(".cmg-table-color").find(".tr" + colorid).remove();
                }
            });
            //描述填写
            $(".cmg-colorDesc").unbind().bind("blur", function () {
                var colorid = $(this).parent().parent().parent().find(".color-box").attr("colorid");
                var colorName = $(this).parent().parent().parent().find(".cmg-colorName").val();
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

    setColors();
    //提交


    $(".cmg-ok").bind("click", function () {
        if (validata()) {
            return false;
        }
        var pram_str = '{';
        pram_str += '"productName": "' + $("#productName").val() + '",';
        pram_str += '"productSecondName": "' + $("#productSecondName").val() + '",';
        pram_str += '"brandId": ' + $("#brandId").val() + ',';
        pram_str += ' "seriesId": ' + $("#seriesId").val() + ',';
        pram_str += '"seriesName": "",';
        pram_str += ' "brandName": "",';
        pram_str += ' "countryId": "",';
        pram_str += '"countryName": "",';
        pram_str += '"provinceId": "' + 1 + '",';
        pram_str += '"provinceName": "",';
        pram_str += '"cityId": "' + $("#cityId").val() + '",';
        pram_str += '"cityName": "' + $("#cityId").find("option:selected").text() + '",';
        pram_str += '"modelNumber": "' + $("#modelNumber ").val() + '",';
        pram_str += ' "materialQuality": "' + $("#materialQuality").val() + '",';
        pram_str += '"weight": ' + $("#weight").val() + ',';
        pram_str += '"chargeUnit": "",';
        pram_str += '"material": "",';
        pram_str += ' "material1": "' + $("#material1").val() + '",';
        pram_str += ' "material2": "' + $("#material2").val() + '",';
        pram_str += '"material3": "' + $("#material3").val() + '",';
        pram_str += '"marketPrice": 0,';
        pram_str += ' "priceType": "",';
        pram_str += '"lvInfo": "",';
        pram_str += '"categoryId": 0,';
        pram_str += ' "subCategoryId": 0,';
        pram_str += '"subCategoryName": "",';
        pram_str += ' "saleStatus": "",';
        pram_str += '"attributes": [';
        pram_str += ' {';
        pram_str += '"attrValueId": 0,';
        pram_str += ' "attrValue": "",';
        pram_str += ' "attributeId": 0';
        pram_str += '}';
        pram_str += '],';
        pram_str += '  "photos": [';
        pram_str += '{';
        pram_str += '  "colorId": 0,';
        pram_str += ' "picUrl": "1"';
        pram_str += ' }';
        pram_str += ' ],';
        pram_str += ' "goods": [';
        pram_str += '{';
        pram_str += ' "colorId": 0,';
        pram_str += '"colorRgb": "",';
        pram_str += '"color": "",';
        pram_str += '"standard": "",';
        pram_str += ' "salePrice": 0';
        pram_str += '}';
        pram_str += ']';
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
                        $(".pop").find(".popup-info").html(data.resDescription);
                    });
                }
                console.log(data);
            }
        });
    });

    //地区下拉列表
    function getlistNationRegion() {
        $.get(plumeApi["listNationRegion"], {}, function (data) {
            $(".cmg-region1").setPageData(data);
            $(".cmg-region1").find(".form-control").bind("change", function () {
                var adresscode = $(this).find("option:selected").attr("adresscode");
                loading();
                $.get(plumeApi["listNationRegion"] + "/" + adresscode, {}, function (data) {
                    unloading();
                    $(".cmg-region2").setPageData(data);
                });
            });
        });
    }

    getlistNationRegion();
    //表单验证
    function validata() {
        //$(".notNull").each(function () {
        //    if ($(this).val() == "") {
        //        console.log($(this).attr("id"))
        //        $(this).focus();
        //        $(this).parent().parent().find(".alert-danger").text("数据项不能为空!").show();
        //        return false;
        //    } else {
        //        $(this).parent().parent().find(".alert-danger").hide();
        //        return true;
        //    }
        //});
        var re = /^[0-9]+.?[0-9]*$/;
        $(".num").each(function () {
            console.log($(this).attr("id"))
            if (re.test($(this).val())) {
                $(this).parent().parent().find(".alert-danger").hide();
                return true;
            } else {
                $(this).focus();
                $(this).parent().parent().find(".alert-danger").text("请输入数字!").show();
                return false;

            }
        });
    }

    //规格
    function setStandard() {
        $(".cmg-btn-addStandard").bind("click", function () {
            var stand = $("#standard").val();
            var marketPrice = $("#marketPrice").val();
            $(".colortr").each(function () {
                var colorid = $(this).attr("colorid");
                var colorname = $(this).find(".colorName").attr("colorname");
                var temp = '<tr>';
                temp += '<td colorid="' + colorid + '">' + colorname + '</td>';
                temp += '<td><input type="text" class="form-control" value="' + stand + '"></td>';
                temp += '<td><input type="text" class="form-control" value="' + marketPrice + '"></td>';
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

    setStandard();
});
