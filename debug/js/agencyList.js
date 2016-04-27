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
	$(".btn-createCompany").on("click", function() {
		$(".work-space").loadTemp("agencyCreateCompany","nochangeurl");
	});
	$(".btn-createPersonal").on("click", function() {
		$(".work-space").loadTemp("agencyCreatePersonal","nochangeurl");
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