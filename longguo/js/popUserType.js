$(function() {
    plumeLog("进入userType模板自定义js-" + plumeTime());
    //初始化赋值
    $(".type-first-span").text($(".type-first").find(".sel").text()).attr("categoryId", $(".type-first").find(".sel").attr("categoryId"));
    $(".type-second-span").text($(".type-second").find(".sel").text()).attr("categoryId", $(".type-second").find(".sel").attr("categoryId"));
    $(".type-third-span").text($(".type-third").find(".sel").text()).attr("categoryId", $(".type-third").find(".sel").attr("categoryId"));

    //取消按钮
    $(".ut-btn-cancel").on('click',function() {
        $('.loadBatch-select').css('opacity',0);
        $(".popSort").hide();
        $(".type-first-span").text("");
        $(".type-second-span").text("");
        $(".type-third-span").text("");
    });

    //下一步按钮操作
    $(".ut-btn-next").bind("click", function () {
        session.goods_userType = "";
        if((!$(".type-third-span").attr("categoryId"))||($(".type-third-span").attr("categoryId")=="")){
            $(".pop").find(".popup-title").html("信息提示");
            $(".pop").find(".popup-icon").html('<i class="warning"></i>');
            $(".pop").find(".popup-info").html("请选择类目");
            return;
        }
        session.goods_userType = $(".type-first-span").eq(0).text() + ">" + $(".type-second-span").eq(0).text() + ">" + $(".type-third-span").eq(0).text();
        session.goods_categoryId = $(".type-third-span").attr("categoryId");
        session.goods_categoryName = $(".type-third-span").eq(0).text();
        session.goods_subCategoryId = $(".type-second-span").attr("categoryId");
        session.goods_subCategoryName = $(".type-second-span").eq(0).text();
        session.goods_baseCategoryId = $(".type-first-span").attr("categoryId");
        session.goods_baseCategoryName = $(".type-first-span").attr("categoryId");
        $(".popSort").hide();
    });
    var cls = ["type-first", "type-second", "type-third"];
    //迭代获取类目
    function getFirstCategory(categoryId, tag) {
        loading();
        $.get(plumeApi["listProductCategory"] + "/" + categoryId, {}, function (data) {
            unloading();
            $("." + cls[tag]).find("[list-node]").remove();
            $("." + cls[tag]).setPageData(data);
            for(var i=0;i<cls.length;i++){
                var o=$("."+cls[i]).find(".sel");
                $("." + cls[i] + "-span").text($(o).text()).attr("categoryId", $(o).attr("categoryId"));
            }
            $("." + cls[tag]).find("li").unbind().bind("click", function () {
                $('.loadBatch-select').css('opacity',1);
                if (tag < 3) {
                    $(this).parent().find("li").removeClass("sel");
                    $(this).addClass("sel");
                }
                for(var i=0;i<cls.length;i++){
                    var o=$("."+cls[i]).find(".sel");
                    $("." + cls[i] + "-span").text($(o).text()).attr("categoryId", $(o).attr("categoryId"));
                }
                var nowtag = parseInt($(this).parent().parent().attr("tag")) + 1;
                var cid = $(this).attr("categoryId");
                if (nowtag < 3) {
                    getFirstCategory(cid, nowtag)
                }
            });
        })
    }

    getFirstCategory(0, 0);




});