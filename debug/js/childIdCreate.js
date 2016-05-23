//是否是添加
var isAdd = 1;
//修改子账号
var modifyAcId = sessionStorage.modifyAcId;

//手机号是否存在
var mobileExist = 1;

//权限
var roleCodes = "";

$(function () {
    plumeLog("进入childIdCreate模板自定义js-" + plumeTime());
    tablecheckbox();

    //取消
    $(".btn-back").bind("click", function () {
        derict(this, "idmanage", "nochangeurl");
    });

    //确认
    $(".btn-next").bind("click", function() {
        if(isAdd == 1)
            subAccAdd();
        else
            subAccModify();
    });

    //权限设置
    $(".btn-myset").bind("click",function(){
        $('.pop').loadTemp("popAuth", "nochangeurl", function () {
        // $(".cic-pop").pop("popAuth",function(){
            rolesShow();

            if(isAdd == 0)
                getAccRole(modifyAcId);
            
            //权限配置弹出框 -- 取消
            $(".pa-cancel").bind("click",function(){
                $(".pop").pophide();
                // $(".cic-pop").pophide();
            });
            //权限配置弹出框 -- 确认
            $(".btn-success").bind("click", function() {
                roleCodes = "";
                $("input[name='rolebox']:checked").each(function(){
                    roleCodes = roleCodes.concat($(this).val()).concat(",");
                });
                $(".pop").pophide();

                // $(".cic-pop").pophide();
            });
        });
    });

    //手机号码check-------------------------------------------
    //失去焦点
    $("#tel").blur(function() {
        var tel = $("#tel").val();
        if(paramCheck(tel, null, null)) {
            checkMobileExist(tel);
        }
    });

    //获取焦点
    $("#tel").focus(function() {
        $("#tel-alert").hide();
    });
    //手机号码check-------------------------------------------

    //密码check-----------------------------------------------
    //失去焦点
    $("#pwd").blur(function() {
        var pwd = $(this).val();
        paramCheck(null, pwd, null);
    });

    //获取焦点
    $("#pwd").focus(function() {
        $("#pwd-alert").hide();
    });

    //失去焦点
    $("#repwd").blur(function() {
        var repwd = $(this).val();
        var pwd = $("#pwd").val();
        paramCheck(null, pwd, repwd);
    });

    //获取焦点
    $("#repwd").focus(function() {
        $("#repwd-alert").hide();
    });
    //密码check-----------------------------------------------
    
    //把session中的修改子账号id删除
    sessionStorage.removeItem("modifyAcId");

    if (modifyAcId && modifyAcId != '') {
        isAdd = 0;      //修改时
        $(".title-block").html("修改子账号");
    } else {
        modifyAcId = sessionStorage.login_id;   //添加
    }

    subAccUpView(modifyAcId);
});

//获取此账号已经有的配置权限
function getAccRole(accountId) {
    $.ajax({
        url: plumeApi["listUserRole"] + "?id="+accountId,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
            if (data.ok) {
                var roles = JSON.stringify(data.data);
                console.log("roles = " + roles);

                if(roles.indexOf("digital_dealer_emp") > -1) {
                    $(".digagentbox [type='checkbox']").attr("checked", "checked");
                } 

                if(roles.indexOf("digital_manu_emp") > -1) {
                    $(".digmanubox [type='checkbox']").attr("checked", "checked");
                }          
            } else {
                popTips("获取配置权限失败","warning");
                // alert("获取配置权限失败:"+data.resDescription);
            }
        }
    })
}

//判断权限哪些显示
function rolesShow() {
    console.log("userType="+sessionStorage.login_userType);
    //经销商权限 
    if(sessionStorage.login_userType == 2) {                  
        $(".digagentbox").fadeIn();
     //工厂权限    
    } else if(sessionStorage.login_userType == 1) {
        $(".digmanubox").fadeIn();     
    } 
}

//子账号修改渲染。 如果是修改，把元素赋值；如果
function subAccUpView(accountId) {
    var apiName = "";
    //判断是哪种角色
    var userType = sessionStorage.login_userType;
    if(userType == null || userType == 0) {
        return;
    } else if(userType == 1) {
        apiName = plumeApi["getManuSubUserUpView"];
    } else if (userType == 2) {
        apiName = plumeApi["getAgentsSubUserUpView"];
    } else {
        return;
    }

    $.ajax({
        url: apiName + "?id="+accountId,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
            if (data.ok) {
                console.log("subAccUpView accountId="+accountId);
                console.log("subAccUpView data="+JSON.stringify(data.data));

                var mobilePhone = data.data.mobilePhone;
                var remark = data.data.remark;

                //编辑状态时，手机号、密码不能修改。
                if(isAdd == 0) {
                    $("#tel").val(mobilePhone);
                    $("#remark").val(remark);

                    $("#tel").attr("disabled","disabled");
                    $("#pwd").attr("disabled","disabled");
                    $("#repwd").attr("disabled","disabled");
                }

                //供销商
                if(sessionStorage.login_userType == 2) {
                    var shopId = data.data.shopId == null? -1: data.data.shopId;
                    var shoplist = data.data.shoplist;

                    if(shoplist && shoplist.length > 0) {
                        var shopHtml = '';
                        // var shopHtml = '<option value="">请选择店铺...</option>';
                        for(var i=0; i<shoplist.length; i++) {
                            if(shopId == shoplist[i].id) {
                                shopHtml += "<option value='"+shoplist[i].id+"' selected='selected' >"+shoplist[i].boothCode +"</option>";
                            } else {
                                shopHtml += "<option value='"+shoplist[i].id+"'>"+shoplist[i].boothCode +"</option>";
                            }
                        }

                        $("#agentShop").html(shopHtml);
                        $(".shops").fadeIn();
                    }

                //工厂
                } else if(sessionStorage.login_userType == 1) {                    
                    //已关联品牌
                    var relationbrandstr = ":";
                    var relationbrandList = data.data.relationbrandList;
                    if(relationbrandList && relationbrandList.length > 0) {
                        for(var i=0; i<relationbrandList.length; i++) {
                            relationbrandstr = relationbrandstr.concat(relationbrandList[i]).concat(":");
                        }
                    }

                    //未关联品牌
                    var brandList = data.data.brandList;
                    if(brandList && brandList.length > 0) {
                        var brandHtml = "";
                        for(var i=0; i<brandList.length; i++) {
                            brandHtml += "<label class='checkbox-inline'>";
                            brandHtml += "<input type='checkbox' name='brands'  value='"+brandList[i].id+"'";
                            if(relationbrandstr.indexOf(":"+brandList[i].id+":") > -1) {
                                brandHtml += " checked='checked'";
                            } 
                            brandHtml += " />";
                            brandHtml += brandList[i].brandName;
                            brandHtml += '</label>';
                        }
                        $(".manuBrand").html(brandHtml);
                        $(".brands").fadeIn();
                    }
                }

            }
            else {
                popTips("添加失败","warning");
                // alert("添加失败:"+data.resDescription);
            }
        }
    });
}

//子账号编辑
function subAccModify() {
    var remark = $("#remark").val();
    var flag_brand = false;

    //工厂
    var brandIds = "";
    $("input[name='brands']:checked").each(function(){
        flag_brand = true;
        brandIds = brandIds.concat($(this).val()).concat(",");
    });

    //供销商
    var shopId = $("#agentShop").val();

    //参数字符串
    var paramData = "";

    //获取登录人的用户类型：0：未设定,1:工厂,2:经销商代理商
    var apiName = "";
    var userType = sessionStorage.login_userType;
    if(userType == null || userType == 0) {
        return;
    } else if(userType == 1) {
        if (!flag_brand) {
            $('.pop').loadTemp("popTips", "nochangeurl", function () {
                    $(".pop").find(".popup-title").html('提交失败');
                    $(".pop").find(".popup-icon").html('<i class="warning"></i>');
                    $(".pop").find(".popup-info").html("请至少选择一个关联品牌！");
                });
            return;
        }
        apiName = plumeApi["editManuSubUserInfo"];

        paramData = JSON.stringify(
            {
                "id": modifyAcId,
                "remark": remark,
                "brandIds": brandIds,
                "roleCodes": roleCodes
            }
        );
    } else if (userType == 2) {
        apiName = plumeApi["editAgentsSubUserInfo"];
        paramData = JSON.stringify(
            {
                "id": modifyAcId,
                "remark": remark,
                "shopId": shopId,
                "roleCodes": roleCodes
            }
        );
    } else {
        return;
    }

    console.log("subAccModify paramData="+paramData);

    //修改请求
    loading();
    $.ajax({
        url: apiName,
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        data: paramData,
        success: function (data) {
            unloading();
            if (data.ok) {
                popTips("修改成功","success");
                // alert("修改成功");
                derict(this, "idmanage", "nochangeurl");
            } else {
                popTips("修改失败","warning");
                // alert("修改失败:"+data.resDescription);
            }
        }
    })



}

//子账号添加
function subAccAdd() {
    var tel = $("#tel").val();
    var pwd = $("#pwd").val();
    var repwd = $("#repwd").val();

    var flag_brand = false;

    if(!paramCheck(tel, pwd, repwd))
        return;
    if(mobileExist != 0)
        return;

    var remark = $("#remark").val();

    //工厂
    var brandIds = "";
     $("input[name='brands']:checked").each(function(){
        flag_brand = true;
        brandIds = brandIds.concat($(this).val()).concat(",");
    });

    //供销商
    var shopId = $("#agentShop").val();

    //参数字符串
    var paramData = "";

    //获取登录人的用户类型：0：未设定,1:工厂,2:经销商代理商
    var apiName = "";
    var userType = sessionStorage.login_userType;
    if(userType == null || userType == 0) {
        return;
    } else if(userType == 1) {
        if (!flag_brand) {
            $('.pop').loadTemp("popTips", "nochangeurl", function () {
                    $(".pop").find(".popup-title").html('提交失败');
                    $(".pop").find(".popup-icon").html('<i class="warning"></i>');
                    $(".pop").find(".popup-info").html("请至少选择一个关联品牌！");
                });
            return;
        }
        apiName = plumeApi["addManuSubUserInfo"];

        paramData = JSON.stringify(
            {
                "mobilePhone": tel,
                "password": pwd,
                "rePassword": repwd,
                "remark": remark,
                "brandIds": brandIds,
                "roleCodes": roleCodes
            }
        );
    } else if (userType == 2) {
        apiName = plumeApi["addAgentsSubUserInfo"];

        paramData = JSON.stringify(
            {
                "mobilePhone": tel,
                "password": pwd,
                "rePassword": repwd,
                "remark": remark,
                "shopId": shopId,
                "roleCodes": roleCodes
            }
        );
    } else {
        return;
    }

    console.log("subAccAdd paramData="+paramData);

    //添加请求
    loading();
    $.ajax({
        url: apiName,
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        data: paramData,
        success: function (data) {
            unloading();
            if (data.ok) {
                popTips("添加成功","success");
                // alert("添加成功");
                derict(this, "idmanage", "nochangeurl");
            } else {
                popTips("修改失败","warning");
                // alert("添加失败:"+data.resDescription);
            }
        }
    });

}

//参数check
function paramCheck(tel, pwd, repwd) {
    if(tel != null && tel == '') {
        $("#tel-alert").text("手机号不能为空").fadeIn();
        return false;
    } else if(tel != null && !isMobile(tel)) {
        $("#tel-alert").text("手机格式不正确").fadeIn();
        return false;
    } else if(pwd != null && pwd == '') {
        $("#pwd-alert").text("密码不能为空").fadeIn();
        return false;
    } else if(pwd != null && !pwdCheck(pwd)) {
        $("#pwd-alert").text("密码必须是6-15位数字或字母组合").fadeIn();
        return false;
    } else if(repwd != null && repwd == '') {
        $("#repwd-alert").text("确认密码不能为空").fadeIn();
        return false;
    } else if(repwd != null && !pwdCheck(repwd)) {
        $("#repwd-alert").text("确认密码必须是6-15位数字或字母组合").fadeIn();
        return false;
    } else if (repwd != null && pwd != null && repwd != pwd) {
        $("#repwd-alert").text("确认密码和密码不一致").fadeIn();
        return false;
    }

    return true;
}


//判断手机号是否已存在
function checkMobileExist(mobile){
    $.ajax({
        type: "get",
        url: plumeApi["getUserInfoByMobile"] + mobile,
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
            if (!data.ok && data.data == null) {
                $("#tel-alert").text("手机号是否存在检查异常").fadeIn();
                mobileExist = 1;
            } else if(!data.ok && data.data > 0) {
                $("#tel-alert").text("手机号已存在").fadeIn();
                mobileExist = 1;
            } else if(data.ok) {
                mobileExist = 0;
            } else {
                $("#tel-alert").text("手机检查接口返回值不能识别").fadeIn();
                mobileExist = 1;
            }
        }
    });
}

//密码验证: 6-15位字符，建议数字和字母组合
function pwdCheck(pwd) {
    return /^[0-9A-Za-z]{6,15}$/.test(pwd);
}

//手机号验证
function isMobile(n) {
    return /^1\d{10}$/.test(n) && n != 11111111111;
}