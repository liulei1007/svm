$(function () {
    plumeLog("进入userType模板自定义js-" + plumeTime());
    $(".type-first-span").text($(".type-first").find(".sel").text());
    $(".type-second-span").text($(".type-second").find(".sel").text());
    $(".type-third-span").text($(".type-third").find(".sel").text());
    $(".ut-btn-next").bind("click",function(){
        session.goods_userType=$(".type-first-span").text()+">"+$(".type-second-span").text()+">"+$(".type-third-span").text();
        derict(this, "createMyGoods", "nochangeurl");
    });
    var cls=["type-first","type-second","type-third"];
    function getFirstCategory(categoryId,tag){
        loading();
        $.get(plumeApi["listProductCategory"]+"/"+categoryId,{},function(data){
            unloading();
            $("."+cls[tag]).find("[list-node]").remove();
            $("."+cls[tag]).setPageData(data);
            $("."+cls[tag]).find("li").unbind().bind("click", function () {
                if(tag<3){
                    $(this).parent().find("li").removeClass("sel");
                    $(this).addClass("sel");
                    $("."+cls[tag]+"-span").text($(this).text());
                }
                var nowtag=parseInt($(this).parent().parent().attr("tag"))+1;
                var cid=$(this).attr("categoryId");
                if(nowtag<3){
                    getFirstCategory(cid,nowtag)
                }
            });
        })
    }
    getFirstCategory(0,0);

});