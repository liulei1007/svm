$(function() {
	// 点击“返回”，返回至列表页
	$(".btn-back").on("click", function() {
		derict(this, "agencyList", "nochangeurl");
	});
});