$(function() {
	var datas = {
	  "productName": "",
	  "modelNumber": "",
	  "categoryId": "",
	  "subCategoryId": "",
	  "baseCategoryId": "",
	  //"saleStatus": "",
	  //"reviewStatus": "",
	  "seriesName": ""
	}

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


	listErrorFeedbackProductInfo();
	function listErrorFeedbackProductInfo() {
		var newData = JSON.stringify(datas)
        loading();
        $.ajax({
            type: "POST",
            url: plumeApi["listErrorFeedbackProductInfo"] + "?currentPage=1&onePageCount=10",
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
                        url: plumeApi["listErrorFeedbackProductInfo"] + "?currentPage=" + i + "&onePageCount=10",
                        data: newData,
                        contentType: "application/json",
                        dataType: "json",
                        success: function (data) {
                            unloading();
                            $(".table-block").find("[list-node]").remove();
                            $(".table-block").setPageData(data);
                            getFirstCategory(0, 0);
                            addTableFuncs();

                        }
                    });
                });
                $(".table-block").find("[list-node]").remove();
                $(".table-block").setPageData(data);
                addTableFuncs();
            }
        });
	} 



	if($(".infoNum")){$(".infoNum").html(0)}

	$(".btn-search").bind("click",function() {
		datas.productName = $("#productName").val();
		datas.baseCategoryId = $("#baseCategoryId").val();
 		datas.subCategoryId = $("#subCategoryId").val();
 		datas.categoryId = $("#categoryId").val();	
 		listErrorFeedbackProductInfo();
         $(".nav-pagination").off();
	})	
	
    function addTableFuncs(){
        $(".ai-btn-show").unbind().bind("click",function(){
            var uptId = $(this).attr("uptId");
            var productId = $(this).attr("productId");
            session.goods_showMyGoods_uptId = uptId;
            session.goods_showMyGoods_productId = productId;
            derict(this, "feedMyGoods", "nochangeurl");
        });
    }
})