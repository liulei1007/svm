/**
 * Created by lenovo on 2016/7/05.
 */
// 公用请求方法
(function ($) {

    var host = '', path = window.location.href;

    if (path.indexOf("longguo.mmall.com") != -1) {
        path.indexOf('wms') > -1 ? host = "http://longguo.mmall.cn" : host = "http://longguo.mmall.cn/api/";
    } else if (path.indexOf("longguo.hxmklmall.cn") != -1) {
        path.indexOf('wms') > -1 ? host = "http://longguo.hxmklmall.cn" : host = "http://longguo.hxmklmall.cn/api/";
    } else {
        path.indexOf('wms') > -1 ? host = "http://longguo.hxmklmall.cn" : host = "http://longguo.hxmklmall.cn/api/";
    }

    if (path.indexOf("localhost") != -1) {
        $.ajaxSetup({
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true
        });
    }

    // loading
    $.loading = function () {
        if (!($(".lockbg").length > 0)) {
            $(document.body).append("<div class='lockbg'></div>");
            $(".lockbg").show();
        }

        if (!($(".loading").length > 0)) {
            var temp = '<div class="popcenter loading"></div>';
            $(document.body).append(temp);
        }
    };

    $.unloading = function () {
        $(".lockbg").fadeOut(function () {
            $(this).remove();
        });
        $(".loading,.loading-img").fadeOut(function () {
            $(this).remove();
        });
    };

    /**
     * 判断是否为json对象
     * @param obj
     * @returns {boolean}
     */
    $.jsonValid = function (obj) {
        return typeof(obj) == "object" &&
            Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length
    };

    /**
     * 默认ajax请求
     * @returns {{type: string, url: null, data: {}, contentType: string, dataType: string, beforeSend: beforeSend}}
     */
    $.defaultAjax = function () {
        return {
            type: 'GET',
            url: null,
            data: {},
            contentType: 'application/json',
            dataType: 'json',
            beforeSend: function () {

            }
        };
    };

    /**
     * 公用ajax请求方法
     * @param option
     * @returns {*}
     */
    $.commonAjax = function (option) {
        var urlApi = utils.getLocal('plume_api') && $.parseJSON(utils.getLocal('plume_api')),
            option = $.extend({}, $.defaultAjax, option),
            dataJson = option.data ? option.data : {};

        // option.stringData：针对请求类型不同
        if (option.type.toUpperCase() != "GET") {
            dataJson = JSON.stringify(option.data);
        }

        // 如果有传入urlParams这个对象，我们会将值拼成字符串跟在url后面、如：http://test.api.com/test?test=1&test1=2
        var urlStringArr = [], urlString = '';
        if (option.urlParams) {
            $.jsonValid(option.urlParams) && $.each(option.urlParams, function (name, value) {
                urlStringArr.push(name + '=' + value);
            });
            urlString = urlStringArr.join('&');
        }

        // 如果有传入operationId，我们会将值拼成字符串跟在url后面、如：http://test.api.com/test/operationId
        if (typeof(option.operationId) !== "undefined") {
            option.url = host + urlApi[option.url] + '/' + option.operationId;
        } else {
            option.url = host + urlApi[option.url] + (urlString ? ('?' + urlString) : '');
        }

        return $.ajax({
            type: option.type ? option.type : 'GET',
            url: option.url,
            data: dataJson,
            dataType: 'json',
            traditional: option.traditional,
            contentType: 'application/json',
            success: function (data) {
                $.unloading();
                typeof(option.success) === 'function' && option.success(data);
            },
            error: function (data) {
                $.unloading();
                typeof(option.error) === 'function' && option.error(data);
            },
            beforeSend: function () {
                $.loading();
            }
        }).fail(function (res) {
            $.unloading();
            if (res && res.responseText) {
                var resJson = JSON.parse(res.responseText);
                console.log(resJson);
            }
        });
    };

})(jQuery);

// 公用方法
(function ($) {

    $.session = function () {
        if (typeof(Storage) !== "undefined") {
            return sessionStorage;
        }else {
            alert("您好,您的浏览器不支持HTML5最新特性.请升级浏览器至IE8+或使用Firefox, Opera, Chrome,Safari");
        }
    }();

    $.key = {
        //绑定回车搜索
        keydownEnter: function (ele) {
            $("body").bind('keydown', function () {
                if (event.keyCode == "13") {
                    $(ele).click();
                }
            });
        },
        unkeydownEnter: function (ele) {
            $("body").unbind();
        },
        //只能输入数字
        onlyKeydownNum: function () {
            if (event.shiftKey && (!(event.keyCode == 46) && !(event.keyCode == 8))) {
                event.returnValue = false;
            }
            if (!(event.keyCode == 46) && !(event.keyCode == 8) && !(event.keyCode == 37) && !(event.keyCode == 39) && !(event.keyCode == 16))
                if (!((event.keyCode >= 48 && event.keyCode <= 57) ||
                    (event.keyCode >= 96 && event.keyCode <= 105) || (event.keyCode == 190)))

                    event.returnValue = false;
        },
        // 只能输入数字和点号
        onlyKeydownNumad: function () {
            if (event.shiftKey && (!(event.keyCode == 46) && !(event.keyCode == 8))) {
                event.returnValue = false;
            }
            if (!(event.keyCode == 46) && !(event.keyCode == 8) && !(event.keyCode == 37) && !(event.keyCode == 39) && !(event.keyCode == 16))
                if (!((event.keyCode >= 48 && event.keyCode <= 57) ||
                    (event.keyCode >= 96 && event.keyCode <= 105)))

                    event.returnValue = false;
        }
    };

    $.plumeTime = function () {
        return new Date().getTime();
    };

    $.plumeLog = function (msg) {
        console.log(msg);
    };

    /**
     * checkbox选择
     */
    $.tableCheckBox = function () {
        $(".table-block").find("thead input:checkbox").bind("click", function () {
            var c = $(this).is(':checked');
            $(".table-block").find("tbody input:checkbox").prop("checked", c);
        });
    };

})(jQuery);