$(function () {

    var goodsAuditManageInit = {

        data: {},

        /**
         * 初始化页面事件
         * @returns {goodsDataManageInit}
         */
        initBindEvent: function () {
            var $own = this;

            $('body').on("click", '.btn-audit', function () {
                var uptIds = [];
                uptIds.push($(this).attr("uptId"));
                auditFun(uptIds);
            });

            $('body').on('click', '.btn-allAudit', function () {
                var uptIds = [];
                $('tbody input:checkbox').each(function (i, checkbox) {
                    if ($(this).prop('checked') == true) {
                        uptIds.push($(this).parents('tr').attr('uptId'));
                    }
                });
                if (uptIds.length) {
                    auditFun(uptIds);
                } else {
                    popTips("您未选择审核商品", "warning");
                }
            });

            return $own;
        },

        /**
         * 获取分类信息
         * @param categoryId
         * @param tag
         */
        getFirstCategory: function (categoryId, tag) {
            var $own = this,
                cls = ["gdm-type-first", "gdm-type-second", "gdm-type-third"];

            $.get(plumeApi["listProductCategory"] + "/" + categoryId, {}, function (data) {
                var $cls = $("." + cls[tag]);
                $cls.find("[list-node]").remove();
                tag == 1 && $("." + cls[tag + 1]).find("[list-node]").remove();
                $cls.setPageData(data);
                $cls.find("select").unbind().bind("change", function () {
                    var cid = $(this).val(),
                        nowTag = parseInt($(this).attr("tag")) + 1;

                    nowTag < 3 && $own.getFirstCategory(cid, nowTag);
                });
            });
        },

        /**
         * 操作ajax请求
         * @param url
         * @param id
         * @param fun
         */
        operationAjax : function (url, id, fun) {
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

            $(".table-block").off().on("click", '.gdm-btn-edit', function () {
                session.goods_showMyGoods_productId = $(this).attr("productId");
                session.goods_showMyGoods_type = "edit";
                session.goods_showMyGoods_page = "goodsDataManage";
                derict(this, "myGoods", "nochangeurl");
            }).on("click", '.gdm-btn-copy', function () {
                session.goods_showMyGoods_productId = $(this).attr("productId");
                session.goods_showMyGoods_type = "copy";
                derict(this, "myGoods", "nochangeurl");
            }).on("click", ".gdm-btn-open", function () {
                var own = this;
                if ($(this).attr("saleStatus") == 1) {
                    $own.operationAjax('disableSaleStatus', $(own).attr("productId"), function () {
                        $('.pop').loadTemp("popTips", "nochangeurl", function () {
                            $(".pop").find(".popup-title").html("已禁用");
                            $(".pop").find(".popup-icon").html('<i class="success"></i>');
                            $(".pop").find(".popup-info").html("禁用成功");
                        });
                    });
                } else {
                    $own.operationAjax('enableSaleStatus', $(own).attr("productId"), function () {
                        $(own).removeClass("gdm-off");
                        $('.pop').loadTemp("popTips", "nochangeurl", function () {
                            $(".pop").find(".popup-title").html("已启用");
                            $(".pop").find(".popup-icon").html('<i class="success"></i>');
                            $(".pop").find(".popup-info").html("启用成功");
                        });
                    });
                }
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
                reviewStatus: '0',
                modelNumber: $("#modelNumber").val(),
                baseCategoryId: $("#baseCategoryId").val(),
                subCategoryId: $("#subCategoryId").val(),
                categoryId: $("#categoryId").val()
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
                    success: function (data) {
                        $(".gdm-table-data").find("[list-node]").remove();
                        $(".gdm-table-data").setPageData(data);
                        $own.bingListEvent().getFirstCategory(0, 0);
                    },
                    error: function (res) {}
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
                success: function (data) {
                    $(".gdm-table-data").find("[list-node]").remove();
                    $(".gdm-table-data").setPageData(data);
                    $own.bingListEvent();
                    $own.paginationData(Math.ceil(data.countRecord / onePageCount()));
                },
                error: function (res) {}
            });
        },

        /**
         * 总控制器
         */
        initData: function () {
            plumeLog("进入goodsAuditManage模板自定义js-" + plumeTime());

            this.getFirstCategory(0, 0);
            this.initBindEvent().initRequestData().initTableData();
        }
    };

    goodsAuditManageInit.initData();

    // 回车搜索
    keyDown('.gam-btn-search');
});