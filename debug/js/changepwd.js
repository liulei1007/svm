$(function () {
    plumeLog("进入changepwd模板自定义js-" + plumeTime());
    if ((sessionStorage.login_mobilePhone!=undefined)&&sessionStorage.login_mobilePhone!="") {
        $(".mobile").val(sessionStorage.login_mobilePhone.substring(0, 7) + "****").attr("readOnly",true);
    }else{
        $(".mobile").val("").attr("readOnly",false);
    }

    // $("#cpdnext").bind("click", function () {
    //     $(".reg-msg1").hide();
    //     var verifycode = $('.verifycode').val();
    //     if (verifycode == '') {
    //         alert("短信验证码发送成功");
    //         return;
    //     }
    //     // $(".cpdstep1").hide();
    //     // $(".cpdstep2").fadeIn();
    // });
    // 
    // 提交按钮
    $("#cpdsub").bind("click", function () {
        $(".reg-msg2").hide();
        var password = $('.password').val();
        var repassword = $('.repassword').val();
        if (password == '') {
            alert("请输入新密码");
            return;
        }

        if (repassword == '') {
            alert("请输入确认密码");
            return;
        }
        ;

        if (password != repassword) {
            alert("密码不一致");
            return;
        }
        ;

        resetPassword();

        //	$(".cpdstep2").hide();
        //	$(".cpdstep1").fadeIn();
    });

    // 获取验证码按钮
    $("#cpdsendcode").bind("click", function () {
        if (!sendMsgCount) {
            return;
        }
        var mobile = $(".mobile").val();
        $(".reg-msg1").hide();
        if (isMobile(mobile)) {
            loading();
            $.get(plumeApi["sendMsg"] + "/" + mobile + "/10003", {}, function (data) {
                unloading();
                if (data.ok) {
                    alert("短信验证码发送成功");
                    settime(60);
                } else {
                    alert("短信验证码发送异常");
                }
            });
        } else {
            alert("手机号输入错误");
        }
    })
})

function isMobile(n) {
    return /^1\d{10}$/.test(n) && n != 11111111111;
}
var sendMsgCount = true;
function settime(countdown) {
    if (countdown == 0) {
        $(".timeshow").html("获取验证码");
        sendMsgCount = true;
        return;
    } else {
        $(".timeshow").html(countdown + "s后重新发送");
        sendMsgCount = false;
        countdown--;
        setTimeout(function () {
            settime(countdown)
        }, 1000);
    }

}

function resetPassword() {
    var mobile = $(".mobile").val();
    var verifycode = $('.verifycode').val();
    var password = $('.password').val();
    var repassword = $('.repassword').val();

    // $(".reg-msg2").hide();

    loading();
    $.ajax({
        url: plumeApi["resetPassword"],
        type: "POST",
        data: JSON.stringify({
            "mobilePhone": mobile,
            "password": password,
            "rePassword": repassword,
            "verifyCode": verifycode
        }),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            unloading();
            if (data.ok) {
                alert("密码重置成功");
                window.location.href = "login";
            } else {
                alert("密码重置失败，" + data.resDescription);
            }
        },
        error: function (error) {
            console.log(error);
        }
    });

}