$(function() {
	// 点击“申请直营店”
	$(".btn-create").on("click", function() {
		derict(this, "shopCreate", "nochangeurl");
	});
});