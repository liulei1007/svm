$(function() {
	// 表单点击标题收缩
	$(".form-block-contractive").on("click", ".block-title", function() {
		var $formBlock = $(this).parents(".form-block-contractive");
		$formBlock.toggleClass("contractive");
		if ($formBlock.hasClass("contractive")) {
			$(this).siblings(".form-horizontal").slideUp();
		}
		else {
			$(this).siblings(".form-horizontal").slideDown();
		}
	});
});
