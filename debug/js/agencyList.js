$(function() {
	$(".btn-delete").on("click", function() {
		var $removeLine = $(this).parents("tr");

		// 如果未加载过弹出层，加载弹出层
		// if (!$(".pop .popup").html()) {
		// 	alert("has");
			$(".pop").loadTemp("popConfirmDelete","nochangeurl");
			$(".pop").on("click", ".btn-sure", function() {
				alert("yes");
				// removeRecord($removeLine);
				// console.log($removeLine);
				$removeLine.remove();
				unBind();
			});
			$(".pop").on("click", ".btn-cancel", function() {
				alert("no");
				unBind();
			});
		// }
		// else {
		// 	$(".pop .popup").show();
		// }
	});
	$(".btn-createCompany").on("click", function() {
		$(".work-space").loadTemp("agencyCreateCompany","nochangeurl");
	})
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