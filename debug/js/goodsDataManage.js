
$(function() {
    plumeLog("进入goodsDataManage模板自定义js-"+plumeTime());
    getTableData();
    tablecheckbox();
    var $removeLine;

    $(".btn-delete").on("click", function() {
        $removeLine = $(this).parents("tr");
        deleteRecode($removeLine, "url1", "key1");
    });

    $(".btn-createCompany").on("click", function() {
        derict(this, "agencyCreateCompany", "nochangeurl");
        // $(".work-space").loadTemp("agencyCreateCompany","nochangeurl");
    });

    $(".btn-createPersonal").on("click", function() {
        derict(this, "agencyCreatePersonal", "nochangeurl");
        // $(".work-space").loadTemp("agencyCreatePersonal","nochangeurl");
    });

    $(".btn-show-company").on("click", function() {
        derict(this, "agencyShowCompany", "nochangeurl");

    });

    $(".btn-show-personal").on("click", function() {
        derict(this, "agencyShowPersonal", "nochangeurl");
    });
    function getTableData(){
        loading();
        var pram_str='{';
        pram_str+='"productName": "",';
        pram_str+=' "modelNumber": "",';
        pram_str+='  "categoryId": 0,';
        pram_str+=' "saleStatus": ""';
        pram_str+='}';
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
            }
        });
    }
});

function unBind() {
    $(".pop").off("click", ".btn-sure");
    $(".pop").off("click", ".btn-cancel");
    $(".pop .popup").remove();
    $(".pop").hide();
    // $(".pop .popup").hide();
}