$(function(){
	plumeLog("进入idmanage模板自定义js-"+plumeTime());
	tablecheckbox();

    //添加
	$(".im-btn-add").bind("click",function(){
		derict(this, "childIdCreate", "nochangeurl");
	});

	//搜索
	$(".btn-sm").bind("click",function(){
		listSubUserDate(1, 10);
	});

	//权限配置
	$('.table-block').on('click','.btn-acset',function() {
        var removeList = $(this).parents('tr');
        var managid = removeList.attr("managid");

        $('.pop').loadTemp("popAuth", "nochangeurl", function () {
        // $(".cic-pop").pop("popAuth",function(){
            getAccRole(managid);

            rolesShow();

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
	listSubUserDate(1, 10);

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
                alert("权限调整成功!");
                $(".cic-pop").pophide();
            } else {
                alert("权限调整失败!"+data.resDescription);
            }
        }
    });



}

//查询子账号分页信息 page：第几页；perPage：每页多少条记录
function listSubUserDate(page, perPage) {
	//获取子账号列表的url
	var apiName = "";

	//获取登录人的用户类型：0：未设定,1:工厂,2:经销商代理商
	var userType = sessionStorage.login_userType;
	if(userType == null || userType == 0) {
		return;
	} else if(userType == 1) {
		apiName = plumeApi["listManuSubUserInfo"];
	} else if (userType == 2) {
		apiName = plumeApi["listSubUserInfo"];
	} else {
		return;
	}

	var mobilePhone = $("#tel").val();
	if(page == null)
		page = 1;
	if(perPage == null)
		perPage = 10;
	
	loading();
	$.ajax({
        url: apiName,
        type: "GET",
        data: {
                "mobilePhone": mobilePhone,
                "page": page,
                "perPage": perPage
            },
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
            unloading();
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
        $(".pop").find(".popup-title").html("删除确认？");
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
                        popTips("删除成功","success");
                        listSubUserDate();
                    }else{
                        unloading();
                        popTips("删除失败","warning");
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
            if (data.ok) {
                var roles = JSON.stringify(data.data);
                console.log("roles = " + roles);
   
                //拼接经销商权限 
                if(sessionStorage.login_userType == 2) {
                    $(".digmanubox").hide();

                    if(roles.indexOf("digital_dealer_emp") > -1) {
                        $(".digagentbox [type='checkbox']").attr("checked", "checked");
                    } 

                 //拼接工厂权限    
                } else if(sessionStorage.login_userType == 1) {
                    $(".digagentbox").hide();

                    if(roles.indexOf("digital_manu_emp") > -1) {
                        $(".digmanubox [type='checkbox']").attr("checked", "checked");
                    }
                }           
            } else {
                alert("获取配置权限失败:"+data.resDescription);
            }
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