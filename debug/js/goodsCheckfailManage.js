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

            this.initBindEvent().initRequestData().initTableData();
        },

        /**
         * 初始化页面事件
         * @returns {goodsDataManageInit}
         */
        initBindEvent: function () {
            var own = this;

            $(".form-body").on("click", '.gcm-btn-search', function () {
                own.initRequestData().initTableData();
                $(".nav-pagination").off();
                return false;
            }).on('click', ".gcm-btn-reload", function () {
                derict(null,"goodsCheckfailManage","nochangeurl");
                return false;
            });

            return own;
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
                session.goods_showMyGoods_uptId = uptId;
                derict(this, "showMyGoods", "nochangeurl");
            });

            return this;
        },

        /**
         * 获取请求参数
         * @returns {goodsAuditManageInit}
         */
        initRequestData: function () {
            this.data =  {
                productName: $("#agencyName").val(),
                modelNumber: "",
                categoryId: "",
                subCategoryId: "",
                baseCategoryId: "",
                reviewStatus: "2",
                seriesName: "",
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
                    url: 'listProductInfoUpt',
                    urlParams: {
                        currentPage: page,
                        onePageCount: onePageCount()
                    },
                    list: true,
                    data: own.data,
                    success: function (data) {
                        $("[list-node]").remove();
                        $(".form-body").setPageData(data);
                        own.bingListEvent();
                    },
                    error: function (res) {}
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
                success: function (data) {
                    $("[list-node]").remove();
                    $(".form-body").setPageData(data);
                    own.bingListEvent();
                    own.paginationData(Math.ceil(data.countRecord / onePageCount()));
                },
                error: function (res) {}
            });
        }
    };

    goodsCheckfailManageInit.initData();

    // 回车搜索
    keyDown('.gam-btn-search');
});