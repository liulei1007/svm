$(function(){
    // var groundGoods={
    //     //初始化数据
    //     data: {},

    //     //事件绑定
    //     bindEvent: function() {
    //         $('.table-block').on('click','.btn-delect',function(){
    //         getGoodsPsgId(this);
    //         delectGoodsData();
    //     });

    //     $('.table-block').on('click','.btn-compile',function() {
    //         getGoodsPsgId(this);
    //         derict(this, "compileGoods", "nochangeurl");
    //     });

    //     $('.table-block').on('click','.btn-ground',function() {
    //         getGoodsPsgId(this);
    //         if($(this).html()=="上架"){
    //             groundGoods() 
    //         }else{
    //             soldOutGoods()
    //         }
    //     });

    //     $(".btn-all-ground").on('click',function() {
    //         groundGoods();
    //     });

    //     $(".btn-all-unGround").on('click',function() {
    //         soldOutGoods();
    //     });

 
    //     $(".btn-all-delect").on('click',function() {
    //         delectGoodsData()
    //     })

    //      //清空搜索
    //     $('.btn-empty').bind('click', function() {
    //         window.location.reload();
    //     });

    //     //回车搜索
    //     $(".search-block input[type=text]").bind('focus',function() {
    //        key.keydownEnter('.btn-search');   
    //     });

    //     $(".search-block input[type=text]").bind('blur',function() {
    //        key.unkeydownEnter('.btn-search');   
    //     });  
    //     },

    //     groundGoodsController: function() {
    //         this.bindEvent()
    //     }
    // }

    // groundGoods.groundGoodsController() 
    
    datas={
		  "productName": "",
		  "modelNumber": "",
		  "saleStatus": ""
		 }
	tablecheckbox();
	plumeLog("进入groundGoods模板自定义js-"+plumeTime());
	$('.table-block').on('click','.btn-delect',function(){
		getGoodsPsgId(this);
		delectGoodsData();
	});
	$('.table-block').on('click','.btn-compile',function() {
		getGoodsPsgId(this);
		derict(this, "compileGoods", "nochangeurl");
	});
	$('.table-block').on('click','.btn-ground',function() {
		getGoodsPsgId(this);
		if($(this).html()=="上架"){
			 	groundGoods() 
			}else{
				soldOutGoods()
			}
	});

    $(".btn-all-ground").on('click',function() {
       groundGoods();
    });

     $(".btn-all-unGround").on('click',function() {
       soldOutGoods();
    });

 
     $(".btn-all-delect").on('click',function() {
        delectGoodsData()
     })

	var nowPage =1;
	getGoodsData();
	$('.btn-search').bind('click',function() {
		datas.productName=$('#productName').val();
		datas.modelNumber=$('#modelNumber').val();
		datas.saleStatus=$('#saleStatus').val();
		getGoodsData();
        $(".nav-pagination").off();
	})

	//上下架商品列表

function getGoodsData() {
    loading();
    var newData = JSON.stringify(datas)
    $.ajax({
        url: plumeApi["listProductShopGoods"]+"?currentPage=1&onePageCount="+onePageCount(),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        data: newData,
        success: function (data) {
            unloading();
            $("[list-node]").remove();
            $(".table-block").setPageData(data);
            filter();

            totalPage=Math.ceil(data.countRecord/onePageCount());
			newPage(totalPage,function(i){
			var newData = JSON.stringify(datas);
            loading();
			$.ajax({
				url: plumeApi["listProductShopGoods"]+"?currentPage="+i+"&onePageCount="+onePageCount(),
				type: "POST",
				data: newData,
				dataType: "json",
				contentType: "application/json; charset=utf-8",
				success: function(data) {
					 unloading();
                    $("[list-node]").remove();
                    $(".table-block").setPageData(data);
            	    filter();
				},
				});
			});


        }
    });
}

//选择过滤
function selectFilter() {
    var psgIdArr = [];
    $(".table-block input:checked").parents("tr").each(function(i,sel) {
         psgIdArr.push($(sel).attr("psgId"));
    });
   return psgIdArr;
}




//商品上架
function groundGoods() {
    var psgIds={"psgIds":selectFilter()}
    loading();
    $.ajax({
        url: plumeApi["editSaleStatus"]+"/1",
        type: "GET",
        data:psgIds,
        traditional:true,
        success: function (data) {
            if (data.ok) {
                unloading();
                popTips("上架成功", "success");
                getGoodsData();
            } else {
                unloading();
                popTips("上架失败", "warning");
                getGoodsData();
            }
        }
    });
}

//商品下架
function soldOutGoods() {
    var psgIds={"psgIds":selectFilter()}
    loading();
    $.ajax({
        url: plumeApi["editSaleStatus"]+"/0",
        type: "GET",
        data:psgIds,
        traditional:true,
        success: function (data) {
            if (data.ok) {
                unloading();
                popTips("下架成功", "success");
                getGoodsData();
              
            } else {
                unloading();
                popTips("下架失败", "warning");
                getGoodsData();
            }
        }
    });
}


//信息过滤
	function filter() {
        $(".saleStatus").each(function(i,status) {
            if(i>0){
                if($(status).html()==0){
                    $(status).html("下架中");
                }else{
                    $(status).html("上架中");
                }
            }
        }) 
         
	}

//删除商品数据
function delectGoodsData() {
     var psgIds={"psgIds":selectFilter()}
    $('.pop').loadTemp("popConfirm", "nochangeurl", function () {
        // 改变弹出框中文字和图标显示
        $(".pop").find(".popup-title").html("删除确认？");
        $(".pop").find(".popup-icon").html('<i class="warning"></i>');
        $(".pop").find(".popup-info").html("是否确认删除记录？");
        $(".pop").find(".btn-sure").addClass("btn-danger").removeClass("btn-success");
        // 绑定按钮事件
        $('.pop').on('click', '.btn-sure', function () {
            loading();
            $.ajax({
                url: plumeApi["delProductShopGoods"],
                type: "GET",
                data:psgIds,
                traditional:true,
                success: function (data) {
                    if (data.ok) {
                        unloading();
                        popTips("删除成功", "success");
                        getGoodsData();
                    } else {
                        unloading();
                        popTips("删除失败", "warning");
                        getGoodsData();
                    }
                }
            });
            $('.pop').hide();
            $('.pop').off('click', '.btn-sure');
            $('.pop').off('click', '.btn-cancel');
        });
        $('.pop').on('click', '.btn-cancel', function () {
            $('.pop').hide();
            $('.pop').off('click', '.btn-sure');
            $('.pop').off('click', '.btn-cancel');
        });
    });
}



//清空搜索
    $('.btn-empty').bind('click', function() {
        window.location.reload();
    });

//回车搜索
    $(".search-block input[type=text]").bind('focus',function() {
       key.keydownEnter('.btn-search');   
    });

    $(".search-block input[type=text]").bind('blur',function() {
       key.unkeydownEnter('.btn-search');   
    }); 
    
});

