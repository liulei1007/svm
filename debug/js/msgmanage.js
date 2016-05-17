$(function(){
	plumeLog("进入msgmanage模板自定义js-"+plumeTime());
	$("#mm-addmsg").bind("click",function(){
		derict(this,"msgAdd","nochangeurl");
	});

	listFeedBackData();
})

//查询缺失信息
function listFeedBackData() {
	loading();
	$.ajax({
        url: plumeApi["listFeedBack"],
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
            unloading();
            $("[list-node]").remove();
            $(".table-block").setPageData(data);
            $('.createDate').each(function () {
                $(this).html(getLocalTime($(this).html()));
                var aTr = $(this).parents('tr');
                var feedbackType = aTr.find('.feedbackType');
                var feedbackStatus = aTr.find('.feedbackStatus');
                if (feedbackType.html() == 0) {
                	feedbackType.html('未设定');
                } else if(feedbackType.html() == 1) {
                	feedbackType.html('类目缺失');
                } else if(feedbackType.html() == 2) {
                	feedbackType.html('属性缺失');
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
            })
        }
    });
}