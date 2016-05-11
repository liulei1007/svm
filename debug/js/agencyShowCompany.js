$(function() {
	// 表单操作
	formCtrl();
	// 点击“返回”，返回至列表页
	$(".btn-back").on("click", function() {
		$(".work-space").loadTemp("agencyList","nochangeurl");
	});
});