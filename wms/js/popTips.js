$(function() {
	var timeOut;
	// 3秒后自动隐藏弹出层
	timeOut = setTimeout(function() { $('.pop').hide() }, 3000);

	// 点击“确定”按钮后，停止计时，并关闭弹出层
	$(".btn-close").on("click", function() {
		clearTimeout(timeOut);
		$('.pop').hide();
	});
})