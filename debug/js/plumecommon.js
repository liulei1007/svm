//document.domain = "hxmklmall.cn";
console.log("domain:" + document.domain);
//»º´æ½Ó¿Ú
var session = function () {
    return sessionStorage;
}();
var PLUME_PROJECT = "../";

var PLUME_FILE = [
    "/" + PLUME_PROJECT + "/css/bootstrap.min.css",
    "/" + PLUME_PROJECT + "/css/jquery.cxcalendar.css",
    "/" + PLUME_PROJECT + "/css/index.css",
    "/" + PLUME_PROJECT + "/js/jquery.js",
    "/" + PLUME_PROJECT + "/js/jquery.cxcalendar.min.js",
    "/" + PLUME_PROJECT + "/js/jquery.form.js",
    "/" + PLUME_PROJECT + "/js/jquery.cookie.js",
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

