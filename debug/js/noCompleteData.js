$(function () {

    var noCompleteDataInit = {

        data: {},

        /**
         * 初始化总控制器
         */
        initData: function () {
            plumeLog("进入noCompleteData模板自定义js-" + plumeTime());

            $('#startDate').cxCalendar();
            $('#endDate').cxCalendar();

            setPageCount();

            this.getFirstCategory().getCategoryData(0, 0);
            this.initBindEvent().initRequestData().initTableData();
        },

        /**
         * 初始化页面事件
         * @returns {goodsDataManageInit}
         */
        initBindEvent: function () {
            var own = this;

            $('.search-block').on('click', '.ncd-btn-search', function () {
                own.initRequestData().initTableData();
                $(".nav-pagination").off();

                return false;
            }).on('click', ".ncd-btn-reload", function () {
                derict(null, "noCompleteData", "nochangeurl");

                return false;
            });

            // 回车搜索
            $(".search-block input[type=text]").on('focus', function () {
                key.keydownEnter('.ncd-btn-search');
            }).on('blur', function () {
                key.unkeydownEnter('.ncd-btn-search');
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
                categoryEvent: function ($cls) {
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

        deleteData: function (uptId) {
            $.commonAjax({
                url: 'delProductInfoUpt',
                type: "GET",
                operationId: uptId,
                success: function (data) {
                    if (data.ok) {
                        $('.pop').loadTemp("popTips", "nochangeurl", function () {
                            $(".pop").find(".popup-title").html("信息提示");
                            $(".pop").find(".popup-icon").html('<i class="success"></i>');
                            $(".pop").find(".popup-info").html("删除成功");
                        });
                        $("[list-node]").remove();
                        this.initRequestData().initTableData();
                    } else {
                        $('.pop').loadTemp("popTips", "nochangeurl", function () {
                            $(".pop").find(".popup-title").html("信息提示");
                            $(".pop").find(".popup-icon").html('<i class="warning"></i>');
                            $(".pop").find(".popup-info").html("删除失败");
                        });
                    }
                }
            });
        },

        bingListEvent: function () {
            var own = this;

            $(".table-block").off().on('click', '.btn-link-edit', function () {
                session.goods_showMyGoods_uptId = $(this).attr("uptid");
                session.goods_showMyGoods_type = "amend";
                derict(this, "myGoods", "nochangeurl");

                return false;
            }).on('click', '.btn-link-delete', function () {
                var uptId = $(this).attr("uptId");
                $('.pop').loadTemp("popConfirm", "nochangeurl", function () {
                    // 改变弹出框中文字和图标显示
                    var $pop = $(".pop");
                    $pop.find(".popup-title").html("删除确认？");
                    $pop.find(".popup-icon").html('<i class="warning"></i>');
                    $pop.find(".popup-info").html("是否确认删除记录？");
                    $pop.find(".btn-sure").addClass("btn-danger").removeClass("btn-success");
                    // 绑定按钮事件
                    $pop.on('click', '.btn-sure', function () {
                        own.deleteData(uptId);
                        $pop.hide();
                        $pop.off('click', '.btn-sure');
                        $pop.off('click', '.btn-cancel');

                        return false;
                    }).on('click', '.btn-cancel', function () {
                        $pop.hide();
                        $pop.off('click', '.btn-sure');
                        $pop.off('click', '.btn-cancel');

                        return false;
                    });
                });
            });

            return this;
        },

        /**
         * 获取请求参数
         * @returns {goodsAuditManageInit}
         */
        initRequestData: function () {
            this.data = {
                productName: $("#productName").val(),
                modelNumber: "",
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
            var own = this;

            newPage(totalPage, function (page) {
                $.commonAjax({
                    type: "POST",
                    url: 'listToBePerfectProductInfo',
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
                url: 'listToBePerfectProductInfo',
                urlParams: {
                    currentPage: 1,
                    onePageCount: onePageCount()
                },
                list: true,
                data: own.data,
                success: function (data) {
                    $(".table-block").find("[list-node]").remove();
                    $(".table-block").setPageData(data);

                    data.countRecord ? $('.infoNum').text(data.countRecord) : $('.infoNum').parent('div').remove();

                    own.bingListEvent();
                    own.paginationData(Math.ceil(data.countRecord / onePageCount()));
                },
                error: function (res) {
                }
            });
        }
    };

    noCompleteDataInit.initData();
});