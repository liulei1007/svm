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
    plumeUtil.js(plumePath+"/js/takingGoodsData.js");
    plumeLog("完成takingGoodsData模板加载-"+plumeTime());
}
//--groundGoods模板初始化函数--
function groundGoods_init(){
    plumeLog("初始化groundGoods模板-"+plumeTime());
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
function shopCreate_init() {
    plumeUtil.js(plumePath+"/js/operatePop.js");
    plumeUtil.js(plumePath+"/js/shopCreate.js");
}
function shopShowCompany_init() {
    plumeUtil.js(plumePath+"/js/shopShowCompany.js");
}
function shopAlter_init() {
    plumeUtil.js(plumePath+"/js/shopAlter.js");
}

function shopListAgency_init() {
    plumeUtil.js(plumePath+"/js/shopList-agency.js");
}
function shopCreateAgency_init() {
    plumeUtil.js(plumePath+"/js/shopCreate-agency.js");
}
function shopShowAgency_init() {
    plumeUtil.js(plumePath+"/js/shopShow-agency.js");
}
function shopAlterAgency_init() {
    plumeUtil.js(plumePath+"/js/shopAlter-agency.js");
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
    plumeUtil.js(plumePath+"/js/brandList.js");
    plumeLog("完成brandList模板加载-"+plumeTime());
}
//--brandAdd模板初始化函数--
function brandAdd_init(){
    plumeLog("初始化brandAdd模板-"+plumeTime());
    plumeUtil.js(plumePath+"/js/brandAdd.js");
    plumeLog("完成brandAdd模板加载-"+plumeTime());
}
//