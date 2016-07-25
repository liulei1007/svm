var login_move = {
    testmove: function () {
        $(".testdiv").each(function () {
            var p = login_move.getPram();
            var h = $(this).height();
            var w = $(this).width();
            var t = $(this).position().top;
            var l = $(this).position().left;
            $(this).animate({
                "height": h * p.size,
                "width": w * p.size,
                "left":l+ p.left,
                "top":t+ p.top
            },2000,"linear",function(){
                login_move.testmove();
            })
        });
    },
    random: function (min, max) {
        return parseFloat(Math.random() * (max - min + 1) + min);
    },
    getPram: function () {
        var p = {};
        p.size = parseInt(login_move.random(1,1));
        p.top = parseInt(login_move.random(-20, 20));
        p.left = parseInt(login_move.random(-20, 20));
        return p;
    }
}
$(function () {
    plumeLog("进入login模板自定义js-" + plumeTime());
    $(".login-btn-brand").bind("click", function () {
        sessionStorage.auth = [1, 2, 4, 5, 6, 8];
        window.location.href = "../index";
    });
    $(".login-btn-supplier").bind("click", function () {
        sessionStorage.auth = [3, 4, 5, 7];
        window.location.href = "../index";
    });

    $(".login-head-btn .btn1").bind("click", function () {
        $(".reg-block").fadeOut();
        $(".login-block").fadeIn();
    });
    $(".login-head-btn .btn2").bind("click", function () {
        $(".login-block").fadeOut();
        $(".reg-block").fadeIn();
    });
    $(".fetchpwd").bind("click", function () {
        window.location.href = "../changepwd?fullscreen";
    });
    $("#send").bind("click", function () {

        $(".form-block-msg").hide();
        var tel = $("#tel").val();
        if (isMobile(tel)) {
            loading();
            $.get(plumeApi["sendMsg"] + "/" + tel + "/10002", {}, function (data) {
                unloading();
                if (data.ok) {
                    $(".reg-msg2").text("短信验证码发送成功").fadeIn();
                }
            });
        } else {
            $(".reg-msg1").text("手机号输入错误").fadeIn();
        }
    });

    $(".login-btn").bind("click", function () {
        $(".form-block-msg").hide();
        var logintel = $("#logintel").val();
        var loginpwd = $("#loginpwd").val();
        var pram_str = '{';
        pram_str += '"mobilePhone": "' + logintel + '",';
        pram_str += '"password": "' + loginpwd + '"';
        pram_str += '}';
        if (logintel == "") {
            $(".login-msg1").text("请输入用户名").fadeIn();
            return;
        }
        if (loginpwd == "") {
            $(".login-msg1").text("请输入密码").fadeIn();
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
                    $(".login-msg2").text("登录成功,用户id:" + data.data + "仅验证登录,跳转请使用另外两个测试按钮.").fadeIn();
                    $.cookie('JSESSIONID', data.data, {path: '/', domain: 'hxmklmall.cn'});
 //                   window.location.href = "index";

                } else {
                    $(".login-msg1").text(data.resDescription).fadeIn();
                }
            },
            error:function() {
                unloading();
                $(".login-msg1").text("网路异常").fadeIn();
            }
        });
    });

    $(".reg-btn").bind("click", function () {
        $(".form-block-msg").hide();
        var tel = $("#tel").val();
        var pwd = $("#pwd").val();
        var msgcode = $("#msgcode").val();
        var pram_str = '{';
        pram_str += '"mobilePhone": "' + tel + '",';
        pram_str += '"password": "' + pwd + '",';
        pram_str += '"rePassword": "' + pwd + '",';
        pram_str += '"regVerifycode": "' + msgcode + '"';
        pram_str += '}';
        if (!isMobile(tel)) {
            $(".reg-msg1").text("手机号输入错误").fadeIn();
            return;
        }
        if (pwd == "") {
            $(".reg-msg1").text("请输入密码").fadeIn();
            return;
        }
        if (!pwdCheck(pwd)) {
            $(".reg-msg1").text("密码必须是6-15位数字和字母组合").fadeIn();
            return;
        }
        if (msgcode == "") {
            $(".reg-msg1").text("请输入验证码").fadeIn();
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
                    $(".reg-msg2").text("注册成功").fadeIn();
                    $(".reg-block").fadeOut();
                    $(".login-block").fadeIn();
                } else {
                    $(".reg-msg1").text(data.resDescription).fadeIn();
                }
            }
        });
    });
    function isMobile(n) {
        return /^1\d{10}$/.test(n) && n != 11111111111;
    }
  //  login_move.testmove();

});

//密码验证: 6-15位字符，建议数字和字母组合
function pwdCheck(pwd) {
    return /^[0-9A-Za-z]{6,15}$/.test(pwd);
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
