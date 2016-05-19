$(function() {
    var timeOut;
    $(".swiper-slide").show();

    var swiper = new Swiper('.swiper-container', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        autoplay : 5000,
        loop: true
    });

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

    $(".fetchpwd").bind("click", function () {
        window.location.href = "../changepwd?fullscreen";
    });

    $(".btn-register").bind("click", function () {
//        window.location.href = "";
        alert("程序猿加班更新中......");
    });


    $(".btn-login").bind("click", function () {
        $(".form-block-msg").hide();
        var logintel = $("#logintel").val();
        var loginpwd = $("#loginpwd").val();
        var pram_str = '{';
        pram_str += '"mobilePhone": "' + logintel + '",';
        pram_str += '"password": "' + loginpwd + '"';
        pram_str += '}';
        if (logintel == "") {
            alert("请输入手机号码");
//          $(".login-msg1").text("请输入手机号码").fadeIn();
            return;
        }
        if(!isMobile(logintel)) {
            alert("手机格式不正确");
//            $(".login-msg1").text("手机格式不正确").fadeIn();
            return;
        }
        if (loginpwd == "") {
            alert("请输入密码");
//            $(".login-msg1").text("请输入密码").fadeIn();
            return;
        }
        loading();
        $.ajax({
            type: "POST",
            url: plumeApi["login"],
            data: pram_str,
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                unloading();
                if (data.ok) {
                    alert("登录成功");
//                    $(".login-msg2").text("登录成功,用户id:" + data.data + "仅验证登录,跳转请使用另外两个测试按钮.").fadeIn();
//                  window.location.href = "index";
                    //登录成功之后获取登录用户信息，放入sessionStorge中
                    getLoginInfoToSession();

                } else {
                    alert("登录失败:"+data.resDescription);
//                    $(".login-msg1").text(data.resDescription).fadeIn();
                }
            }
        });
    });
});

function isMobile(n) {
    return /^1\d{10}$/.test(n) && n != 11111111111;
}

//获取当前登录用户信息，同时放入sessionStorage中
function getLoginInfoToSession(){
    loading();
    $.ajax({
        type: "get",
        url: plumeApi["getLoginUser"],
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
            unloading();
            if (data.ok) {  
                //待确认，不知道这种方式是否可以
                sessionStorage.login_mobilePhone = data.data.mobilePhone;
                sessionStorage.login_userType=data.data.userType;
                sessionStorage.login_id=data.data.id;
                sessionStorage.login_openId=data.data.openId;
                sessionStorage.login_parentId=data.data.parentId
                sessionStorage.login_agentsBusinessId=data.data.agentsBusinessId
                sessionStorage.login_manuId=data.data.manuId
                //
                window.location.href = "index";
            } else {
                alert("获取登录信息失败:"+data.resDescription);
//                $(".login-msg1").text(data.resDescription).fadeIn();
            }
        }
    });
}

//loading
var transmit_a = 0;
var transmit_d = true;
var transmit_loop;
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
    transmit_loop = setTimeout("transmit_showLoad()", 35);
}

function loading() {
    if (!($(".lockbg").length > 0)) {
        $(document.body).append("<div class='lockbg'></div>");
        $(".lockbg").show();
    }

    if (!($(".loading").length > 0)) {
        var temp = '';
        for (var i = 1; i < 36; i++) {
            temp += '<div class="popcenter loading"><img src="images/loading/' + i + '.png"></div>';
        }
        $(document.body).append(temp);
        clearTimeout(transmit_loop)
        transmit_showLoad();
    }
}
function unloading() {
    $(".lockbg").remove();
    $(".loading").remove();
}