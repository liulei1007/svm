$(function(){
	plumeLog("进入groundGoods模板自定义js-"+plumeTime());
	$('.table-block').on('click','.btn-delect',function(){
		delectData(this);
	});
	$('.table-block').on('click','.btn-taking',function() {
		derict(this, "compileGoods", "nochangeurl");
	});

	function getTableData(){
		$.get("test/data.txt",function(data){
			data=$.parseJSON(data);
			$(".table-block").setPageData(data);

			

		});
	}
	getTableData()
})

