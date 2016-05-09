$(function () {
    plumeLog("进入childIdCreate模板自定义js-" + plumeTime());
    tablecheckbox();
    bindDelFunc();
    var _html = $(".cic-brand")[0].outerHTML;
    $(".cic-btn-add").bind("click", function () {
        $(".form-horizontal").append(_html);
        bindDelFunc();
    });
    function bindDelFunc() {
        $(".cic-btn-del").unbind().bind("click", function () {
            $(this).parent().parent().remove();
        });
    }
    $(".btn-back").bind("click", function () {
        derict(this, "idmanage", "nochangeurl");
    });
    $(".btn-myset").bind("click",function(){
        $(".cic-pop").pop("popAuth");
    });
});