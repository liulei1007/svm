$(function () {
    plumeLog("进入goodsDataManage模板自定义js-" + plumeTime());
    getTableData();
    tablecheckbox();

    function getTableData() {
        loading();
        var pram_str = '{';
        pram_str += '"productName": "",';
        pram_str += ' "modelNumber": "",';
        pram_str += '  "categoryId": 0,';
        pram_str += ' "saleStatus": ""';
        pram_str += '}';
        $.ajax({
            type: "POST",
            url: plumeApi["listProductInfo"],
            data: pram_str,
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                unloading();
                console.log(data);
                $(".gdm-table-data").setPageData(data);

                $(".gdm-btn-del").unbind().bind("click", function () {
                    if(confirm("是否确认删除?")){
                        loading();
                        var productId = $(this).parent().parent().children().first().attr("productId");
                        $.get(plumeApi["delProductInfo"] + "/" + productId, {}, function (data) {
                            unloading();
                            if (data.ok) {
                                $("[list-node]").remove();
                                getTableData();
                                $('.pop').loadTemp("popTips", "nochangeurl", function () {
                                    $(".pop").find(".popup-title").html("信息提示");
                                    $(".pop").find(".popup-icon").html('<i class="success"></i>');
                                    $(".pop").find(".popup-info").html("删除成功");
                                });
                            } else {
                                $('.pop').loadTemp("popTips", "nochangeurl", function () {
                                    $(".pop").find(".popup-title").html("信息提示");
                                    $(".pop").find(".popup-icon").html('<i class="warning"></i>');
                                    $(".pop").find(".popup-info").html("删除失败");
                                });
                            }
                        });
                    }

                });

            }
        });
    }
});
