/**
 * Created by bus.zhang on 2016/7/4.
 */
(function () {
    // 配置公用js、css加载
    var page = {

        PAGE_HREF: '/../wms',

        ROOT_HREF: window.document.location.href,

        getProject: function () {
            return this.ROOT_HREF.substring(0, this.ROOT_HREF.lastIndexOf('/') - 1);
        },

        createCss: function (config) {
            var project = this.getProject(),
                configLen = config.length;
            for (var i = 0; i < configLen; i++) {
                document.write("<link rel='stylesheet' type='text/css' href='" + this.PAGE_HREF + config[i] + "'>");
            }
        },

        createJs: function (config) {
            var project = this.getProject(),
                configLen = config.length;
            for (var i = 0; i < configLen; i++) {
                document.write("<script src='" + this.PAGE_HREF + config[i] + "'><\/script>");
            }
        },

        commonCss: function () {
            var commonCssConfig = [
                '/css/bootstrap.min.css',
                '/css/swiper.min.css',
                '/css/index.css'
            ];
            this.createCss(commonCssConfig);

            return this;
        },

        commonJs: function () {
            var commonJsConfig = [
                '/lib/jquery.js',
                '/lib/plume-config.js',
                '/lib/plume2.0.js',
                '/lib/jquery.cxcalendar.min.js',
                '/js/json2.js',
                '/js/base.js'
            ];
            this.createJs(commonJsConfig);

            return this;
        },

        init: function () {
            this.commonCss().commonJs();
        }
    };


    page.init();
})();