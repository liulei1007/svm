var login_move = {
    testmove: function () {
        $(".moveitem").find("img").each(function () {
            var p = login_move.getPram();
            var h = $(this).height();
            var w = $(this).width();
            var t = $(this).position().top;
            var l = $(this).position().left;
            $(this).animate({
                "height": h * p.size,
                "width": w * p.size,
                //"left":l+ p.left,
                //"top":t+ p.top
                "marginLeft": p.left,
                "marginBottom": p.top
            }, 5000, "linear", function () {
                login_move.testmove();
            })
        });
    },
    random: function (min, max) {
        return parseFloat(Math.random() * (max - min + 1) + min);
    },
    getPram: function () {
        var p = {};
        p.size = parseInt(login_move.random(1, 1));
        p.top = parseInt(login_move.random(-100, 100));
        p.left = parseInt(login_move.random(-100, 100));
        p.num1 = parseInt(login_move.random(1, 5));
        p.num2 = parseInt(login_move.random(5, 10));
        return p;
    }
}
function blink(){
    $(".moveitem").each(function(){
        var t=login_move.getPram();
        $(this).delay(t.num1*1000).fadeIn(1500).delay(t.num2*1000).fadeOut(1500,function(){
            blink();
        })
    })
}
$(function () {
    plumeLog("进入loginNew模板自定义js-" + plumeTime());
    //$(".moveitem").fadeIn();
   // login_move.testmove();
    blink();
    $(".icons-logo").bind("click", function () {
        $(this).addClass("icon-rot");
        setTimeout(function () {
            $(".icons-logo").removeClass("icon-rot");
        }, 400)
    });
    $(".moveitem").find("img").bind("mouseenter", function () {
        $(this).addClass("icon-rot1");
    }).bind("mouseleave", function () {
        $(this).removeClass("icon-rot1");
    });
    $(".login-text-block").animate({
        "fontsize":"48px"
    })
});



