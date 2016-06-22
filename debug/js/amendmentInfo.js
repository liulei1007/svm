$(function () {

    var amendmentInfoInit = {

        data: {},

        /**
         * 初始化总控制器
         */
        initData: function () {
            plumeLog("进入amendmentInfo模板自定义js-" + plumeTime());

            $('#startDate').cxCalendar();
            $('#endDate').cxCalendar();

            setPageCount();
            tablecheckbox();

            this.getFirstCategory().getCategoryData(0, 0);
            this.initBindEvent().initRequestData().initTableData();
        },

        /**
         * 初始化页面事件
         * @returns {goodsDataManageInit}
         */
        initBindEvent: function () {
            var own = this;

            $('body').on('click', '.adi-btn-search', function () {
                own.initRequestData().initTableData();
                $(".nav-pagination").off();

                return false;
            }).on('click', ".adi-btn-reload", function () {
                derict(null,"amendmentInfo","nochangeurl");

                return false;
            });

            return own;
        },

        /**
         * 分类信息
         * @returns {{categoryEvent: categoryEvent, getCategoryData: getCategoryData}}
         */
        getFirstCategory: function () {
            var own = this,
                cls = ["gdm-type-first", "gdm-type-second", "gdm-type-third"];

            return {
                /**
                 * 绑定分类事件
                 * @param $cls
                 */
                categoryEvent : function ($cls) {
                    $cls.find("select").unbind().bind("change", function () {
                        var cid = $(this).val(),
                            nowTag = parseInt($(this).attr("tag")) + 1;

                        nowTag < 3 && own.getFirstCategory().getCategoryData(cid, nowTag);

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
                            own.getFirstCategory().categoryEvent($cls);
                        }
                    });
                }
            };
        },

        bingListEvent: function () {
            $(".table-block").off().on("click", '.ai-btn-show', function () {
                var uptId = $(this).attr("uptId"),
                    productId = $(this).attr("productId");

                session.goods_showMyGoods_uptId = uptId;
                session.goods_showMyGoods_productId = productId;
                derict(this, "feedMyGoods", "nochangeurl");

                return false;
            });

            return this;
        },

        /**
         * 获取请求参数
         * @returns {goodsAuditManageInit}
         */
        initRequestData: function () {
            this.data =  {
                productName: $("#productName").val(),
                modelNumber: '',
                categoryId: $("#categoryId").val(),
                subCategoryId: $("#subCategoryId").val(),
                baseCategoryId: $("#baseCategoryId").val(),
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
            var own= this;

            newPage(totalPage, function (page) {
                $.commonAjax({
                    type: "POST",
                    url: 'listErrorFeedbackProductInfo',
                    urlParams: {
                        currentPage: page,
                        onePageCount: onePageCount()
                    },
                    list: true,
                    data: own.data,
                    success: function (data) {
                        $(".table-block").find("[list-node]").remove();
                        $(".table-block").setPageData(data);
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
                url: 'listErrorFeedbackProductInfo',
                urlParams: {
                    currentPage: 1,
                    onePageCount: onePageCount()
                },
                list: true,
                data: own.data,
                success: function (data) {
                    $(".table-block").find("[list-node]").remove();
                    $(".table-block").setPageData(data);

                    data.countRecord ? $('.infoNum').text(data.countRecord): $('.infoNum').text('0');

                    own.bingListEvent();
                    own.paginationData(Math.ceil(data.countRecord / onePageCount()));
                },
                error: function (res) {}
            });
        }
    };

    amendmentInfoInit.initData();

    // 回车搜索
    keyDown('.gam-btn-search');
});