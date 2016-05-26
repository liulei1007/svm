$(function() {
	//初始化数�?
	var datas = {
	  "productName": "",
	  "modelNumber": "",
	  "categoryId": "",
	  "subCategoryId": "",
	  "baseCategoryId": "",
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




//待完善数据列�?
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
                            $(".table-block").find("[list-node]").remove();
                            $(".table-block").setPageData(data);
                            getFirstCategory(0, 0);
                        }
                    });
                });
                $(".table-block").find("[list-node]").remove();
                $(".table-block").setPageData(data);
            }
        });
	} 


	//显示列表条数
	if($(".infoNum")){$(".infoNum").html(0)}

	//点击查询按钮
	$(".btn-search").bind("click",function() {
		datas.productName = $("#productName").val();
		datas.baseCategoryId = $("#baseCategoryId").val();
 		datas.subCategoryId = $("#subCategoryId").val();
 		datas.categoryId = $("#categoryId").val();	
 		listToBePerfectProductInfo();
        $(".nav-pagination").off();
	})


	//点击编辑按钮
    $('.table-block').on('click','.btn-link-edit',function() {
        session.goods_showMyGoods_uptId = $(this).attr("uptid");
        session.goods_showMyGoods_type = "amend";
        derict(this, "myGoods", "nochangeurl");
    })
    $('.table-block').on('click','.btn-link-delete',function() {
        if (confirm("是否确认删除?")) {
            loading();
            var uptId = $(this).attr("uptId");
            $.get(plumeApi["delProductInfoUpt"] + "/" + uptId, {}, function (data) {
                unloading();
                if (data.ok) {

                    $('.pop').loadTemp("popTips", "nochangeurl", function () {
                        $(".pop").find(".popup-title").html("信息提示");
                        $(".pop").find(".popup-icon").html('<i class="success"></i>');
                        $(".pop").find(".popup-info").html("删除成功!");
                        setTimeout(function () {
                            window.location.reload();
                        }, 1000);
                        //derict(null,"noCompleteData","nochangeurl");
                    });
                } else {
                    $('.pop').loadTemp("popTips", "nochangeurl", function () {
                        $(".pop").find(".popup-title").html("信息提示");
                        $(".pop").find(".popup-icon").html('<i class="warning"></i>');
                        $(".pop").find(".popup-info").html("删除失败!");

                    });
                }
            });
        }
    })

});