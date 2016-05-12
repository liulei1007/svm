$(function () {
    plumeLog("进入userType模板自定义js-" + plumeTime());
    $(".type-first-span").text($(".type-first").find(".sel").text());
    $(".type-second-span").text($(".type-second").find(".sel").text());
    $(".type-third-span").text($(".type-third").find(".sel").text());
    $(".type-first,.type-second,.type-third").find("li").bind("click", function () {
        var tag=$(this).parent().parent().attr("tag");
        $(this).parent().find("li").removeClass("sel");
        $(this).addClass("sel");
        $("."+tag+"-span").text($(this).text());
    });
    $(".ut-btn-next").bind("click",function(){
        session.goods_userType=$(".type-first-span").text()+">"+$(".type-second-span").text()+">"+$(".type-third-span").text();
        derict(this, "createMyGoods", "nochangeurl");
    });
});