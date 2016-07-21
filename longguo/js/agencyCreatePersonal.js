var thisUrl = "agencyCreatePersonal";

$(function() {
	$('#startTime').cxCalendar();
	$("#endTime").cxCalendar();
	// 点击“下一步”，跳转页面
	$(".btn-next").on("click", function() {
		derict(this, "agencyAddAccount", "nochangeurl");
	});
	// 点击“取消”，返回至列表页
	$(".btn-back").on("click", function() {
		derict(this, "agencyList", "nochangeurl");
	});
});