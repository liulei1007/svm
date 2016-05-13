$(function () {
    formCtrl();
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
        ;
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
                closeUploadPop();
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
            console.log($(".color-font")[0].outerHTML)
            $($(".color-font")[1]).addClass("sel");
            $(".cm-color-body").setPageData(data.data[0]);
            //切换颜色标签
            $(".color-row").find("li").bind("click", function () {
                var i = parseInt($(this).attr("plumeindex"));
                $(".color-row").find(".sel").removeClass("sel");
                $(this).find(".color-font").addClass("sel");
                $(".cm-color-body").find("[list-node]").remove();
                $(".cm-color-body").setPageData(data.data[i]);
            });
            //选择颜色
            $(".color-box").bind("click",function(){
                var c = $(this).is(':checked');
                var colorid=$(this).attr("colorid");
                var colorValue=$(this).parent().find(".cmg-colorValue").attr("colorValue");
                var colorName=$(this).parent().find(".cmg-colorName").val();
                var colorDesc=$(this).parent().find(".cmg-colorDesc").val();
                var n=colorName;
                if(colorDesc!=""){
                    n=colorDesc;
                }
                if(c){
                    $(this).parent().find(".color-desc").show();
                    var temp="<tr class='tr"+colorid+"'  colorValue='"+colorValue+"' coloid='"+colorid+"'><td class='colorName' colorDesc='"+colorDesc+"' colorName='"+colorName+"' >"+n+"</td><td></td></tr>"
                    $(".cmg-table-color").append(temp);
                }else{
                    $(this).parent().find(".color-desc").hide();
                    $(".cmg-table-color").find(".tr"+colorid).remove();
                }
            });
            //描述填写
            $(".cmg-colorDesc").bind("blur",function(){
                var colorid=$(this).parent().parent().parent().find(".color-box").attr("colorid");
                var colorName=$(this).parent().parent().parent().find(".cmg-colorName").val();
                var desc=$(this).val();
                if(desc!=""){
                    $(".cmg-table-color").find(".tr"+colorid).find(".colorName").text(desc);
                }else{
                    $(".cmg-table-color").find(".tr"+colorid).find(".colorName").text(colorName);
                }
            });
        });
    }
    setColors();
    //提交



    $(".cmg-ok").bind("click", function () {
        var pram_str = '{';
        pram_str += '"productName": "'+$("#productName").val()+'",';
        pram_str += '"productSecondName": "'+$("#productSecondName").val()+'",';
        pram_str += '"brandId": '+$("#brandId").val()+',';
        pram_str += ' "seriesId": '+$("#seriesId").val()+',';
        pram_str += '"seriesName": "",';
        pram_str += ' "brandName": "",';
        pram_str += ' "countryId": "",';
        pram_str += '"countryName": "",';
        pram_str += '"provinceId": "",';
        pram_str += '"provinceName": "",';
        pram_str += '"cityId": "'+$("#cityId").val()+'",';
        pram_str += '"cityName": "'+$("#cityId").find("option:selected").text()+'",';
        pram_str += '"modelNumber": "",';
        pram_str += ' "materialQuality": "'+$("#materialQuality").val()+'",';
        pram_str += '"weight": '+$("#weight").val()+',';
        pram_str += '"chargeUnit": "",';
        pram_str += '"material": "",';
        pram_str += ' "material1": "",';
        pram_str += ' "material2": "",';
        pram_str += '"material3": "",';
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
    $(".cm-btn-del").bind("click",function(){
        $(this).parent().parent().remove();
    });
    //地区下拉列表
    function getlistNationRegion(){
        $.get(plumeApi["listNationRegion"],{},function(data){
            $(".cmg-region1").setPageData(data);
            $(".cmg-region1").find(".form-control").bind("change",function(){
                var adresscode=$(this).find("option:selected").attr("adresscode");
                loading();
                $.get(plumeApi["listNationRegion"]+"/"+adresscode,{},function(data){
                    unloading();
                    $(".cmg-region2").setPageData(data);
                });
            });
        });
    }
    getlistNationRegion();
})