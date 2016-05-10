$(function () {
    plumeLog("进入transmit模板自定义js-" + plumeTime());
    var temp = '';
    for (var i = 1; i < 36; i++) {
        temp += '<div class="popcenter load1 load1img' + i + '"><img src="images/loading/' + i + '.png"></div>'
    }
    for (var i = 1; i < 43; i++) {
        temp += '<div class="popcenter load2 load2img' + i + '"><img src="images/loading_2/' + i + '.png"></div>'
    }
    $(document.body).append(temp);
    var path = window.location.href + "";
    var p = path.substring(path.indexOf("?") + 1);
    if (p == 1) {
        showLoad();
    } else if (p == 2) {
        showLoad1();
    } else {
        showLoad2();
    }
})
var a = 1;
var d = true;
function showLoad() {
    $(".load1").hide();
    $(".load1img" + a).show();
    if (d) {
        a++;
    } else {
        a--
    }
    if (a == 35) {
        d = false;
    }
    if (a == 1) {
        d = true;
    }
    setTimeout("showLoad()", 35);
}

function showLoad1() {
    $(".load1").hide();
    $(".load1img" + a).show();
    a++;
    if (a == 35) {
        a = 1;
    }
    setTimeout("showLoad1()", 50);
}
function showLoad2() {
    $(".load2").hide();
    $(".load2img" + a).show();
    a++;
    if (a == 42) {
        a = 1;
    }
    setTimeout("showLoad2()", 80);
}
