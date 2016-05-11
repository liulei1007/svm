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
            $.get(plumeApi["sendMsg"] + "/" + tel + "/10003", {}, function (data) {
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
        pram_str += '"mobilePhone": "",';
        pram_str += '"password": ""';
        pram_str += '}';
        if (logintel == "") {
            $(".login-msg1").text("请输入用户名").fadeIn();
            return;
        }
        if (loginpwd == "") {
            $(".login-msg1").text("请输入密码").fadeIn();
            return;
        }
        $.ajax({
            type: "POST",
            url: plumeApi["login"],
            data: pram_str,
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                if (data.ok) {
                    $(".login-msg2").text("登录成功,用户id:"+data.data+"仅验证登录,跳转请使用另外两个测试按钮.").fadeIn();
                } else {
                    $(".login-msg1").text(data.resDescription).fadeIn();
                }
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
        if (msgcode == "") {
            $(".reg-msg1").text("请输入验证码").fadeIn();
            return;
        }
        $.ajax({
            type: "POST",
            url: plumeApi["registerUserInfo"],
            data: pram_str,
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                if (data.ok) {
                    $(".reg-msg2").text("注册成功").fadeIn();
                } else {
                    $(".reg-msg1").text(data.resDescription).fadeIn();
                }
            }
        });
    });
    function isMobile(n) {
        return /^1\d{10}$/.test(n) && n != 11111111111;
    }
});
