$(function () {
    plumeLog("进入loginNew模板自定义js-" + plumeTime());
    $(".login-left-icons .icons-toggle").each(function() {
        var delayTime = $(this).attr("data-delay");
        console.log(delayTime);
        $(this).css({"-webkit-animation-delay": delayTime, "-moz-animation-delay": delayTime, "-o-animation-delay": delayTime, "animation-delay": delayTime});
    });

    $("#logo").bind("click", function() {
        var $this = $(this);
        console.log("start")
        $this.addClass("animate");
        setTimeout(function() {
            $this.removeClass("animate");
            console.log("back")
        }, 2000);
    });
});



