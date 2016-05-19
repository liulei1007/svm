$(function(){
	plumeLog("进入idmanage模板自定义js-"+plumeTime());
	tablecheckbox();
	$(".im-btn-add").bind("click",function(){
		derict(this, "childIdCreate", "nochangeurl");
	});

	$(".btn-sm").bind("click",function(){
		listSubUserDate(1, 10);
	});

	$(".btn-compile").bind("click",function(){
		
	});

	$(".btn-delect").bind("click",function(){
		
	});


});

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
        data: JSON.stringify(
            {
                "mobilePhone": mobilePhone,
                "page": page,
                "perPage": perPage
            }
        ),
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
            unloading();
            $("[list-node]").remove();
            if(data.ok) {
                $(".table-block").setPageData(data);
                $('.createDate').each(function () {
                    $(this).html(getLocalTime($(this).html()));
                });
            }
        }
    });
}