$(function () {
    $.ajax({
        type: "post",
        url: plumeApi["logout"],
        contentType: "application/json",
        dataType: "json",
        async: false,
        success: function (data) {
            if (data.ok) {
                sessionStorage.login_mobilePhone="";
            }
        }
    });
    var timeOut;
    $(".swiper-slide").show();
    var swiper = new Swiper('.swiper-container', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        simulateTouch: false,
        lazyLoading: true,
        lazyLoadingOnTransitionStart: true,
        autoplay: 5000,
        loop: true
    });

    $(".login-left-icons .icons-toggle").each(function () {
        var delayTime = $(this).attr("data-delay");
        $(this).css({
            "-webkit-animation-delay": delayTime,
            "-moz-animation-delay": delayTime,
            "-o-animation-delay": delayTime,
            "animation-delay": delayTime
        });
    });

    $("#logo").bind("mouseover", function () {
        var $this = $(this);
        if ($this.hasClass("animate")) {
            return;
        }
        $this.addClass("animate");
        clearTimeout(timeOut);
        timeOut = setTimeout(function () {
            $this.removeClass("animate");
        }, 2000);
    });

    // 点击“立即注册”
    $("#registerNow").bind("click", function () {
        $(".login-form").slideUp();
        $(".register-form").slideDown();
    });

    // 点击“登录”
    $("#loginNow").bind("click", function () {
        $(".register-form").slideUp();
        $(".login-form").slideDown();
    });

    // 关闭提示框
    $(".alert-dismissible .close").bind("click", function () {
        $(this).parents(".alert").hide();
    })

    $(".fetchpwd").bind("click", function () {
        window.location.href = "../changepwd?fullscreen";
    });

    // $(".btn-register").bind("click", function () {
    //     // window.location.href = "";
    //     alert("程序猿加班更新中......");
    // });

    //登录按钮
    $(".login-form .btn-login").bind("click", function () {
        // $(".alert-dismissible .login-alert").hide();

        var logintel = $("#logintel").val().trim();
        var loginpwd = $("#loginpwd").val();
        var pram_str = '{';
        pram_str += '"mobilePhone": "' + logintel + '",';
        pram_str += '"password": "' + loginpwd + '"';
        pram_str += '}';
        if (logintel == "") {
            $("#login-errormsg").text("请输入手机号码");
            $(".login-form .login-alert").show();
            return;
        }
        if (!isMobile(logintel)) {
            $("#login-errormsg").text("手机格式不正确");
            $(".login-form .login-alert").fadeIn();
            return;
        }
        if (loginpwd == "") {
            $("#login-errormsg").text("请输入密码");
            $(".login-form .login-alert").fadeIn();
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
//                    alert("登录成功");
                    $(".login-form .login-alert").hide();
                    //$.cookie('JSESSIONID', data.data, {path: '/', domain: 'hxmklmall.cn'});
                    window.location.href = "index";

                } else {
                    $("#login-errormsg").text("登录失败:" + data.resDescription);
                    $(".login-form .login-alert").fadeIn();
                }
            }
        });
    });

    //注册
    $(".register-form .btn-register").bind("click", function () {
        $(".register-form .login-alert").hide();
        var tel = $("#tel").val();
        var pwd = $("#pwd").val();
        var verifycode = $("#verifycode").val();
        var pram_str = '{';
        pram_str += '"mobilePhone": "' + tel + '",';
        pram_str += '"password": "' + pwd + '",';
        pram_str += '"rePassword": "' + pwd + '",';
        pram_str += '"regVerifycode": "' + verifycode + '"';
        pram_str += '}';
        if (!isMobile(tel)) {
            $("#reg-errormsg").text("手机号输入错误");
            $(".register-form .login-alert").fadeIn();
            return;
        }
        if (pwd == "") {
            $("#reg-errormsg").text("请输入密码");
            $(".register-form .login-alert").fadeIn();
            return;
        }
        if (!pwdCheck(pwd)) {
            $("#reg-errormsg").text("密码必须是6-15位数字或字母组合");
            $(".register-form .login-alert").fadeIn();

            return;
        }
        if (verifycode == "") {
            $("#reg-errormsg").text("请输入验证码");
            $(".register-form .login-alert").fadeIn();
            return;
        }
        loading();
        $.ajax({
            type: "POST",
            url: plumeApi["registerUserInfo"],
            data: pram_str,
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                unloading();
                if (data.ok) {
                    window.location.href="index";
                } else {
                    $("#reg-errormsg").text("注册失败:" + data.resDescription);
                    $(".register-form .login-alert").fadeIn();
                }
            }
        });
    });

    //发送验证码

    $(".btn-getCode").bind("click", function () {
        if ($(this).attr("status") == 0) {
            return;
        }
        var tel = $("#tel").val();
        if (isMobile(tel)) {
            loading();
            send_code=60;
            send_code_time();
            $.get(plumeApi["sendMsg"] + "/" + tel + "/10002", {}, function (data) {
                unloading();
                if (data.ok) {
                    plumeLog("短信验证码发送成功");
                }
            });
        } else {
            $("#reg-errormsg").text("手机号输入错误");
            $(".register-form .login-alert").fadeIn();
        }
    });


});

//密码验证: 6-15位字符，建议数字和字母组合
function pwdCheck(pwd) {
    return /^[0-9A-Za-z]{6,15}$/.test(pwd);
}

//手机号验证
function isMobile(n) {
    return /^1\d{10}$/.test(n) && n != 11111111111;
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
var send_code = 60;
var login_send_time;
function send_code_time() {
    send_code--;
    if (send_code < 1) {
        $(".btn-getCode").text("获取验证码").attr("status", "1");
    } else {
        $(".btn-getCode").text("获取验证码" + "(" + send_code + ")").attr("status", "0");
        login_send_time=setTimeout("send_code_time()", 1000);
    }
}
