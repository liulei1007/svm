$(function () {
    //页数
    var totalPage;
    // 初始化传输数据
    var data = {
        "start": 0,
        "limit": 10,
        "marketName": "",
        "boothCode": "",
        "personDealerName": "",
        "boothDesc": "",
        "brandName": "",
        "seriesName": "",
        "isDel": 0,
        "companyId": 0,
        "dealerId": 0
    }
    // data.shopType = "2";

    // 获取数据

    // 表格全选事件绑定
    tablecheckbox();

    // 点击“搜索”
    $(".btn-search").on("click", function () {
        startNum = 0;
        // 公司名称！！！！少！！！！！！！
        data.seriesName = $("#seriesName").val();
        data.marketName = $("#marketName").val();
        data.shopName = $("#shopName").val();
        data.personDealerName = $("#personDealerName").val();
        data.isDel = $("#isDel").find('option:selected').val();
        data.brandName = $("#brandName").val();
        getData();
        $(".nav-pagination").off();
    });

    // 从服务器获取数据
    function getData() {
        loading();
        var newData = JSON.stringify(data);
        $.ajax({
            // url: "datas/shopList.txt",
            url: plumeApi["listShopInfo"],
            type: "POST",
            data: newData,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                showData(result);
                totalPage = Math.ceil(result.countRecord / 10);
                newPage(totalPage, function (i) {
                    loading();
                    $(".nav-pagination").show();
                    
                    data.start = (i - 1) * 10;
                    var newData = JSON.stringify(data);
                    $.ajax({
                        url: plumeApi["listShopInfo"],
                        type: "POST",
                        data: newData,
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        success: function (result) {
                            showData(result);
                        },
                    });
                });

            },
            error: function (error) {
                console.log(error);
            }
        });
    }

    // 将获得的数据显示出来
    function showData(result) {
        unloading();
        if (result.ok) {
            // 总记录数
            console.log(result.countRecord);

            // 下方分页
            var pageList = "";
            // 总页数
            var totalPages = Math.ceil(result.countRecord / 10);

            var tableList = "";
            result.data.map(function (list) {
                console.log(list);
                tableList += '<tr>';
                tableList += '<td><input type="checkbox" /></td>';
                // 序号
                tableList += '<td class="shopId">' + list.id + '</td>';
                // 展位号
                tableList += '<td>' + list.boothCode + '</td>';
                // 公司名称
                tableList += '<td>' + list.companyName + '</td>';
                // 品牌名
                tableList += '<td>' + list.brandName + '</td>';
                // 系列, 防止数据为空
                if (list.seriesName) {
                    tableList += '<td>' + list.seriesName + '</td>';
                }
                else tableList += '<td>' + '' + '</td>';
                // 所属商场名称
                tableList += '<td>' + list.marketName + '</td>';
                // 店铺联系人
                tableList += '<td>' + list.personDealerName + '</td>';
                // 联系人手机号
                tableList += '<td>' + list.tel + '</td>';
                // 店铺状态
                if (list.isDel == 0) {
                    tableList += '<td><span class="mark mark-success">开启</span></td>';
                }
                else {
                    tableList += '<td><span class="mark mark-danger">关闭</span></td>';
                }
            });
            $("table tbody").html(tableList);
        }
        else {
            console.log(result.resDescription);
        }
    }

    getData();

    
//清空搜索
    $('.btn-empty').bind('click', function() {
        window.location.reload();
    });

});