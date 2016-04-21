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
