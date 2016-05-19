// nowPage: 当前页数, totalPage: 总共页数

var totalPage;
function page(nowPage,totalPage,searchData,fun){
	loadPagination(nowPage, totalPage);

	// 如果总页数大于5, 还需显示跳转表单
	if (totalPage > 10) {
		var turnHtml = '';
		turnHtml += '<div class="turn">';
		turnHtml += '<span>跳转到</span>';
		turnHtml += '<input type="text" id="turnTo" class="form-control" />';
		turnHtml += '<div class="btn btn-default btn-go">GO</div>';
		turnHtml += '</div>';
		$(".nav-pagination").prepend(turnHtml);
	}

	// 绑定分页点击事件
	$(".nav-pagination").on("click", ".num", function() {
		// 防止点击当前页
		if ($(this).hasClass("active")) { return; }

		nowPage = parseInt($(this).attr("data-page"));
		loadPagination(nowPage, totalPage ,fun);
		$(".nav-pagination").off();
	}).on("click", ".first", function() {
		// 防止当前已是最前页
		if ($(this).hasClass("disabled")) { return; }

		nowPage = parseInt($(".nav-pagination").find(".num").eq(0).attr("data-page"));
		loadPagination(nowPage, totalPage ,fun);
		$(".nav-pagination").off();
	}).on("click", ".last", function() {
		// 防止当前已是最后页
		if ($(this).hasClass("disabled")) { return; }

		nowPage = parseInt($(".nav-pagination").find(".num").last().attr("data-page"));
		loadPagination(nowPage, totalPage ,fun);
		$(".nav-pagination").off();
	});
	// 绑定跳转页面
	$(".nav-pagination").on("click", ".btn-go", function() {
		// 确保输入的数字
		if (!isNaN(parseInt($("#turnTo").val()))) {
			nowPage = parseInt($("#turnTo").val());
			loadPagination(nowPage, totalPage,fun);
		}
		$(".nav-pagination").off();
	});
}

function loadPagination(nowPage, totalPage, fun) {
	var paginationHtml = '';
	// 回到最前页按钮
	if (nowPage == 1) { paginationHtml += '<li class="first disabled"><span>&laquo;</span></li>'; }
	else paginationHtml += '<li class="first"><span>&laquo;</span></li>';

	// 如果总页数小于或者等于10
	if (totalPage <= 10) {
		for (var i = 0; i < totalPage; i++) {
			if (i == nowPage - 1) { paginationHtml += '<li class="num active" data-page="' + (i + 1) + '"><span>' + (i + 1) + '</span></li>'; }
			else paginationHtml += '<li class="num" data-page="' + (i + 1) + '"><span>' + (i + 1) + '</span></li>';
		}
	}
	// 如果总页数大于10, 需显示"..."
	else {
		// 如果当前页 < 6, 左侧显示7个页码, 右侧显示2个页码
		if (nowPage < 6) {
			// 左侧7个页码
			for (var i = 0; i < 7; i++) {
				if (i == nowPage - 1) { paginationHtml += '<li class="num active" data-page="' + (i + 1) + '"><span>' + (i + 1) + '</span></li>'; }
				else paginationHtml += '<li class="num" data-page="' + (i + 1) + '"><span>' + (i + 1) + '</span></li>';
			}
			// 中间"..."
			paginationHtml += '<li class="more"><span>...</span></li>';
			// 右侧2个页码
			paginationHtml += '<li class="num" data-page="' + (totalPage - 1) + '"><span>' + (totalPage - 1) + '</span></li>';
			paginationHtml += '<li class="num" data-page="' + totalPage + '"><span>' + totalPage + '</span></li>';
		}
		// 如果总页数 - 当前页 < 5, 左侧显示2个页码, 右侧显示7个页码
		else if (totalPage - nowPage < 5) {
			// 左侧2个页码
			paginationHtml += '<li class="num" data-page="1"><span>1</span></li>';
			paginationHtml += '<li class="num" data-page="2"><span>2</span></li>';
			// 中间"..."
			paginationHtml += '<li class="more"><span>...</span></li>';
			// 右侧7个页码
			for (var i = totalPage - 7; i < totalPage; i++) {
				if (i == nowPage - 1) { paginationHtml += '<li class="num active" data-page="' + (i + 1) + '"><span>' + (i + 1) + '</span></li>'; }
				else paginationHtml += '<li class="num" data-page="' + (i + 1) + '"><span>' + (i + 1) + '</span></li>';
			}
		}
		// 否则, 左侧显示1个页码, 中间显示5个页码, 右侧显示2个页码
		else {
			// 左侧2个页码
			paginationHtml += '<li class="num" data-page="1"><span>1</span></li>';
			paginationHtml += '<li class="num" data-page="2"><span>2</span></li>';
			// 中间"..."
			paginationHtml += '<li class="more"><span>...</span></li>';
			// 中间5个页码
			for (var i = (nowPage - 3); i < (nowPage + 2); i++) {
				if (i == nowPage - 1) { paginationHtml += '<li class="num active" data-page="' + (i + 1) + '"><span>' + (i + 1) + '</span></li>'; }
				else paginationHtml += '<li class="num" data-page="' + (i + 1) + '"><span>' + (i + 1) + '</span></li>';
			}
			// 中间"..."
			paginationHtml += '<li class="more"><span>...</span></li>';
			// 右侧2个页码
			paginationHtml += '<li class="num" data-page="' + (totalPage - 1) + '"><span>' + (totalPage - 1) + '</span></li>';
			paginationHtml += '<li class="num" data-page="' + totalPage + '"><span>' + totalPage + '</span></li>';
		}
	}

	// 跳到最后页按钮
	if (nowPage == totalPage) { paginationHtml += '<li class="last disabled"><span>&raquo;</span></li>'; }
	else paginationHtml += '<li class="last"><span>&raquo;</span></li>';
	$(".pagination").html(paginationHtml);
	if(fun){
		fun(nowPage)
	}
}

// // 跳转页面的操作
// function turnToPage(nowPage) {
// 	console.log(nowPage);
// }