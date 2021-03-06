function newPage(totalPage, fun) {
    var Tf = false
    var nowPage = 1;
    loadPagination(nowPage, totalPage);

    // 如果总页数大于5, 还需显示跳转表单
    if (totalPage > 10) {
        $(".turn").remove();
        var turnHtml = '';
        turnHtml += '<div class="turn">';
        turnHtml += '<span>跳转到</span>';
        turnHtml += '<input type="text" id="turnTo" class="form-control" />';
        turnHtml += '<div class="btn btn-default btn-go">GO</div>';
        turnHtml += '</div>';
        $(".nav-pagination").prepend(turnHtml);
    }
    try {
        var changePageCountHtml = "<div class='changepagecount'><span>设置每页显示行数:</span></span><dl tag=0 >默认</dl><dl tag=20 >20</dl><dl tag=50 >50</dl><dl tag=100 >100</dl><dl tag=500 >500</dl></div>";
        $(".changepagecount").remove();
        $(".nav-pagination").prepend(changePageCountHtml);
        if($.session[$.session.nowPageName + "_PAGE_SET_COUNT"]){
            $(".changepagecount").find("[tag=" + $.session[$.session.nowPageName + "_PAGE_SET_COUNT"] + "]").addClass("active");
        }else{
            $(".changepagecount").find("[tag=0]").addClass("active");
        }

        $(".changepagecount dl").bind("click", function () {
            $(this).siblings().removeClass("active");
            $(this).addClass("active");
            $.session[$.session.nowPageName + "_PAGE_SET_COUNT"] = PAGE_SET_COUNT = parseInt($(this).attr("tag"));
            var pageName = utils.getPageUrl();
            if ($.session.nowPageName && $.session.nowPageName != 'undefined' && $.session.nowPageName != 'undefined') {
                pageName = $.session.nowPageName;
            }
            $.directPage(pageName);
        });

    } catch (e) {
    }
    // 绑定分页点击事件
    $(".nav-pagination").on("click", ".num", function () {
        // 防止点击当前页
        if ($(this).hasClass("active")) {
            return;
        }

        $(".nav-pagination").hide();
        nowPage = parseInt($(this).attr("data-page"));
        loadPagination(nowPage, totalPage);
    }).on("click", ".first", function () {
        // 防止当前已是最前页
        if ($(this).hasClass("disabled")) {
            return;

        }

        nowPage = parseInt($(".nav-pagination").find(".num").eq(0).attr("data-page"));
        loadPagination(nowPage, totalPage);
    }).on("click", ".last", function () {
        // 防止当前已是最后页
        if ($(this).hasClass("disabled")) {
            return;
        }

        nowPage = parseInt($(".nav-pagination").find(".num").last().attr("data-page"));
        loadPagination(nowPage, totalPage);
    });
    // 绑定跳转页面
    $(".nav-pagination").on("click", ".btn-go", function () {
        // 确保输入的数字
        if (!isNaN(parseInt($("#turnTo").val()))) {
            nowPage = parseInt($("#turnTo").val());
            loadPagination(nowPage, totalPage);
        }
    });


    function loadPagination(nowPage, totalPage) {

        var paginationHtml = '';
        // 回到最前页按钮
        if (nowPage == 1 && totalPage > 0) {
            paginationHtml += '<li class="first disabled"><span>&laquo;</span></li>';
        }
        else if (totalPage > 0) {
            paginationHtml += '<li class="first"><span>&laquo;</span></li>';
        }

        // 如果总页数小于或者等于10
        if (totalPage <= 10) {
            for (var i = 0; i < totalPage; i++) {
                if (i == nowPage - 1) {
                    paginationHtml += '<li class="num active" data-page="' + (i + 1) + '"><span>' + (i + 1) + '</span></li>';
                }
                else paginationHtml += '<li class="num" data-page="' + (i + 1) + '"><span>' + (i + 1) + '</span></li>';
            }
        }
        // 如果总页数大于10, 需显示"..."
        else {
            // 如果当前页 < 6, 左侧显示7个页码, 右侧显示2个页码
            if (nowPage < 6) {
                // 左侧7个页码
                for (var i = 0; i < 7; i++) {
                    if (i == nowPage - 1) {
                        paginationHtml += '<li class="num active" data-page="' + (i + 1) + '"><span>' + (i + 1) + '</span></li>';
                    }
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
                    if (i == nowPage - 1) {
                        paginationHtml += '<li class="num active" data-page="' + (i + 1) + '"><span>' + (i + 1) + '</span></li>';
                    }
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
                    if (i == nowPage - 1) {
                        paginationHtml += '<li class="num active" data-page="' + (i + 1) + '"><span>' + (i + 1) + '</span></li>';
                    }
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
        if (nowPage == totalPage) {
            paginationHtml += '<li class="last disabled"><span>&raquo;</span></li>';
        }
        else if (totalPage > 0) {
            paginationHtml += '<li class="last"><span>&raquo;</span></li>';
        }
        $(".pagination").html(paginationHtml);
        if (fun) {
            if (Tf) {
                fun(nowPage);
            }
            Tf = true;
        }
    }
}
