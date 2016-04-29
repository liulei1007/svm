$(function() {
	// 点击“+”，添加选择系列框
	$(".btn-add").on("click", function() {
		alert("djdl");
		$(this).parent().before('<div class="col-sm-3"><select class="form-control"><option>系列二</option></select></div>');
	});
});