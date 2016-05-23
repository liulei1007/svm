$(function () {
    plumeLog("进入secondreg模板自定义js-" + plumeTime());
    var t1 = "";
    var t2 = "";
    $(".sd-next").bind("click", function () {
        $(".reg-msg-block").hide();
        $(".sd-choose-step1").fadeIn();
    });
    $(".sd-btn-back0").bind("click", function () {
        $(".sd-choose-step1").hide();
        $(".reg-msg-block").fadeIn();
    });
    $(".sd-btn-back1").bind("click", function () {
        $(".sd-choose-step2").hide();
        $(".sd-choose-step1").fadeIn();
    });
    $(".sd-btn-radius").bind("mouseenter", function () {
        $(this).find(".div2").show();
    }).bind("mouseleave", function () {
        $(this).find(".div2").hide();
    });
    $(".sd-step1-btn2").bind("click", function () {
        window.location.href = "agencyCreate?fullscreen";
    });
    $(".sd-step1-btn1").bind("click", function () {
        window.location.href = "factoryCreate?fullscreen";
    });

})