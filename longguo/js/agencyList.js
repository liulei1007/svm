
$(function() {
	plumeLog("进入agencyList模板自定义js-"+plumeTime());
	getTableData();
	tablecheckbox();
	var $removeLine;
	// 点击“删除”，弹出层提示是否确认删除
	$(".btn-delete").on("click", function() {
		$removeLine = $(this).parents("tr");
		deleteRecode($removeLine, "url1", "key1");
		// // 如果未加载过弹出层，加载弹出层
		// // if (!$(".pop .popup").html()) {
		// 	$(".pop").loadTemp("popConfirmDelete", "nochangeurl", function() {
		// 		$(".pop").show();
		// 		// 弹出层的绑定事件：“确定”删除当前记录；“取消”隐藏弹出层
		// 		$(".pop").on("click", ".btn-sure", function() {
		// 			alert("yes");
		// 			$removeLine.remove();
		// 			unBind();
		// 			// $(".pop").hide();
		// 		}).on("click", ".btn-cancel", function() {
		// 			alert("cancel");
		// 			unBind();
		// 			// $(".pop").hide();
		// 		});
		// 	});
		// // }
		// // // 若加载过弹出层，显示弹出层
		// // else {
		// // 	$(".pop").show();
		// // }
	});
	// 创建公司经销/代理商
	$(".btn-createCompany").on("click", function() {
		derict(this, "agencyCreateCompany", "nochangeurl");
		// $(".work-space").loadTemp("agencyCreateCompany","nochangeurl");
	});
	// 创建个人经销/代理商
	$(".btn-createPersonal").on("click", function() {
		derict(this, "agencyCreatePersonal", "nochangeurl");
		// $(".work-space").loadTemp("agencyCreatePersonal","nochangeurl");
	});
	// 查看公司经销/代理商
	$(".btn-show-company").on("click", function() {
		derict(this, "agencyShowCompany", "nochangeurl");

	});
	// 查看个人经销/代理商
	$(".btn-show-personal").on("click", function() {
		derict(this, "agencyShowPersonal", "nochangeurl");
	});
	function getTableData(){
		$.get(plumeApi["listAgentsBrandInfoList"],{"page":0,"perPage":3},function(data){
			$(".table-block").setPageData(data);
		})
	}
});

function unBind() {
	$(".pop").off("click", ".btn-sure");
	$(".pop").off("click", ".btn-cancel");
	$(".pop .popup").remove();
	$(".pop").hide();
	// $(".pop .popup").hide();
}