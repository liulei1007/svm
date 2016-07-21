$(function() {
    plumeLog("进入reviewShowPersonal模板自定义js-"+plumeTime());
    $(".btn-back").bind("click",function(){
        derict(this,"reviewList","nochangeurl");
    });
});