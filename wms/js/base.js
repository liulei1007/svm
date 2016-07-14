/**
 * Created by lenovo on 2016/7/05.
 */
(function ($) {

    var host = '', path = window.location.href;

    if (path.indexOf("longguo.mmall.com") != -1) {
        host = "https://longguo.mmall.com/api/";
    } else if (path.indexOf("longguo.hxmklmall.cn") != -1) {
        host = "http://longguo.hxmklmall.cn/api/";
    } else {
        host = "http://longguo.hxmklmall.cn/api/";
    }

    if (path.indexOf("localhost") != -1) {
        $.ajaxSetup({
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true
        });
    }

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
                typeof(option.success) === 'function' && option.success(data);
            },
            error: function (data) {
                typeof(option.error) === 'function' && option.error(data);
            },
            beforeSend: function () {
            }
        }).fail(function (res) {
            if (res && res.responseText) {
                var resJson = JSON.parse(res.responseText);
                console.log(resJson);
            }
        });
    };
})(jQuery);