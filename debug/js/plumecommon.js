//缓存
var session = function () {
    if (typeof(Storage) !== "undefined") {
        return sessionStorage;
    }else {
        alert("您好,您的浏览器不支持HTML5最新特性.请升级浏览器至IE8+或使用Firefox, Opera, Chrome,Safari");
    }

}();
var PLUME_PROJECT = "../";

var PLUME_FILE = [
    "/" + PLUME_PROJECT + "/css/bootstrap.min.css",
    "/" + PLUME_PROJECT + "/css/jquery.cxcalendar.css",
    "/" + PLUME_PROJECT + "/css/bootstrap-datetimepicker.min.css",
    "/" + PLUME_PROJECT + "/css/index.css",
    // "/" + PLUME_PROJECT + "/css/global.css",
    // "/" + PLUME_PROJECT + "/css/special.css",
    "/" + PLUME_PROJECT + "/js/jquery.js",
    "/" + PLUME_PROJECT + "/js/json2.js",
    "/" + PLUME_PROJECT + "/js/jquery.cxcalendar.min.js",
    "/" + PLUME_PROJECT + "/js/jquery.form.js",
    "/" + PLUME_PROJECT + "/js/jquery.cookie.js",
    "/" + PLUME_PROJECT + "/js/bootstrap-datetimepicker.min.js",
    "/" + PLUME_PROJECT + "/js/bootstrap-datetimepicker.fr.js",
    "/" + PLUME_PROJECT + "/js/plume.js",
    "/" + PLUME_PROJECT + "/js/plumeimplement.js",
    "/" + PLUME_PROJECT + "/js/swiper.min.js",
    "/" + PLUME_PROJECT + "/js/pagination.js"
];

for (var i = 0; i < PLUME_FILE.length; i++) {
    if (PLUME_FILE[i].toLowerCase().indexOf(".js") != -1) {
        document.write("<script src='" + PLUME_FILE[i] + "'><\/script>");
    } else if (PLUME_FILE[i].toLowerCase().indexOf(".css") != -1) {
        document.write("<link rel='stylesheet' type='text/css' href='" + PLUME_FILE[i] + "'>");
    }
}