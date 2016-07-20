/**
 * Created by lenovo on 2016/6/21.
 */
(function ($) {

    /**
     * 获取url页面路径
     * @param url
     * @returns {string}
     */
    var getPageUrl = function () {
        var url = window.location.href;
        return (url || '').replace(/(.+)[＼＼/]/, "");
    };

    /**
     * 删除list查询数据
     */
    $.clearSearchData = function () {
        var key = 'page_search' + getPageUrl();

        session.removeItem(key);
    };

    /**
     * 保存查询条件
     * @param data
     */
    $.setSearchData = function (data) {
        var key = 'page_search' + getPageUrl();

        session.setItem(key, JSON.stringify(data));
    };

    /**
     * 获取list查询条件
     * @returns {*}
     */
    $.getSearchData = function () {
        var key = 'page_search' + getPageUrl();

        return session.getItem(key);
    };

    /**
     * list默认查询条件
     */
    var userSearchData = function () {
        var data = $.getSearchData(),
            dataJson = data ? JSON.parse(data) : {};

        Object.prototype.toString.call(dataJson) === "[object String]" && (dataJson = JSON.parse(dataJson));

        $.each(dataJson, function (key, value) {
            $('#' + key).val(value);
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
     * 列表数据为空处理
     */
    $.emptyData = function () {

        $('.pagination').parent().hide();
        $('.infoNum').parent('div').hide();

        $("div.table-block .nodatanotice").remove();
        $(".table-block").append("<div class='nodatanotice' style='width:100%;text-align:Center;height:120px;line-height:120px'>未查询到数据!</div>");
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
        var option = $.extend({}, $.defaultAjax, option),
            dataJson = option.data ? option.data : {};

        // option.stringData：针对请求类型不同
        if (option.type.toUpperCase() != "GET") {
            dataJson = JSON.stringify(option.data);
            if (option.list) {
                var searchData = $.getSearchData();

                if (searchData) {
                    dataJson = searchData;
                    userSearchData();
                }
            }
        } else if (option.list) {
            var searchData = $.getSearchData();

            if (searchData) {
                option.urlParams = JSON.parse(searchData);
                userSearchData();
            }
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
            option.url = plumeApi[option.url] + '/' + option.operationId;
        } else {
            option.url = plumeApi[option.url] + (urlString ? ('?' + urlString) : '');
        }

        return $.ajax({
            type: option.type ? option.type : 'GET',
            url: option.url,
            data: dataJson,
            dataType: 'json',
            traditional: option.traditional,
            contentType: 'application/json',
            success: function (data) {
                unloading();

                if (option.list) {
                    var $infoNum = $('.infoNum');
                    $(".nodatanotice").remove();
                    data.data && data.data.length !== 0 ? (
                        $infoNum.text(data.countRecord),
                            $infoNum.parent('div').show()
                    ) : $.emptyData();
                }
                typeof(option.success) === 'function' && option.success(data);
                $('.pagination').parent().fadeIn();
            },
            error: function (data) {
                unloading();
                $.emptyData();
                typeof(option.error) === 'function' && option.error(data);
            },
            beforeSend: function () {
                try{PlumeAjaxTimes=plumeTime();}catch(e){};
                loading();
                typeof(option.beforeSend) == "function" && option.beforeSend();
            }
        }).fail(function (res) {
            unloading();
            if (res && res.responseText) {
                var resJson = JSON.parse(res.responseText);
                console.log(resJson);
            }
        });
    };
})(jQuery);