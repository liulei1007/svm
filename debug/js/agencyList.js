$(function() {
	$(".btn-delete").on("click", function() {
		var $removeLine = $(this).parents("tr");
		$(".pop").loadTemp("popConfirmDelete","nochangeurl");
		$(".pop").on("click", ".btn-sure", function() {
			// alert("yes");
			// removeRecord($removeLine);
			// console.log($removeLine);
			$removeLine.remove();
			unBind();
		});
		$(".pop").on("click", ".btn-cancel", function() {
			// alert("no");
			unBind();
		});
	});
	// 创建公司经销/代理商
	$(".btn-createCompany").on("click", function() {
		$(".work-space").loadTemp("agencyCreateCompany","nochangeurl");
	});
	// 创建个人经销/代理商
	$(".btn-createPersonal").on("click", function() {
		$(".work-space").loadTemp("agencyCreatePersonal","nochangeurl");
	});
	// 查看公司经销/代理商
	$(".btn-show-company").on("click", function() {
		$(".work-space").loadTemp("agencyShowCompany","nochangeurl");
	});
	// 查看个人经销/代理商
	$(".btn-show-personal").on("click", function() {
		$(".work-space").loadTemp("agencyShowPersonal","nochangeurl");
	});
});

function removeRecord(removeObj) {
	console.log($(removeObj));
	$(removeObj).remove();
}

function unBind() {
	$(".pop").off("click", ".btn-sure");
	$(".pop").off("click", ".btn-cancel");
	$(".pop .popup").remove();
	// $(".pop .popup").hide();
}