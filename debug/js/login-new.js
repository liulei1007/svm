$(function () {
    var timeOut;
    plumeLog("进入loginNew模板自定义js-" + plumeTime());
    $(".login-left-icons .icons-toggle").each(function() {
        var delayTime = $(this).attr("data-delay");
        console.log(delayTime);
        $(this).css({"-webkit-animation-delay": delayTime, "-moz-animation-delay": delayTime, "-o-animation-delay": delayTime, "animation-delay": delayTime});
    });

    $("#logo").bind("mouseover", function() {
        var $this = $(this);
        if ($this.hasClass("animate")) { return; }
        $this.addClass("animate");
        clearTimeout(timeOut);
        timeOut = setTimeout(function() {
            $this.removeClass("animate");
        }, 2000);
    });
});



