$(function(){
	var len;
	var list
	$('.upload-btn-left').bind('click',leftEvent);
	$('.upload-btn-right').bind('click',rightEvent);
	$('.upload-btn-delect').bind('click',delectEvent);
	initialize()
	// 初始化	
	function initialize() {
		list = $('.goodsPic');
		len =list.length;
		list.first().addClass('first-upload-btn').find('.upload-btn-left').unbind('click',leftEvent);;
		list.last().addClass('last-upload-btn').find('.upload-btn-right').unbind('click',rightEvent);
	}
	
	// 左按钮事件
	function leftEvent() {
		var iIndex = $('.upload-btn-left').index($(this));
		if(iIndex == len-1) {
			$(this).siblings('.upload-btn-right').bind('click',rightEvent).parents('li').removeClass('last-upload-btn');
		}
		if(iIndex == 1) {
			list.first().removeClass('first-upload-btn').find('.upload-btn-left').bind('click',leftEvent);
		}
		$(this).parents('li').insertBefore($('.goodsPic').eq(iIndex-1));
		initialize();
	}

	//右按钮事件
	function rightEvent() {
		var iIndex = $('.upload-btn-right').index($(this));
		if(iIndex == 0) {
			$(this).siblings('.upload-btn-left').bind('click',leftEvent).parents('li').removeClass('first-upload-btn');
		}
		if(iIndex == len-2){
			list.last().removeClass('last-upload-btn').find('.upload-btn-right').bind('click',rightEvent)
		}

		$(this).parents('li').insertAfter($('.goodsPic').eq(iIndex+1));
		initialize();
	}

	//删除事件
	function delectEvent() {
		$(this).parents('li').remove();
		initialize();
	}

})