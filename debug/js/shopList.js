$(function () {
    setPageCount();
    //页数
    var totalPage;
    var startNum = 0, limitNum = 20;
    // 初始化传输数据
    var data = {
        "start": 0,
        "limit": onePageCount(),
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
        data.personDealerName = $("#personDealerName").val();
        data.isDel = $("#isDel").find('option:selected').val();
        data.brandName = $("#brandName").val();
        $.setSearchData(data);
        getData();
        $(".nav-pagination").off();
    });

    // 从服务器获取数据
    function getData() {
        $.commonAjax({
            url: "listShopInfo",
            type: "POST",
            data: data,
            list: true,
            success: function (result) {
                showData(result);
                totalPage = Math.ceil(result.countRecord / onePageCount());
                newPage(totalPage, function (i) {
                    $(".nav-pagination").show();
                    
                    data.start = (i - 1) * 10;
                    $.commonAjax({
                        url: "listShopInfo",
                        type: "POST",
                        data: data,
                        list: true,
                        success: function (result) {
                            showData(result);
                        }
                    });
                });

            },
            error: function (error) {
                console.log(error);
            }
        });
    }
        console.log(onePageCount())
    // 将获得的数据显示出来
    function showData(result) {
        if (result.ok) {
            // 下方分页
            var pageList = "";
            // 总页数
            var totalPages = Math.ceil(result.countRecord / 10);
            console.log(totalPage);
            var tableList = "<tr style='display: none'></tr>";
            result.data.map(function (list) {
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
        $.clearSearchData();
        derict(this, "shopList", "nochangeurl");
    });


//回车搜索
$(".search-block input[type=text]").bind('focus',function() {
   key.keydownEnter('.btn-search');   
});

$(".search-block input[type=text]").bind('blur',function() {
   key.unkeydownEnter('.btn-search');   
});


});