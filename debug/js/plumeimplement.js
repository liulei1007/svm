function pageInit(){
    plumeLog("初始化plume-pageInit-"+plumeTime());
}
//--index模板初始化函数
function index_init(){
    plumeLog("初始化index-"+plumeTime());
    plumeUtil.js(plumePath+"/js/index.js");
    plumeLog("完成index模板加载-"+plumeTime());
}
//--index模板初始化函数
function login_init(){
    plumeLog("初始化index-"+plumeTime());
    plumeUtil.js(plumePath+"/js/login.js");
    plumeLog("完成index模板加载-"+plumeTime());
}
//--test模板初始化函数--
function test_init(){
    plumeLog("初始化test模板-"+plumeTime());
    plumeUtil.js(plumePath+"/js/test.js");
    plumeLog("完成test模板加载-"+plumeTime());
}
//--test1模板初始化函数--
function test1_init(){
    plumeLog("初始化test1模板-"+plumeTime());
    plumeUtil.js(plumePath+"/js/test1.js");
    plumeLog("完成test1模板加载-"+plumeTime());
}
//--transmit模板初始化函数--
function transmit_init(){
    plumeLog("初始化transmit模板-"+plumeTime());
    plumeUtil.js(plumePath+"/js/transmit.js");
    plumeLog("完成transmit模板加载-"+plumeTime());
}
//--welcome模板初始化函数--
function welcome_init(){
    plumeLog("初始化welcome模板-"+plumeTime());
    plumeUtil.js(plumePath+"/js/welcome.js");
    plumeLog("完成welcome模板加载-"+plumeTime());
}
//--table模板初始化函数--
function table_init(){
    plumeLog("初始化table模板-"+plumeTime());
    plumeUtil.js(plumePath+"/js/table.js");
    plumeLog("完成table模板加载-"+plumeTime());
}

//--seriesManage模板初始化函数--
function seriesManage_init(){
    plumeLog("初始化seriesManage模板-"+plumeTime());
    plumeUtil.js(plumePath+"/js/seriesManage.js");
    plumeLog("完成seriesManage模板加载-"+plumeTime());
}
//--goodsDataManage模板初始化函数--
function goodsDataManage_init(){
    plumeLog("初始化goodsDataManage模板-"+plumeTime());
    plumeUtil.js(plumePath+"/js/goodsDataManage.js");
    plumeLog("完成goodsDataManage模板加载-"+plumeTime());
}
//--goodsAuditManage模板初始化函数--
function goodsAuditManage_init(){
    plumeLog("初始化goodsAuditManage模板-"+plumeTime());
    plumeUtil.js(plumePath+"/js/goodsAuditManage.js");
    plumeLog("完成goodsAuditManage模板加载-"+plumeTime());
}
//--addGoodsData模板初始化函数--
function addGoodsData_init(){
    plumeLog("初始化addGoodsData模板-"+plumeTime());
    plumeUtil.js(plumePath+"/js/addGoodsData.js");
    plumeLog("完成addGoodsData模板加载-"+plumeTime());
}
//--batchlead模板初始化函数--
function batchlead_init(){
    plumeLog("初始化batchlead模板-"+plumeTime());
    plumeUtil.js(plumePath+"/js/batchlead.js");
    plumeLog("完成batchlead模板加载-"+plumeTime());
}
//--noCompleteData模板初始化函数--
function noCompleteData_init(){
    plumeLog("初始化noCompleteData模板-"+plumeTime());
    plumeUtil.js(plumePath+"/js/noCompleteData.js");
    plumeLog("完成noCompleteData模板加载-"+plumeTime());
}
//--basicDataManagement7模板初始化函数--
function amendmentInfo_init(){
    plumeLog("初始化amendmentInfo模板-"+plumeTime());
    plumeUtil.js(plumePath+"/js/amendmentInfo.js");
    plumeLog("完成amendmentInfo模板加载-"+plumeTime());
}
//--takingGoodsData模板初始化函数--
function takingGoodsData_init(){
    plumeLog("初始化takingGoodsData模板-"+plumeTime());
    plumeUtil.js(plumePath+"/js/paginationControl.js");
    plumeUtil.js(plumePath+"/js/takingGoodsData.js");
    plumeLog("完成takingGoodsData模板加载-"+plumeTime());
}

function takingGoods_init(){
    plumeLog("初始化takingGoods模板-"+plumeTime());
    plumeUtil.js(plumePath+"/js/takingGoods.js");
    plumeLog("完成takingGoods模板加载-"+plumeTime());
}
//--groundGoods模板初始化函数--
function groundGoods_init(){
    plumeLog("初始化groundGoods模板-"+plumeTime());
    plumeUtil.js(plumePath+"/js/paginationControl.js");
    plumeUtil.js(plumePath+"/js/groundGoods.js");
    plumeLog("完成groundGoods模板加载-"+plumeTime());
}
//--applySeries模板初始化函数--
function applySeries_init(){
    plumeLog("初始化applySeries模板-"+plumeTime());
    plumeUtil.js(plumePath+"/js/applySeries.js");
    plumeLog("完成applySeries模板加载-"+plumeTime());
}
function agencyList_init() {
    plumeUtil.js(plumePath+"/js/operatePop.js");
    plumeUtil.js(plumePath+"/js/agencyList.js");
}
function agencyShowCompany_init() {
    plumeUtil.js(plumePath+"/js/agencyShowCompany.js");
}
function agencyCreate_init() {
    plumeUtil.js(plumePath+"/js/agencyCreate.js");
}
function factoryCreate_init() {
    plumeUtil.js(plumePath+"/js/factoryCreate.js");
}
function agencyCreateCompany_init() {
    plumeUtil.js(plumePath+"/js/agencyCreateCompany.js");
}
function agencyCreatePersonal_init() {
    plumeUtil.js(plumePath+"/js/agencyCreatePersonal.js");
}
function agencyShowCompany_init() {
    plumeUtil.js(plumePath+"/js/agencyShowCompany.js");
}
function agencyShowPersonal_init() {
    plumeUtil.js(plumePath+"/js/agencyShowPersonal.js");
}
function agencyAddAccount_init() {
    plumeUtil.js(plumePath+"/js/agencyAddAccount.js");
}

function shopList_init() {
    plumeUtil.js(plumePath+"/js/shopList.js");
}

function shopListAgency_init() {
    plumeUtil.js(plumePath+"/js/shopList-agency.js");
}
function shopShowAgency_init() {
    plumeUtil.js(plumePath+"/js/shopShow-agency.js");
}
function shopCreateAgency_init() {
    console.log("yes")
    plumeUtil.js(plumePath+"/js/shopCreate-agency.js");
}

// ----弹出框----
function popTips_init() {
    plumeUtil.js(plumePath+"/js/popTips.js");
}

// ----弹出框----
function popUpLoadBatch_init() {
    plumeUtil.js(plumePath+"/js/popUpLoadBatch.js");
}

//--idmanage模板初始化函数--
function idmanage_init(){
    plumeLog("初始化idmanage模板-"+plumeTime());
    plumeUtil.js(plumePath+"/js/idmanage.js");
    plumeLog("完成idmanage模板加载-"+plumeTime());
}
//--msgmanage模板初始化函数--
function msgmanage_init(){
    plumeLog("初始化msgmanage模板-"+plumeTime());
    plumeUtil.js(plumePath+"/js/msgmanage.js");
    plumeLog("完成msgmanage模板加载-"+plumeTime());
}
//--changepwd模板初始化函数--
function changepwd_init(){
    plumeLog("初始化changepwd模板-"+plumeTime());
    plumeUtil.js(plumePath+"/js/changepwd.js");
    plumeLog("完成changepwd模板加载-"+plumeTime());
}
//--secondreg模板初始化函数--
function secondreg_init(){
    plumeLog("初始化secondreg模板-"+plumeTime());
    plumeUtil.js(plumePath+"/js/secondreg.js");
    plumeLog("完成secondreg模板加载-"+plumeTime());
}
//--brandCreateCompany模板初始化函数--
function brandCreateCompany_init(){
    plumeLog("初始化brandCreateCompany模板-"+plumeTime());
    plumeUtil.js(plumePath+"/js/brandCreateCompany.js");
    plumeLog("完成brandCreateCompany模板加载-"+plumeTime());
}
//--brandList模板初始化函数--
function brandList_init(){
    plumeLog("初始化brandList模板-"+plumeTime());
    plumeUtil.js(plumePath+"/js/paginationControl.js");
    plumeUtil.js(plumePath+"/js/brandList.js");
    plumeLog("完成brandList模板加载-"+plumeTime());
}
//--brandAdd模板初始化函数--
function brandAdd_init(){
    plumeLog("初始化brandAdd模板-"+plumeTime());
    plumeUtil.js(plumePath+"/js/brandAdd.js");
    plumeLog("完成brandAdd模板加载-"+plumeTime());
}
//--msgAdd模板初始化函数--
function msgAdd_init(){
    plumeLog("初始化msgAdd模板-"+plumeTime());
    plumeUtil.js(plumePath+"/js/msgAdd.js");
    plumeLog("完成msgAdd模板加载-"+plumeTime());
}
//--reviewList模板初始化函数--
function reviewList_init(){
    plumeLog("初始化reviewList模板-"+plumeTime());
    plumeUtil.js(plumePath+"/js/reviewList.js");
    plumeLog("完成reviewList模板加载-"+plumeTime());
}
//--reviewShowCompany模板初始化函数--
function reviewShowCompany_init(){
    plumeLog("初始化reviewList模板-"+plumeTime());
    plumeUtil.js(plumePath+"/js/reviewShowCompany.js");
    plumeLog("完成reviewShowCompany模板加载-"+plumeTime());
}
//--reviewShowPersonal模板初始化函数--
function reviewShowPersonal_init(){
    plumeLog("初始化reviewShowPersonal模板-"+plumeTime());
    plumeUtil.js(plumePath+"/js/reviewShowPersonal.js");
    plumeLog("完成reviewShowPersonal模板加载-"+plumeTime());
}
//--applyPriceTagManage模板初始化函数--
function applyPriceTagManage_init(){
    plumeLog("初始化applyPriceTagManage模板-"+plumeTime());
    plumeUtil.js(plumePath+"/js/applyPriceTagManage.js");
    plumeLog("完成applyPriceTagManage模板加载-"+plumeTime());
}

function compileGoods_init(){
    plumeLog("初始化compileGoods模板-"+plumeTime());
    plumeUtil.js(plumePath+"/js/compileGoods.js");
    plumeLog("完成compileGoods模板加载-"+plumeTime());
}

function createMyGoods_init() {
    plumeLog("初始化createMyGoods模板-" + plumeTime());
    plumeUtil.js(plumePath + "/js/createMyGoods.js")
    plumeLog("完成createMyGoods模板加载-" + plumeTime());
}
//--childIdCreate模板初始化函数--
function childIdCreate_init(){
    plumeLog("初始化childIdCreate模板-"+plumeTime());
    plumeUtil.js(plumePath+"/js/childIdCreate.js");
    plumeLog("完成childIdCreate模板加载-"+plumeTime());

}

function releaseSelfGoods_init() {
    plumeUtil.js(plumePath+"/js/releaseSelfGoods.js");
}

function showSelfGoods_init() {
    plumeUtil.js(plumePath+"/js/showSelfGoods.js");
}

function createSelfGoods_init() {
    plumeUtil.js(plumePath+"/js/createSelfGoods.js");
}

function editSelfGoods_init() {
    plumeUtil.js(plumePath+"/js/editSelfGoods.js");
}

//userType模板初始化函数
function userType_init(){
    plumeLog("初始化userType模板-"+plumeTime());
    plumeUtil.js(plumePath+"/js/userType.js");
    plumeLog("完成userType模板加载-"+plumeTime());
}
//popUpload模板初始化函数
function popUpload_init(){
    plumeLog("初始化popUpload模板-"+plumeTime());
    plumeUtil.js(plumePath+"/js/popUpload.js");
    plumeLog("完成popUpload模板加载-"+plumeTime());
}
//editMyGoods_init
function editMyGoods_init(){
    plumeLog("初始化editMyGoods模板-" + plumeTime());
    plumeUtil.js(plumePath + "/js/editMyGoods.js")
    plumeLog("完成editMyGoods模板加载-" + plumeTime());
}
//editMyGoods_init
function copyMyGoods_init(){
    plumeLog("初始化copyMyGoods模板-" + plumeTime());
    plumeUtil.js(plumePath + "/js/copyMyGoods.js")
    plumeLog("完成copyMyGoods模板加载-" + plumeTime());
}

//-- 新的login模板初始化函数
function loginNew_init(){

    plumeUtil.css(plumePath+"/css/swiper.min.css");

    plumeUtil.js(plumePath+"/js/login-new.js");
}

function brandListShow_init(){
    plumeLog("初始化brandListShow模板-" + plumeTime());
    plumeUtil.js(plumePath + "/js/brandListShow.js")
    plumeLog("完成brandListShow模板加载-" + plumeTime());
}

function shopListShow_init(){
    plumeLog("初始化shopListShow模板-" + plumeTime());
    plumeUtil.js(plumePath + "/js/shopListShow.js")
    plumeLog("完成shopListShow模板加载-" + plumeTime());
}
$.ajaxSetup({
    xhrFields: {
        withCredentials: true
    },
    crossDomain: true
});