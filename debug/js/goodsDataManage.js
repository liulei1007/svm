$(function () {

    var goodsDataManageInit = {

        data: {},

        /**
         * 初始化页面事件
         * @returns {goodsDataManageInit}
         */
        initBindEvent: function () {
            var own = this;

            $('.search-block').on("click", '.gdm-btn-search', function () {
                own.initRequestData().initTableData();
                $(".nav-pagination").off();

                return false;
            }).on('click', '.gdm-btn-reload', function () {
                derict(null, "goodsDataManage", "nochangeurl");

                return false;
            });

            $('#operationBtn').on('click', 'button', function () {
                var checkId = [],
                    type = $(this).data('type'),
                    $check = $("table tbody input:checkbox");

                $.each($check, function (index, obj) {
                    var id = $(obj).attr('productId');
                    $(obj).prop('checked') && id && checkId.push(id);
                });

                checkId.length ? own.operationFun(checkId, type) : popTips("您未选择审核商品", "warning");
            });

            // 回车搜索
            $(".search-block input[type=text]").on('focus', function () {
                key.keydownEnter('.gdm-btn-search');

                return false;
            }).on('blur', function () {
                key.unkeydownEnter('.gdm-btn-search');

                return false;
            });

            return own;
        },

        /**
         * 分类信息
         * @returns {{categoryEvent: categoryEvent, getCategoryData: getCategoryData}}
         */
        getFirstCategory: function () {
            var $own = this,
                cls = ["gdm-type-first", "gdm-type-second", "gdm-type-third"];

            return {
                /**
                 * 绑定分类事件
                 * @param $cls
                 */
                categoryEvent: function ($cls) {
                    $cls.find("select").unbind().bind("change", function () {
                        var cid = $(this).val(),
                            nowTag = parseInt($(this).attr("tag")) + 1;

                        nowTag < 3 && $own.getFirstCategory().getCategoryData(cid, nowTag);

                        return false;
                    });
                },

                /**
                 * 获取分类信息
                 * @param categoryId
                 * @param tag
                 */
                getCategoryData: function (categoryId, tag) {
                    $.commonAjax({
                        url: 'listProductCategory',
                        type: 'get',
                        operationId: categoryId,
                        success: function (data) {
                            var $cls = $("." + cls[tag]);
                            $cls.find("[list-node]").remove();
                            tag == 1 && $("." + cls[tag + 1]).find("[list-node]").remove();
                            $cls.setPageData(data);
                            $own.getFirstCategory().categoryEvent($cls);
                        }
                    });
                }
            };
        },

        /**
         * 操作ajax请求
         * @param url
         * @param id
         * @param fun
         */
        listOperationAjax: function (url, id, fun) {
            var $own = this;
            $.commonAjax({
                url: url,
                type: "GET",
                operationId: id,
                success: function (data) {
                    typeof(fun) == "function" && fun(data);
                    $own.initTableData();
                }
            });
        },

        bingListEvent: function () {
            var $own = this;

            $('.gdm-btn-open').each(function () {
                $(this).attr("saleStatus") == 1 ? $(this).html('禁用') : $(this).html('启用');
            });

            $(".table-block").off().on("click", '.gdm-btn-show', function () {
                var productId = $(this).attr("productId");
                session.goods_detail_productId = productId;
                session.goods_back_page = 'goodsDataManage';
                derict(this, "showMyGoods", "nochangeurl");
                return false;
            }).on("click", '.gdm-btn-edit', function () {
                session.goods_showMyGoods_productId = $(this).attr("productId");
                session.goods_showMyGoods_type = "edit";
                session.goods_showMyGoods_page = "goodsDataManage";
                derict(this, "myGoods", "nochangeurl");
                return false;
            }).on("click", '.gdm-btn-copy', function () {
                session.goods_showMyGoods_productId = $(this).attr("productId");
                session.goods_showMyGoods_type = "copy";
                derict(this, "myGoods", "nochangeurl");
                return false;
            }).on("click", ".gdm-btn-open", function () {
                var own = this;
                if ($(this).attr("saleStatus") == 1) {
                    $own.listOperationAjax('disableSaleStatus', $(own).attr("productId"), function () {
                        $('.pop').loadTemp("popTips", "nochangeurl", function () {
                            $(".pop").find(".popup-title").html("已禁用");
                            $(".pop").find(".popup-icon").html('<i class="success"></i>');
                            $(".pop").find(".popup-info").html("禁用成功");
                        });
                    });
                } else {
                    $own.listOperationAjax('enableSaleStatus', $(own).attr("productId"), function () {
                        $(own).removeClass("gdm-off");
                        $('.pop').loadTemp("popTips", "nochangeurl", function () {
                            $(".pop").find(".popup-title").html("已启用");
                            $(".pop").find(".popup-icon").html('<i class="success"></i>');
                            $(".pop").find(".popup-info").html("启用成功");
                        });
                    });
                }
                return false;
            });

            return this;
        },

        /**
         * 获取请求参数
         * @returns {{productName: (*|jQuery), modelNumber: (*|jQuery), categoryId: (*|jQuery),
         *  subCategoryId: (*|jQuery), baseCategoryId: (*|jQuery), saleStatus: (*|jQuery), startDate: (*|jQuery), endDate: (*|jQuery)}}
         */
        initRequestData: function () {
            this.data = {
                productName: $("#productName").val(),
                modelNumber: $("#modelNumber").val(),
                categoryId: $("#categoryId").val(),
                subCategoryId: $("#subCategoryId").val(),
                baseCategoryId: $("#baseCategoryId").val(),
                saleStatus: $("#saleStatus").val(),
                startDate: $("#startDate").val(),
                endDate: $("#endDate").val()
            };

            $(".nav-pagination").off();

            return this;
        },

        /**
         * 翻页请求
         * @param requestData
         * @param totalPage
         */
        paginationData: function (totalPage) {
            var own = this;

            newPage(totalPage, function (page) {
                $.commonAjax({
                    type: "POST",
                    url: 'listProductInfo',
                    urlParams: {
                        currentPage: page,
                        onePageCount: onePageCount()
                    },
                    list: true,
                    data: own.data,
                    beforeSend: function () {
                        $(".gdm-table-data").find("[list-node]").remove();
                    },
                    success: function (data) {
                        $(".gdm-table-data").setPageData(data);
                        own.bingListEvent();
                    },
                    error: function (res) {
                    }
                });
            });
        },

        /**
         * 初始化列表数据
         */
        initTableData: function () {
            var own = this;
            $.commonAjax({
                type: "POST",
                url: 'listProductInfo',
                urlParams: {
                    currentPage: 1,
                    onePageCount: onePageCount()
                },
                list: true,
                data: own.data,
                beforeSend: function () {
                    $(".gdm-table-data").find("[list-node]").remove();
                },
                success: function (data) {
                    if (!data.data || data.data.length === 0) {
                        return;
                    }
                    $(".gdm-table-data").setPageData(data);
                    own.bingListEvent();
                    own.paginationData(Math.ceil(data.countRecord / onePageCount()));
                },
                error: function (res) {
                }
            });
        },

        operationFun: function (productId, type) {
            var own = this,
                message = type ? '开启成功' : '禁用成功';

            var dataOperation = function (data) {
                data.ok ? (popTips(message, "success"), own.initTableData()) : (
                    $('.pop').loadTemp("popTips", "nochangeurl", function () {
                        $(".pop").find(".popup-title").html("操作失败");
                        $(".pop").find(".popup-icon").html('<i class="warning"></i>');
                        $(".pop").find(".popup-info").html(data.resDescription);
                    }), own.initTableData()
                );
            };

            $.commonAjax({
                type: "get",
                url: 'moreEditSaleStatus',
                data: {
                    pids: productId
                },
                traditional: true,
                operationId: type,
                success: function (data) {
                    dataOperation(data);
                },
                error: function (res) {
                }
            });
        },

        /**
         * 总控制器
         */
        initData: function () {
            plumeLog("进入goodsDataManage模板自定义js-" + plumeTime());

            $('#startDate').cxCalendar();
            $('#endDate').cxCalendar();

            setPageCount();
            tablecheckbox();

            this.getFirstCategory().getCategoryData(0, 0);
            this.initBindEvent().initRequestData().initTableData();
        }
    };

    goodsDataManageInit.initData();
});