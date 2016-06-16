$(function(){
    var datas = {
  "start": 0,
  "limit": 10
}


	plumeLog("进入msgmanage模板自定义js-"+plumeTime());
	$("#mm-addmsg").bind("click",function(){
		derict(this,"msgAdd","nochangeurl");
	});

    $('.table-block').on('click','.btn-delect',function() {
        //获取记录id 
        var removeList = $(this).parents('tr');
        var msgid = removeList.attr("msgid");
        //调用删除     
        delFeedBackData(msgid);
    });

	listFeedBackData();


function delFeedBackData(fid) {
    
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
                url:plumeApi["delFeedback"] + fid,
                type: "GET",
                contentType: "application/json;charset=UTF-8",
                success: function (data) {
                    if(data.ok){
                        unloading();
                        showPopTips("删除成功", "success", "反馈信息删除成功");
                        listFeedBackData();
                    }else{
                        unloading();
                        showPopTips("删除失败", "danger", data.resDescription);
                        listFeedBackData();
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

//查询缺失信息
function listFeedBackData() {
    var newData = JSON.stringify(datas)
	loading();
	$.ajax({
        url: plumeApi["listFeedBack"],
        type: "POST",
        data: newData,
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
            unloading();
            if(data.ok) {
                $("[list-node]").remove();
                $(".table-block").setPageData(data);
                filter();
                  totalPage = Math.ceil(data.countRecord / 10);
                newPage(totalPage, function (i) {
                   loading();
                   datas.start=(i-1)*10; 
                   var newData = JSON.stringify(datas)
                   $.ajax({
                    url: plumeApi["listFeedBack"],
                    type: "POST",
                    data: newData,
                    contentType: "application/json;charset=UTF-8",
                    success: function (data) {
                        unloading();
                          if(data.ok) {
                             $("[list-node]").remove();
                            $(".table-block").setPageData(data);
                            filter();
                          }
                    }
                });
            })
        }
    }
    });
}

    function filter() {
         $('.createDate').each(function () {
                    $(this).html(_getLocalTime($(this).html()));
                    var aTr = $(this).parents('tr');
                    var feedbackType = aTr.find('.feedbackType');
                    var feedbackStatus = aTr.find('.feedbackStatus');
                    if (feedbackType.html() == 0) {
                        feedbackType.html('未设定');
                    } else if(feedbackType.html() == 1) {
                        feedbackType.html('类目缺失');
                    } else if(feedbackType.html() == 2) {
                        feedbackType.html('属性缺失');
                    } else if(feedbackType.html() == 3) {
                        feedbackType.html('商品缺失');
                    } else {
                        feedbackType.html('未知');
                    }

                    if(feedbackStatus.html() == 0) {
                        feedbackStatus.html('已提交');
                    } else if(feedbackStatus.html() == 1) {
                        feedbackStatus.html('已受理');
                    } else if(feedbackStatus.html() == 2) {
                        feedbackStatus.html('已解决');
                    } else {
                        feedbackStatus.html('未知');
                    }
                });
    }

});