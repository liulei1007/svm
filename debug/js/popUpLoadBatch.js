$(function () {
    $(".close").bind("click", function() {
        $(this).parents(".alert").hide();
    });
})