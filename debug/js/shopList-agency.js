$(function() {
	// 起始商品序号
	var startNum = 0, limitNum = 2;
	// 初始化传输数据
	var data = {
		"start": startNum,
		"limit": limitNum,
		"shopType": "",
		"shopName": "",
		"provinceId": "",
		"cityId": "",
		"marketId": 0,
		"contacts": "",
		"boothNo": "",
		"shopStatus": ""
	}

	// data.shopType = "2";
	
	// 获取数据
	getData();

	// 表格全选事件绑定
	tablecheckbox();

	// 点击“搜索”
	$(".btn-search").on("click", function() {
		
	});

	// 点击“申请直营店”
	$(".btn-create").on("click", function() {
		// $('.pop').loadTemp("popTips", "nochangeurl", function() {
		// 	$(".pop").find(".popup-title").html("申请提示");
		// 	$(".pop").find(".popup-icon").html('<i class="confirm"></i>');
		// 	$(".pop").find(".popup-info").html("请确认申请@@@");
		// });
		derict(this, "shopCreateAgency", "nochangeurl");
	});

	// 查看店铺信息
	$("table").on("click", ".btn-detail", function() {
		// var shopID = $(this).parents("tr").attr("shopID");
		// 传参：shopID
		session.shopID = $(this).parents("tr").attr("shopID");
		derict(this, "shopShowAgency", "nochangeurl");
	});

	// 从服务器获取数据
	function getData() {
		data = JSON.stringify(data);
		$.ajax({
			// url: "datas/shopList.txt",
			url: "http://192.168.222.162:8080/shopInfo/listShopInfo",
			type: "POST",
			data: data,
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function(result) {showData(result);},
			error:function(error) {console.log(error);}
		});
	}

	// 将获得的数据显示出来
	function showData(result) {
		if (result.ok) {
			// 总记录数
			// console.log(result.countRecord);

			// 下方分页
			var pageList = "";
			// 总页数
			var totalPages = Math.ceil(result.countRecord / limitNum);

			var tableList = "";
			result.data.map(function(list) {
				// console.log(list);
				tableList += '<tr shopID="' + list.shopId + '">';
				tableList += '<td><input type="checkbox" /></td>';
				tableList += '<td>' + (++startNum) + '</td>';
				// 展位号
				tableList += '<td>' + list.boothNo + '</td>';
				// 系列
				tableList += '<td>' + '系列' + '</td>';
				// 品牌名
				tableList += '<td>' + list.brandName + '</td>';
				// 店铺地址------------------------------------------
				tableList += '<td>' + '店铺地址' + '</td>';
				// 店铺联系人
				tableList += '<td>' + list.contacts + '</td>';
				// 联系人手机号
				tableList += '<td>' + list.contactsTel + '</td>';
				// 店铺状态
				if (list.shopStatus == 1) {tableList += '<td><span class="mark mark-success">开启</span></td>';}
				else {tableList += '<td><span class="mark mark-danger">关闭</span></td>';}
				// 申请时间
				tableList += '<td>' + list.createDate + '</td>';
				tableList += '<td><button type="button" class="btn btn-link btn-detail">查看</button></td>';
			});
			$("table tbody").html(tableList);
		}
		else {
			alert(result.resDescription);
		}
	}
});