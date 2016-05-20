$(function () {
    plumeLog("进入childIdCreate模板自定义js-" + plumeTime());
    tablecheckbox();
    bindDelFunc();
    var _html = $(".cic-brand")[0].outerHTML;
    $(".cic-btn-add").bind("click", function () {
        $(".form-horizontal").append(_html);
        bindDelFunc();
    });
    function bindDelFunc() {
        $(".cic-btn-del").unbind().bind("click", function () {
            $(this).parent().parent().remove();
        });
    }
    $(".btn-back").bind("click", function () {
        derict(this, "idmanage", "nochangeurl");
    });
    $(".btn-myset").bind("click",function(){
        $(".cic-pop").pop("popAuth",function(){
            $(".pa-cancel").bind("click",function(){
                $(".cic-pop").pophide();
            })
        });
    });

    var modifyAcId = sessionStorage.modifyAcId;
    if (modifyAcId && modifyAcId != '') {

    };

});

function getChildUserData(childId) {
    //获取子账号列表的url
    var apiName = "";

    //获取登录人的用户类型：0：未设定,1:工厂,2:经销商代理商
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
    
    loading();
    $.ajax({
        url: apiName + "?id=" + childId,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
            unloading();
            if(data.ok) {
                
            }
        }
    });
}