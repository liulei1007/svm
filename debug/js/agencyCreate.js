$(function() {
	$(".body-typein").on("click", "#li-hasAgency", function() {
		// 防止重复点击
		if ($(this).hasClass("active")) { return; }
		$(this).addClass("active").siblings().removeClass("active");

		// 显示不同表单
		$("#form-hasAgency").show().siblings(".form-horizontal").hide();
	}).on("click", "#li-findAgency", function() {
		// 防止重复点击
		if ($(this).hasClass("active")) { return; }
		$(this).addClass("active").siblings().removeClass("active");

		// 显示不同表单
		$("#form-findAgency").show().siblings(".form-horizontal").hide();
	})
});