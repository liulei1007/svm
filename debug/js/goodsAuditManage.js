$(function () {
    setPageCount();
    var goodsAuditManageInit = {

        data: {},

        /**
         * 初始化页面事件
         * @returns {goodsDataManageInit}
         */
        initBindEvent: function () {
            var $own = this;

            $('.form-body').on('click', '.gam-btn-search', function () {
                $own.initRequestData().initTableData();
                $(".nav-pagination").off();
                return false;
            }).on('click', ".gam-btn-reload", function () {
                derict(null, "goodsAuditManage", "nochangeurl");
                return false;
            }).on('click', '.btn-allAudit', function () {
                var uptIds = [];
                $('tbody input:checkbox').each(function (i, checkbox) {
                    i != 0 && $(this).prop('checked') == true && uptIds.push($(this).parents('tr').attr('uptId'));
                });
                uptIds.length ? $own.auditFun(uptIds) : popTips("您未选择审核商品", "warning");

                return false;
            });

            // 回车搜索
            $(".search-block input[type=text]").on('focus', function () {
                key.keydownEnter('.gam-btn-search');
            }).on('blur', function () {
                key.unkeydownEnter('.gam-btn-search');
            });

            return $own;
        },

        auditFun: function (uptIds) {
            var $own = this;

            var dataOperation = function (data) {
                data.ok ? (
                    popTips("审核成功", "success"), $own.initTableData()
                ) : (
                    $('.pop').loadTemp("popTips", "nochangeurl", function () {
                        $(".pop").find(".popup-title").html("审核失败");
                        $(".pop").find(".popup-icon").html('<i class="warning"></i>');
                        $(".pop").find(".popup-info").html(data.resDescription);
                    }), $own.initTableData()
                );
            };

            $('.pop').loadTemp("popAudit", "nochangeurl", function () {
                $('.pop').on('click', '.btn-sure', function () {
                    $.commonAjax({
                        url: 'reviewProductInfo',
                        type: "POST",
                        data: {
                            "uptIds": uptIds,
                            "reviewStatus": $('.reviewStatus').find("input[name='audit']:checked").val(),
                            "remark": $('.remark').val()
                        },
                        success: function (data) {
                            dataOperation(data);
                        }
                    });
                    $('.pop').hide();
                    $('.pop').off('click', '.btn-sure');
                    $('.pop').off('click', '.btn-cancel');

                    return false;
                }).on('click', '.btn-cancel', function () {
                    $('.pop').hide();
                    $('.pop').off('click', '.btn-sure');
                    $('.pop').off('click', '.btn-cancel');

                    return false;
                });
            });
        },

        /**
         * 分类信息
         * @returns {{categoryEvent: categoryEvent, getCategoryData: getCategoryData}}
         */
        getFirstCategory: function () {
            var $own = this,
                cls = ["gam-type-first", "gam-type-second", "gam-type-third"];

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

        bingListEvent: function () {
            var $own = this;

            $(".table-block").off().on("click", '.gam-btn-show', function () {
                var uptId = $(this).attr("uptId");
                session.goods_detail_productId = uptId;
                session.goods_back_page = 'goodsAuditManage';
                session.goods_detail_type = false;
                derict(this, "showMyGoods", "nochangeurl");
                return false;
            }).on('click', '.btn-audit', function () {
                var uptIds = [];
                uptIds.push($(this).attr("uptId"));
                $own.auditFun(uptIds);
                return false;
            });

            return this;
        },

        /**
         * 获取请求参数
         * @returns {goodsAuditManageInit}
         */
        initRequestData: function () {
            this.data = {
                productName: $("#agencyName").val(),
                reviewStatus: '0',
                modelNumber: $("#modelNumber").val(),
                baseCategoryId: $("#baseCategoryId").val(),
                subCategoryId: $("#subCategoryId").val(),
                categoryId: $("#categoryId").val(),
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
            var $own = this;

            newPage(totalPage, function (page) {
                $.commonAjax({
                    type: "POST",
                    url: 'listProductInfoUpt',
                    urlParams: {
                        currentPage: page,
                        onePageCount: onePageCount()
                    },
                    list: true,
                    data: $own.data,
                    beforeSend: function () {
                        $(".gam-table").find("[list-node]").remove();
                    },
                    success: function (data) {
                        $(".gam-table").setPageData(data);
                        $own.bingListEvent();
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
            var $own = this;
            $.commonAjax({
                type: "POST",
                url: 'listProductInfoUpt',
                urlParams: {
                    currentPage: 1,
                    onePageCount: onePageCount()
                },
                list: true,
                data: $own.data,
                beforeSend: function () {
                    $(".gam-table").find("[list-node]").remove();
                },
                success: function (data) {
                    if (!data.data || data.data.length === 0) {
                        return;
                    }

                    $(".gam-table").setPageData(data);

                    $own.bingListEvent();
                    $own.paginationData(Math.ceil(data.countRecord / onePageCount()));
                },
                error: function (res) {
                }
            });
        },

        /**
         * 总控制器
         */
        initData: function () {
            plumeLog("进入goodsAuditManage模板自定义js-" + plumeTime());

            $('#startDate').cxCalendar();
            $('#endDate').cxCalendar();

            setPageCount();
            tablecheckbox();

            this.getFirstCategory().getCategoryData(0, 0);
            this.initBindEvent().initRequestData().initTableData();
        }
    };

    goodsAuditManageInit.initData();
});