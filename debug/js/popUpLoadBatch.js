$(function () {
    $(".close").bind("click", function() {
        $(this).parents(".alert").hide();
    });
    $(".btn-chooseSort").bind("click", function() {
    	$(".popSort").loadTemp("popUserType", "nochangeurl", function () {
            // $(".pop").find(".popup-title").html("已禁用");
            // $(".pop").find(".popup-icon").html('<i class="success"></i>');
            // $(".pop").find(".popup-info").html("禁用成功");
        });
    })
})