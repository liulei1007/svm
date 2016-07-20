/**
 --基于jquery框架plume2.0
 --规则性IDE集成开发框架.
 --提供可扩展的基础功能接口,数据单向绑定,前端log日志,全局xhr监控.
 --强制性格式化项目,模板化
 --前端独立分发路由.
 **/
;(function (root, $) {

    $.fn.extend({
        /**
         *
         * @param name  页面名字
         * @param flag  是否路由
         * @param fun   回调函数
         */
        loadData: function (name, fun, flag) {
            var own = this;

            $(own).find("*").off();

            var prams = "",
                config = Plume.setParam,
                configPage = utils.getConfigPage();

            if (name && name.indexOf("?") != -1) {
                prams = name.substring(name.indexOf("?"));
                name = name.substring(0, name.indexOf("?"));
            }

            var page = configPage && configPage[name],
                init = page["init"],
                url = page["pageUrl"],
                cache = (flag.indexOf("cache") != -1),
                resources = $.initOperation[init];

            Plume.resource().loadHtml(url, config, resources, cache);

            if (flag.indexOf("nochangeurl") === -1) {
                try {
                    window.history.pushState({}, '', name + prams);
                } catch (e) {
                    console.log("提示:无法动态改变地址:" + e.message);
                }
            }
            try {
                setTimeout(function () {
                    fun && fun();
                }, 10);
                Plume.setParam.initFun = init;
            } catch (e) {
                console.log("提示:" + e.message);
            }
        },

        /**
         * 绑定属性处理
         * @param $p
         */
        setPageData: function ($p) {
            $(this).find("[data-name]").each(function () {
                $(this).setNodeData("$p", $p, "data-name");
            });
            $(this).find("[data-list]").each(function () {
                var $own = $(this),
                    listTag = $own.attr("data-list"),
                    listData = eval(listTag),
                    temp = $own.find("[list-temp]").prop("outerHTML"),
                    temps = temp.replace("list-temp", "list-node");

                for (var i = 0; i < listData.length; i++) {
                    $(temps).appendTo($own).attr("plumeindex", i);
                    var dataListNode = $own.find("[list-node]:last");
                    $(dataListNode).setNodeData("$n", listData[i], "node-name");
                    $(dataListNode).find("[node-name]").each(function () {
                        $(this).setNodeData("$n", listData[i], "node-name");
                    });
                }
                $own.find("[list-node]").fadeIn();

                return this;
            });
        },

        /**
         * 数据绑定属性赋值
         * @param dataName
         * @param data
         * @param nodeName
         */
        setNodeData: function (dataName, data, nodeName) {
            var fun = "var " + dataName + "=data";
            eval(fun);
            var tags = [],
                $own = $(this),
                nodeValue = $own.attr(nodeName);

            if (!nodeValue) return;

            nodeValue && (tags = nodeValue.split(','));

            var tagsLen = tags.length,
                tagName = $own[0].tagName;

            for (var i = 0; i < tagsLen; i++) {
                var tag = tags[i] || '';

                if (tag.indexOf("attr-") != -1) {
                    $own.attr(tag.substring(5, tag.indexOf(":")), eval(tag.substring(tag.indexOf(":") + 1)));
                    continue;
                }

                switch (tagName) {
                    case 'INPUT':
                        $own.val(eval(tag));
                        break;
                    case 'TEXTAREA':
                        $own.val(eval(tag));
                        break;
                    case 'SELECT':
                        $own.val(eval(tag));
                        break;
                    case 'IMG':
                        $own.attr("src", eval(tag));
                        break;
                    case 'A':
                        tag.indexOf("tel:") == -1 ? $own.attr("href", eval(tag)) :
                            $own.attr("href", "tel:" + eval(tag.substring(4)));
                        break;
                    default :
                        if (tag.indexOf("bg-image:") != -1) {
                            $own.css({"backgroundImage": "url(" + (eval(tag.substring(9)) + ")")});
                        } else if (tag.indexOf("bg-color:") != -1) {
                            $own.css({"backgroundColor": "" + (eval(tag.substring(9)))});
                        } else if (tag.indexOf("html:") != -1) {
                            $own.html(eval(tag));
                        } else {
                            $own.text(eval(tag)).attr("title", eval(tag));
                        }
                        break;
                }
            }

            return this;
        }
    });

    $.extend({
        /**
         * 公用跳转
         * page 跳转页面
         * obj  引入对象
         * fun  回调函数
         * flag 是否路由
         * load 被引入对象
         */
        direct: function (page, obj, fun, flag, load) {

            flag = flag || 'changeurl';

            // 保存obj，保持刷新引入对象
            if (load) {
                Plume.setParam.load != load && utils.setSession('plume_refresh_load' + page, load);
                Plume.setParam.load = load;
            } else {
                var loadCache = utils.getSession('plume_refresh_load' + page);

                loadCache && (Plume.setParam.load = loadCache);
            }
            if (obj) {
                Plume.setParam.container != obj && utils.setSession('plume_refresh_obj' + page, obj);
                Plume.setParam.container = obj;
            } else {
                var objCache = utils.getSession('plume_refresh_obj' + page);

                objCache && (Plume.setParam.container = objCache);
            }

            $(obj).loadData(page, fun, flag);
        }
    });

    // 工具集
    root.utils = {
        // 属性支持情况
        support : {
            pJax : window.history &&
                window.history.pushState &&
                window.history.replaceState &&
                !navigator.userAgent.match(/(iPod|iPhone|iPad|WebApps\/.+CFNetwork)/),
            storage : !!window.localStorage
        },

        // session、local缓存
        getSession: function (key) {
            return sessionStorage.getItem(key);
        },

        setSession: function (key, value) {
            return sessionStorage.setItem(key, value);
        },

        getLocal: function (key) {
            return localStorage.getItem(key);
        },

        setLocal: function (key, value) {
            return localStorage.setItem(key, value);
        },

        useTime: function (time) {
            console.log('时间：' + (new Date().getTime() - time) + 'ms');
        },

        /**
         * json转字符串
         * @param jsonObj
         * @param moreLevel：是否多级
         * @returns {string}
         */
        toJsonString: function (jsonObj, moreLevel) {
            var jsonString = '';

            var forData = function (obj) {
                jsonString += "{";
                for (var item in obj) {
                    if (typeof(obj[item]) == "object") {
                        if (jsonString.lastIndexOf(',') > -1) {
                            jsonString = jsonString.substring(0, jsonString.length - 1) + '},';
                        }
                        jsonString += '"' + item + '":';
                        forData(obj[item]);
                    } else if (typeof(obj[item]) == "string") {
                        jsonString += '"' + item + '":"' + obj[item] + '",';
                    }
                }

                return jsonString;
            };
            var result = forData(jsonObj);

            return moreLevel ? result.substring(0, result.length - 1) + '}}' :
                result.substring(0, result.length - 1) + '}'
        },

        /**
         * 获取页面配置
         * @returns {string}
         */
        getConfigPage: function () {
            var configPage = '';
            try {
                configPage = Plume.configPage || eval("(" + utils.getSession('plume_page') + ")");
            } catch (e) {
                console.log("提示:" + e.message);
            }

            return configPage;
        },

        /**
         * 获取url页面路径
         * @param url
         * @returns {string}
         */
        getPageUrl: function () {
            var url = window.location.href;
            return (url || '').replace(/(.+)[＼＼/]/, "");
        }
    };

    root.Plume = {

        VERSION: '2.0.0',

        // api接口路径
        configApi: '',

        // 页面路径
        configPage: '',

        setParam: {
            'initFun': 'indexInit',
            'load': 'body',
            'container': '.work-space-active',
            'welcome': 'index',
            'configPlume': 'conf/config-plume.xml'
        },

        /**
         * 配置文件加载
         * @returns {plumeUtil}
         */
        config: function (configApi, configPage, initFun) {
            var own = this, xmlApi = '', xmlPage = [],
                config = Plume.setParam.configPlume;

            // 设置同步
            $.ajaxSetup({
                async: false
            });
            // 获取资源配置
            $.get(config, function (data) {
                var $data = $(data);
                xmlApi = $data.find("resources[type='api']") || [];
                xmlPage = $data.find("resources[type='init']") || [];
            });

            // 获取api路径配置
            $.get($(xmlApi[0]).attr('href'), function (data) {
                $(data).find('plume-api').children().each(function () {
                    var tagName = $(this)[0].tagName;

                    configApi[tagName] = $(this).text();
                });
                own.configApi = configApi;
                utils.setSession('plume_api', utils.toJsonString(configApi, false));
                console.log(own.configApi);
            });

            // 获取页面路径配置
            var len = 0, xmlPageLen = xmlPage.length,
                getPageXML = function () {
                    $.get($(xmlPage[len]).attr('href'), function (data) {
                        var temp = {}, $page = $(data);

                        $page.find("index-init") && (initFun = $page.find("index-init").text());

                        $page.find('plume-page page').each(function () {
                            var pageName = $(this).find("page-name").text(),
                                pageUrl = $(this).find("page-url").text(),
                                init = $(this).find("init").text();

                            temp = {};
                            temp["pageName"] = pageName;
                            temp["pageUrl"] = pageUrl;
                            temp["init"] = init;

                            configPage[pageName] = temp;
                        });
                        len++;
                        xmlPageLen > len && getPageXML();
                    });
            };

            getPageXML();

            console.log(configPage);
            own.configPage = configPage;
            utils.setSession('plume_page', utils.toJsonString(configPage, true));

            // 恢复默认设置
            $.ajaxSetup({
                async: true
            });
        },

        /**
         * 页面跳转路由
         */
        route: function () {
            // 内部方法,重写浏览器回退,前进,刷新事件,使用setTimeout为了避免部分浏览器bug,保证兼容
            setTimeout(function () {
                $(window).off().on('popstate', function() {
                    window.location.reload();
                });
            }, 1000);

            return this;
        },

        /**
         * 页面绑定数据属性处理
         * @returns {{setNodeData: setNodeData, setPageData: setPageData}}
         */
        data: function () {

        },

        ajax: function () {
            var time = 0;
            $.ajaxSetup({
                beforeSend: function () {
                    time = new Date().getTime();
                },
                complete: function (data) {
                    time && utils.useTime(time);
                }
            });
        },

        /**
         * html、js、css加载
         * @returns {{loadCss: loadCss, loadJs: loadJs}}
         */
        resource: function () {
            return {

                /**
                 * html加载
                 * @param url
                 * @param config
                 * @param fun
                 * @param cache
                 */
                loadHtml: function (url, config, fun, cache) {
                    var container = Plume.setParam.container;

                    var createHtml = function (fun, data) {
                        try {
                            var html = data.substring(data.indexOf("<body>"), data.indexOf("</body>") + 7);
                            $(container).hide().html("");
                            html && $(container).html(html);
                            $("[list-temp]").hide();
                            $(container).show();
                            fun && fun();
                        } catch (e) {
                            console.log("提示:" + e.message);
                        }
                    };

                    var loadData = function (url, fun) {
                        try {
                            $(container).load(url + ' ' + config.load, function (data) {
                                utils.setSession(url, data);
                                createHtml(fun, data);
                            });
                        } catch (e) {
                            console.log("提示:" + e.message);
                        }
                    };

                    try {
                        if (utils.support.storage && cache) {
                            utils.getSession(url) ?
                                createHtml(fun, utils.getSession(url)) : loadData(url, fun);
                        } else {
                            $(container).load(url + ' ' + config.load, function (data) {
                                createHtml(fun, data);
                            });
                        }
                    } catch (e) {
                        console.log("提示:" + e.message);
                    }
                },

                loadCss: function (path) {
                    try {
                        if (!path || path.length === 0) {
                            throw new Error('argument "path" is required !');
                        }
                        var pathLen = path.length ,
                            head = document.getElementsByTagName('head')[0],
                            link = document.createElement('link');

                        for (var i = 0; i < pathLen; i++) {
                            link.href = path[i];
                            link.rel = 'stylesheet';
                            link.type = 'text/css';
                            head.appendChild(link);
                        }
                    } catch (e) {
                        console.log("加载" + path + "CSS异常");
                    }

                },

                loadJs: function (path) {
                    try {
                        if (!path || path.length === 0) {
                            throw new Error('argument "path" is required !');
                        }
                        var script = '',
                            pathLen = path.length,
                            head = document.getElementsByTagName('head')[0];

                        for (var i = 0; i < pathLen; i++) {
                            script = document.createElement('script');
                            script.src = path[i];
                            script.type = 'text/javascript';
                            head.appendChild(script);
                        }
                    } catch (e) {
                        console.log("加载" + path + "JS异常");
                    }
                }
            };
        },

        init: function () {
            var configApi = this.configApi || utils.getSession('plume_api') || '',
                configPage = this.configPage || utils.getSession('plume_page') || '';

            // 资源配置文件数据加载
            if (!configApi || !configPage) {
                this.config([], [], '');
                $.initOperation[Plume.setParam.initFun]();
            } else {
                var url = utils.getPageUrl(),
                    initFun = Plume.setParam.initFun,
                    pageObj = utils.getConfigPage(),
                    indexPage = Plume.setParam.welcome;

                if (url) {
                    if (utils.getPageUrl() !== indexPage) {
                        window.onload = function () {
                            $.direct(url, '', null, 'nochangeurl');
                        };
                    }
                    initFun = pageObj[indexPage]['init'];
                    $.initOperation[initFun]();
                } else {
                    $.initOperation[initFun]();
                }
            }

            this.route().ajax();
        }
    };

    Plume.init();

})(this, jQuery);