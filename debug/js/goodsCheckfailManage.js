$(function () {

    var goodsCheckfailManageInit = {

        data: {},

        /**
         * 初始化总控制器
         */
        initData: function () {
            plumeLog("进入goodsCheckfailManage模板自定义js-" + plumeTime());

            $('#startDate').cxCalendar();
            $('#endDate').cxCalendar();

            setPageCount();
            tablecheckbox();

            this.initBindEvent().initRequestData(true).initTableData();
        },

        /**
         * 初始化页面事件
         * @returns {goodsDataManageInit}
         */
        initBindEvent: function () {
            var own = this;

            $(".search-block").on("click", '.gcm-btn-search', function () {
                own.initRequestData(false).initTableData();
                $(".nav-pagination").off();
                return false;
            }).on('click', ".gcm-btn-reload", function () {
                $.clearSearchData();
                derict(null, "goodsCheckfailManage", "nochangeurl");
                return false;
            });

            // 批量删除
            $('#operationBtn').on('click', 'button', function () {
                var checkId = [],
                    $check = $("table tbody input:checkbox");

                $.each($check, function (index, obj) {
                    var id = $(obj).attr('productId');
                    $(obj).prop('checked') && id && checkId.push(id);
                });

                checkId.length ? own.moreDelete(checkId) : popTips("您未选择商品", "warning");
            });

            // 回车搜索
            $(".search-block input[type=text]").on('focus', function () {
                key.keydownEnter('.gcm-btn-search');
            }).on('blur', function () {
                key.unkeydownEnter('.gcm-btn-search');
            });

            return own;
        },

        /**
         * 批量删除
         * @param productId
         */
        moreDelete: function (productId) {
            var own = this;

            var dataOperation = function (data) {
                data.ok ? (popTips('删除成功', "success"), own.initTableData()) : (
                    $('.pop').loadTemp("popTips", "nochangeurl", function () {
                        $(".pop").find(".popup-title").html("操作失败");
                        $(".pop").find(".popup-icon").html('<i class="warning"></i>');
                        $(".pop").find(".popup-info").html(data.resDescription);
                    }), own.initTableData()
                );
            };

            $.commonAjax({
                type: "get",
                url: 'delProductInfoUpt',
                data: {
                    uptIds: productId
                },
                traditional: true,
                success: function (data) {
                    dataOperation(data);
                },
                error: function (res) {
                }
            });
        },

        /**
         * 绑定table事件
         * @returns {goodsAuditManageInit}
         */
        bingListEvent: function () {
            $(".table-block").on("click", ".gcm-btn-edit", function () {
                session.goods_showMyGoods_uptId = $(this).attr("uptid");
                session.goods_showMyGoods_type = "amend";
                session.goods_showMyGoods_page = "goodsCheckfailManage";
                derict(this, "myGoods", "nochangeurl");
                return false;
            }).on("click", ".gcm-btn-show", function () {
                var uptId = $(this).attr("uptId");
                session.goods_detail_productId = uptId;
                session.goods_back_page = 'goodsCheckfailManage';
                session.goods_detail_type = false;
                derict(this, "showMyGoods", "nochangeurl");
            });

            return this;
        },

        /**
         * 获取请求参数
         * @param init
         * @returns {goodsCheckfailManageInit}
         */
        initRequestData: function (init) {
            this.data = {
                productName: $("#productName").val(),
                modelNumber: "",
                categoryId: "",
                subCategoryId: "",
                baseCategoryId: "",
                reviewStatus: "2",
                seriesName: "",
                startDate: $("#startDate").val(),
                endDate: $("#endDate").val()
            };

            !init && $.setSearchData(this.data);

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
                    url: 'listProductInfoUpt',
                    urlParams: {
                        currentPage: page,
                        onePageCount: onePageCount()
                    },
                    list: true,
                    data: own.data,
                    beforeSend: function () {
                        $("[list-node]").remove();
                    },
                    success: function (data) {
                        $(".form-body").setPageData(data);
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
                url: 'listProductInfoUpt',
                urlParams: {
                    currentPage: 1,
                    onePageCount: onePageCount()
                },
                list: true,
                data: own.data,
                beforeSend: function () {
                    $("[list-node]").remove();
                },
                success: function (data) {
                    if (!data.data || data.data.length === 0) {
                        return;
                    }
                    $(".form-body").setPageData(data);
                    own.bingListEvent();
                    own.paginationData(Math.ceil(data.countRecord / onePageCount()));
                },
                error: function (res) {
                }
            });
        }
    };

    goodsCheckfailManageInit.initData();
});