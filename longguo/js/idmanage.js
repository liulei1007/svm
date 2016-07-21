$(function(){
    var nowRole = "";
	plumeLog("进入idmanage模板自定义js-"+plumeTime());
	tablecheckbox();
    // sessionStorage.removeItem("modifyAcId");

    //添加
	$(".im-btn-add").bind("click",function(){
        sessionStorage.removeItem("modifyAcId");
		derict(this, "childIdCreate", "nochangeurl");
	});

	//搜索
	$(".im-btn-sm").bind("click",function(){
        data.mobilePhone = $("#mobilePhone").val();

        $.setSearchData(data);
		listSubUserDate();
	});

	//权限配置
	$('.table-block').on('click','.btn-acset',function() {
        var removeList = $(this).parents('tr');
        var managid = removeList.attr("managid");

        $('.pop').loadTemp("popAuth", "nochangeurl", function() {
        // $(".cic-pop").pop("popAuth",function(){
            getAccRole(managid);
            // 工厂角色
            

            // rolesShow();
            

            $(".pa-cancel").bind("click",function(){
                $(".pop").pophide();
                // $(".cic-pop").pophide();
            });

            //权限配置弹出框 -- 确认
            $(".btn-success").bind("click", function() {
                editUserRoles(managid);
            });

        });
    });

	//编辑
	$('.table-block').on('click','.btn-compile',function() {
		var removeList = $(this).parents('tr');
    	var managid = removeList.attr("managid");
		sessionStorage.modifyAcId=managid;
        derict(this, "childIdCreate", "nochangeurl");
    });

	//删除
    $('.table-block').on('click','.btn-delect',function() {
        
        var removeList = $(this).parents('tr');
    	var managid = removeList.attr("managid");
    	delSubUserData(managid);

    });

    //初始化数据
	listSubUserDate();

});

//更新用户权限
function editUserRoles(managid) {
    var roleCodes = "";
    $("input[name='rolebox']:checked").each(function(){
        roleCodes = roleCodes.concat($(this).val()).concat(",");
    });

    console.log("editUserRoles managid="+managid+";roleCodes="+roleCodes);

    loading();
    $.ajax({
        url: plumeApi["editUserRoles"]+"?id="+managid+"&roleCodes="+roleCodes,
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
            unloading();
            if(data.ok) {
                showPopTips("配置成功", "success", "权限调整成功");
            } else {
                showPopTips("配置失败", "danger", data.resDescription);
            }
        }
    });



}

var data = {
    "mobilePhone": '',
    "page": 1,
    "perPage": 10
};

//查询子账号分页信息 page：第几页；perPage：每页多少条记录
function listSubUserDate() {
	//获取子账号列表的url
	var apiName = "";

	//获取登录人的用户类型：0：未设定,1:工厂,2:经销商代理商
	var userType = sessionStorage.login_userType;
	if(userType == null || userType == 0) {
		return;
	} else if(userType == 1) {
		apiName = "listManuSubUserInfo";
	} else if (userType == 2) {
		apiName = "listSubUserInfo";
	} else {
		return;
	}

	$.commonAjax({
        url: apiName,
        type: "GET",
        urlParams: data,
        list: true,
        success: function (data) {
            $("[list-node]").remove();
            if(data.ok) {
                $(".table-block").setPageData(data);
                $('.createDate').each(function () {
                	// if($(this).html() != '')

                 //    	$(this).html(getLocalTime($(this).html()));
                });
            }
        }
    });
}

//时间戳转日期
function getLocalTime(nS) {
    return new Date(parseInt(nS) * 1000).toLocaleString().substr(0, 10)
}

//删除子账号
function delSubUserData(managid) {
    $('.pop').loadTemp("popConfirm", "nochangeurl", function () {
        // 改变弹出框中文字和图标显示
        $(".pop").find(".popup-title").html("确认删除？");
        $(".pop").find(".popup-icon").html('<i class="warning"></i>');
        $(".pop").find(".popup-info").html("是否确认删除记录？");
        $(".pop").find(".btn-sure").addClass("btn-danger").removeClass("btn-success");
        // 绑定按钮事件
        $('.pop').on('click', '.btn-sure', function () {
            loading();
            $.ajax({
                url:plumeApi["delSubUserInfo"]+"?id="+managid,
                type: "POST",
                contentType: "application/json;charset=UTF-8",
                success: function (data) {
                    if(data.ok){
                        unloading();
                        showPopTips("删除成功","success", "子账号删除成功");
                        listSubUserDate();
                    }else{
                        unloading();
                        showPopTips("删除失败", "danger", data.resDescription);
                        listSubUserDate();
                }
            }
            });
            $('.pop').hide();
            $('.pop').off('click', '.btn-sure');
            $('.pop').off('click', '.btn-cancel');
        });
        $('.pop').on('click', '.btn-cancel', function () {
            $('.pop').hide();
            $('.pop').off('click', '.btn-sure');
            $('.pop').off('click', '.btn-cancel');
        });
    });
}

//获取此账号已经有的配置权限
function getAccRole(accountId) {
    $.ajax({
        url: plumeApi["listUserRole"] + "?id="+accountId,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
        	unloading();
        	if (data.ok) {
        		var nowRole = "";
        		for (var i = 0; i < data.data.length; i++) {
        			nowRole = nowRole.concat(data.data[i]).concat(",");
        		}
        		if (sessionStorage.login_userType == 1) {
        			$(".digmanubox").show();
        			if(nowRole.indexOf("digital_manu_emp") > -1) {
        				$(".digmanubox [type='checkbox']").attr("checked", "checked");
        			}
        		}
	            // 经代商角色
	            else {
	            	$(".digagentbox").show();
	            	if(nowRole.indexOf("digital_dealer_emp") > -1) {
	            		$(".digagentbox [type='checkbox']").attr("checked", "checked");
	            	}
	            }
	            // 调整显示高度
	            var popHeight = $(".pop .form-horizontal").height() + 145;
	            $(".popup-fill").css({"margin-top": -popHeight / 2, "height": popHeight});
	        	}
        	else {
        		showPopTips("权限获取失败", "danger", data.resDescription);
        	}
            // if (data.ok) {
            //     var roles = JSON.stringify(data.data);
            //     console.log("roles = " + roles);
   
            //     //拼接经销商权限 
            //     if(sessionStorage.login_userType == 2) {
            //         $(".digmanubox").hide();

            //         if(roles.indexOf("digital_dealer_emp") > -1) {
            //             $(".digagentbox [type='checkbox']").attr("checked", "checked");
            //         } 

            //      //拼接工厂权限    
            //     } else if(sessionStorage.login_userType == 1) {
            //         $(".digagentbox").hide();

            //         if(roles.indexOf("digital_manu_emp") > -1) {
            //             $(".digmanubox [type='checkbox']").attr("checked", "checked");
            //         }
            //     }           
            // } else {
            //     alert("获取配置权限失败:"+data.resDescription);
            // }
        }
    })
}

//判断权限哪些显示
function rolesShow() {
    console.log("userType = " + sessionStorage.login_userType);
    //经销商权限 
    if(sessionStorage.login_userType == 2) {                  
        $(".digagentbox").fadeIn();
     //工厂权限    
    } else if(sessionStorage.login_userType == 1) {
        $(".digmanubox").fadeIn();     
    } 
}

//清空搜索
    $('.im-btn-empty').bind('click', function() {
        $.clearSearchData();
        derict(this, "idmanage", "nochangeurl");
    });



    //回车搜索
$(".search-block input[type=text]").bind('focus',function() {
   key.keydownEnter('.im-btn-sm');   
});

$(".search-block input[type=text]").bind('blur',function() {
   key.unkeydownEnter('.im-btn-sm');   
});