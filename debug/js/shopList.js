$(function() {
	getData();
	// 点击“申请直营店”
	$(".btn-create").on("click", function() {
		derict(this, "shopCreate", "nochangeurl");
	});

	function getData() {
		$.get(plumeApi["listShopInfo"],{},function(data){
			console.log(data);
		})
	}
});