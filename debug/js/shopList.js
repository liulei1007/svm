$(function() {
	// 起始商品序号
	var startNum = 0;
	// 初始化传输数据
	var data = {
		"start": startNum,
		"limit": 0,
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
	// 点击“申请直营店”
	$(".btn-create").on("click", function() {
		derict(this, "shopCreate", "nochangeurl");
	});

	function getData() {
		data = JSON.stringify(data);
		$.ajax({
			url: "datas/shopList.txt",
			// url: "http://192.168.222.162:8080/shopInfo/listShopInfo",
			data: data,
			// type: "POST",
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function(result) {showData(result);},
			error:function(er){}
		});
	}

	function showData(result) {
		if (result.ok) {
			// 总记录数
			console.log(result.countRecord);
			var tableList = "";
			result.data.map(function(list) {
				console.log(list);
				tableList += '<tr>';
				tableList += '<td><input type="checkbox" /></td>';
				tableList += '<td>' + (++startNum) + '</td>';
				tableList += '<td>' + list.shopName + '</td>';
				tableList += '<td>' + list.boothNo + '</td>';
				// 店铺类型
				if (list.shopType == 2) {tableList += '<td>经代店</td>';}
				else if (list.shopType == 1) {tableList += '<td>直营店</td>';}
				else tableList += '<td>未设定</td>';
				tableList += '<td>' + list.marketName + '</td>';
				// 认证类型
				if (list.agentsType == 2) {tableList += '<td>个人</td>';}
				else if (list.agentsType == 1) {tableList += '<td>公司</td>';}
				else tableList += '<td>未设定</td>';
				tableList += '<td>' + list.createDate + '</td>';
				tableList += '<td>' + list.contacts + '</td>';
				tableList += '<td>' + list.contactsTel + '</td>';
				// 店铺状态
				if (list.shopStatus == 2) {tableList += '<td><span class="mark mark-danger">关闭</span></td>';}
				else if (list.shopStatus == 1) {tableList += '<td><span class="mark mark-success">开启</span></td>';}
				else tableList += '<td><span class="mark mark-default">未设定</span></td>';
				tableList += '<td><button type="button" class="btn btn-link">查看</button></td>';
			});
			$("table tbody").html(tableList);
		}
		else {
			alert(result.resDescription);
		}
	}
});