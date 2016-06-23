$(function() {

	// 初始化传输数据
	var datas = {
		"pdtName": "",
		"brandName": "",
		"page": 0,
		"perPage": 10
	}
	// 获取数据
	getData();

	// 绑定“搜索”按钮
	$(".btn-search").bind("click", function() {
		datas.pdtName = $("#pdtName").val();
		datas.brandName = $("#brandName").val();
		getData();
		$(".nav-pagination").off();
	});

	// 绑定“单笔新增自采商品”按钮
	$(".btn-createNew").bind("click", function() {
		session.stashGoods_operate = "create";
		derict(this, "createSelfGoods", "nochangeurl");
	});

	
	$(".table-block").on("click", ".link-show", function() {
		// 查看自采商品
		var stashId = $(this).parents("tr").find(".stashId").text();
		session.stashGoods_stashId = stashId;
		derict(this, "showSelfGoods", "nochangeurl");
	}).on("click", ".btn-edit", function() {
		// 编辑自采商品
		var stashId = $(this).parents("tr").find(".stashId").text();
		session.stashGoods_stashId = stashId;
		derict(this, "editSelfGoods", "nochangeurl");
	}).on("click", ".btn-copy", function() {
		// 复制自采商品
		var stashId = $(this).parents("tr").find(".stashId").text();
		session.stashGoods_operate = "edit";
		session.stashGoods_stashId = stashId;
		// session.stashGoods = {stashId: stashId, operate: "edit"};
		derict(this, "createSelfGoods", "nochangeurl");
	});

	// 从服务器获取数据
	function getData() {
		loading();
		$("[list-node]").remove();
		$.ajax({
			// url: "datas/shopList.txt",
			url: plumeApi["listProductStash"],
			type: "GET",
			data: datas,
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function(data) {
				unloading();
				$(".doc-commodityManagement").setPageData(data);
				totalPage=Math.ceil(data.countRecord/10);
            	newPage(totalPage,function(i){
            		loading();
					datas.page = (i-1)*10;
					$.ajax({
						url: plumeApi["listProductStash"],
						type: "GET",
						data: datas,
						dataType: "json",
						contentType: "application/json; charset=utf-8",
						success: function(data) {
							    unloading();
							    $("[list-node]").remove();
								$(".doc-commodityManagement").setPageData(data);
						},
					});
				});
			},
			error:function(error) {console.log(error);}
		});
	}

		//显示列表条数
	if($(".infoNum")){$(".infoNum").html(0)}

	//批量导入	
	$(".btn-batch").bind("click",function() {
		 $('.pop').loadTemp("popBatch", "nochangeurl");
	});

	//清空搜索
    $('.btn-empty').bind('click', function() {
        window.location.reload();
    });

//回车搜索
    $(".search-block input[type=text]").bind('focus',function() {
       key.keydownEnter('.btn-search');   
    });

    $(".search-block input[type=text]").bind('blur',function() {
       key.unkeydownEnter('.btn-search');   
    }); 
    
});