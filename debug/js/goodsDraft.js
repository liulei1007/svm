$(function () {

    var goodsDraftInit = {

        /**
         * 初始化总控制器
         */
        initData: function () {
            plumeLog("进入goodsDraft模板自定义js-" + plumeTime());

            $('#startDate').cxCalendar();
            $('#endDate').cxCalendar();

            setPageCount();
            tablecheckbox();

            this.initBindEvent().initRequestData().initTableData();
        },

        /**
         * 初始化页面事件
         * @returns {goodsDataManageInit}
         */
        initBindEvent: function () {
            var own = this;

            $(".search-block").on("click", '.gdm-btn-search', function () {
                own.initRequestData().initTableData();
                $(".nav-pagination").off();
                return false;
            }).on('click', ".gdm-btn-reload", function () {
                derict(null, "goodsDraft", "nochangeurl");
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
                key.keydownEnter('.gdm-btn-search');
            }).on('blur', function () {
                key.unkeydownEnter('.gdm-btn-search');
            });

            return own;
        },

        initRequestData: function () {
            this.data = {
                "page": 1,
                "limit": onePageCount(),
                'productName': $("#productName").val(),
                'startDate': $("#startDate").val(),
                'endDate': $("#endDate").val()
            };

            return this;
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
                url: 'moreDelete',
                data: {
                    ids: productId
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
            $(".table-block").on("click", ".gda-btn-edit", function () {
                session.goods_code = $(this).attr("code");
                session.goods_showMyGoods_productId = $(this).attr("productId");
                session.goods_showMyGoods_type = "draft";
                session.goods_showMyGoods_page = "goodsDraft";
                derict(this, "myGoods", "nochangeurl");
                return false;
            });

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
                own.data.page = page;
                $.commonAjax({
                    type: "POST",
                    url: 'listDraft',
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
                url: 'listDraft',
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
        }
    };

    goodsDraftInit.initData();

});