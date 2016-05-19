// var login_move = {
//     testmove: function () {
//         $(".icons").each(function () {
//             var p = login_move.getPram();
//             var h = $(this).height();
//             var w = $(this).width();
//             var t = $(this).position().top;
//             var l = $(this).position().left;
//             console.log(h);
//             $(this).animate({
//                 "height": h * p.size,
//                 "width": w * p.size,
//                 "left":l+ p.left,
//                 "top":t+ p.top
//             },2000,"linear",function(){
//                 login_move.testmove();
//             })
//         });
//     },
//     random: function (min, max) {
//         return parseFloat(Math.random() * (max - min + 1) + min);
//     },
//     getPram: function () {
//         var p = {};
//         p.size = parseInt(login_move.random(1,1));
//         p.top = parseInt(login_move.random(-20, 20));
//         p.left = parseInt(login_move.random(-20, 20));
//         return p;
//     }
// }
$(function () {
    plumeLog("进入login模板自定义js-" + plumeTime());

    // login_move.testmove();

});



