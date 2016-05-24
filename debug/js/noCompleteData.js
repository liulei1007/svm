$(function() {
	//初始化数据
	var datas = {
	  "productName": "",
	  "modelNumber": "",
	  "categoryId": 0,
	  "subCategoryId": 0,
	  "baseCategoryId": 0,
	  "saleStatus": "",
	  "reviewStatus": "",
	  "seriesName": ""
	}

//分类
    var cls = ["gdm-type-first", "gdm-type-second", "gdm-type-third"];

    function getFirstCategory(categoryId, tag) {
        loading();
        $.get(plumeApi["listProductCategory"] + "/" + categoryId, {}, function (data) {
            unloading();
            $("." + cls[tag]).find("[list-node]").remove();
            $("." + cls[tag]).setPageData(data);
            $("." + cls[tag]).find("select").unbind().bind("change", function () {
                var nowtag = parseInt($(this).attr("tag")) + 1;
                var cid = $(this).val();
                if (nowtag < 3) {
                    getFirstCategory(cid, nowtag);
                }
            });
        })
    }

	getFirstCategory(0, 0);




//待完善数据列表
	listToBePerfectProductInfo();
	function listToBePerfectProductInfo() {
		var newData = JSON.stringify(datas)
        loading();
        $.ajax({
            type: "POST",
            url: plumeApi["listToBePerfectProductInfo"] + "?currentPage=1&onePageCount=10",
            data: newData,
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                unloading();
                totalPage = Math.ceil(data.countRecord / 10);
                newPage(totalPage, function (i) {
                    loading();
                    $.ajax({
                        type: "POST",
                        url: plumeApi["listToBePerfectProductInfo"] + "?currentPage=" + i + "&onePageCount=10",
                        data: newData,
                        contentType: "application/json",
                        dataType: "json",
                        success: function (data) {
                            unloading();
                            $(".gdm-table-data").$("[list-node]").remove();
                            $(".gdm-table-data").setPageData(data);
                        }
                    });
                });
                $(".gdm-table-data").find("[list-node]").remove();
                $(".gdm-table-data").setPageData(data);
            }
        });
	} 


	//显示列表条数
	if($(".infoNum")){$(".infoNum").html(0)}

});