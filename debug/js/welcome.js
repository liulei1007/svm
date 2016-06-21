$(function(){

	// plumeLog("进入welcome模板自定义js-"+plumeTime());
	$(".bw-item-title").on("click", function() {
		var $block = $(this).parents(".bw-block-item");
		$block.toggleClass("contractive");
		if ($block.hasClass("contractive")) {
			$(this).siblings(".bw-item-table, .bw-item-btns").slideUp();
		}
		else {
			$(this).siblings(".bw-item-table, .bw-item-btns").slideDown();
		}
	});
	if ((sessionStorage.login_mobilePhone!=undefined)&&(sessionStorage.login_mobilePhone!="")) {
		$(".welcome-user").html(sessionStorage.login_mobilePhone.substring(0, 3) + "****"+sessionStorage.login_mobilePhone.substring(7));
	};
});