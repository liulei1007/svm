var transmit_a = 0;
var transmit_d = true;
var transmit_loop;
$(function () {
    plumeLog("进入transmit模板自定义js-" + plumeTime());
    clearTimeout(transmit_loop)
    transmit_showLoad();
})

function transmit_showLoad() {
    $(".loading").hide();
    $($(".loading")[transmit_a]).show();
    if (transmit_d) {
        transmit_a++;
    } else {
        transmit_a--
    }
    if (transmit_a == 34) {
        transmit_d = false;
    }
    if (transmit_a == 0) {
        transmit_d = true;
    }
    transmit_loop=setTimeout("transmit_showLoad()", 35);
}