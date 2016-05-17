$(function() {
	// 起始商品序号
	var startNum = 0, limitNum = 20;
	// 初始化传输数据
	var data = {
		"start": startNum,
		"limit": limitNum,
		"marketName": "",
		"boothCode": "",
		"doorplateRemarks": "",
		"boothDesc": "",
		"brandName": "",
		"seriesName": "",
		"isDel": 0
	}
	// data.shopType = "2";
	
	// 获取数据
	getData();
	// 表格全选事件绑定
	tablecheckbox();

	// 点击“搜索”
	$(".btn-search").on("click", function() {
		startNum = 0;
		console.log($("#shopName").val())
		data.shopName = $("#shopName").val();
		data.boothNo = $("#boothNo").val();
		data.marketName = $("#marketName").val();
		data.shopStatus = $("#shopStatus").val();
		data.contacts = $("#contacts").val();
		console.log(data);
		getData();
	});

	// 从服务器获取数据
	function getData() {
		var newData = JSON.stringify(data);
		$.ajax({
			// url: "datas/shopList.txt",
			url: "http://192.168.222.162:8080/shopInfo/listShopInfo",
			type: "POST",
			data: newData,
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
			console.log(result.countRecord);

			// 下方分页
			var pageList = "";
			// 总页数
			var totalPages = Math.ceil(result.countRecord / limitNum);

			var tableList = "";
			result.data.map(function(list) {
				console.log(list);
				tableList += '<tr shopID="' + list.shopId + '">';
				tableList += '<td><input type="checkbox" /></td>';
				// 序号
				tableList += '<td>' + (++startNum) + '</td>';
				// 展位号
				tableList += '<td>' + list.boothNo + '</td>';
				// 公司名称
				tableList += '<td>' + '公司名称' + '</td>';
				// 品牌名
				tableList += '<td>' + '品牌名' + '</td>';
				// 系列
				tableList += '<td>系列</td>';
				// 所属商场名称
				tableList += '<td>' + list.marketName + '</td>';
				// 认证类型
				if (list.agentsType == 2) {tableList += '<td>个人</td>';}
				else if (list.agentsType == 1) {tableList += '<td>公司</td>';}
				else tableList += '<td>未设定</td>';
				// 店铺联系人
				tableList += '<td>' + list.contacts + '</td>';
				// 联系人手机号
				tableList += '<td>' + list.contactsTel + '</td>';
				// 店铺状态
				if (list.shopStatus == 1) {tableList += '<td><span class="mark mark-success">开启</span></td>';}
				else {tableList += '<td><span class="mark mark-danger">关闭</span></td>';}
				// 申请时间
				tableList += '<td>' + list.createDate + '</td>';
			});
			$("table tbody").html(tableList);
		}
		else {
			console.log(result.resDescription);
		}
	}
});