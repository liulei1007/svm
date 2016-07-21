$(function () {
    $(".close").bind("click", function() {
        $(this).parents(".alert").hide();
    });
    $(".btn-chooseSort").bind("click", function() {
    	$(".popSort").loadTemp("popUserType", "nochangeurl", function () {
            
        });
    });
    $(".btn-cancel").bind("click",function() {
    	$(".pop").hide();
    })

})