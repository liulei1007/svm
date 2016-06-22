$(function () {

    var goodsDraftInit = {

        limit: onePageCount(),

        startDate: '',

        endDate: '',

        productName: '',

        /**
         * 初始化总控制器
         */
        initData: function () {
            plumeLog("进入goodsDraft模板自定义js-" + plumeTime());

            $('#startDate').cxCalendar();
            $('#endDate').cxCalendar();

            setPageCount();
            tablecheckbox();

            this.initBindEvent().initTableData();
        },

        /**
         * 初始化页面事件
         * @returns {goodsDataManageInit}
         */
        initBindEvent: function () {
            var own = this;

            $("body").on("click", '.gdm-btn-search', function () {
                own.page = 1;
                own.productName = $('#productName').val();
                own.startDate = $('#startDate').val();
                own.endDate = $('#endDate').val();
                own.initTableData();
                $(".nav-pagination").off();
            }).on('click', ".gdm-btn-reload", function () {
                derict(null, "goodsDraft", "nochangeurl");
            });

            return own;
        },

        /**
         * 绑定table事件
         * @returns {goodsAuditManageInit}
         */
        bingListEvent: function () {
            $(".table-block").on("click", ".gda-btn-edit", function () {
                session.goods_code = $(this).attr("code");
                session.goods_showMyGoods_type = "draft";
                session.goods_showMyGoods_page = "goodsDraft";
                derict(this, "myGoods", "nochangeurl");
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
                own.page = page;
                $.commonAjax({
                    type: "POST",
                    url: 'listDraft',
                    list: true,
                    data: {
                        "page": page,
                        "limit": own.limit,
                        'productName': own.productName,
                        'startDate': own.startDate,
                        'endDate': own.endDate
                    },
                    success: function (data) {
                        $(".gdm-table-data").find("[list-node]").remove();
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
                data: {
                    "page": 1,
                    "limit": own.limit,
                    'productName': own.productName,
                    'startDate': own.startDate,
                    'endDate': own.endDate
                },
                success: function (data) {
                    $(".gdm-table-data").find("[list-node]").remove();
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

    // 回车搜索
    keyDown('.gam-btn-search');
});