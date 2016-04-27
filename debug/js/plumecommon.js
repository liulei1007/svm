
var PLUME_PROJECT="svm";

var PLUME_FILE=[
	"/"+PLUME_PROJECT+"/css/bootstrap.min.css",
	"/"+PLUME_PROJECT+"/css/jquery.cxcalendar.css",
//	"/"+PLUME_PROJECT+"/css/bootstrap-theme.min.css",
	"/"+PLUME_PROJECT+"/css/svm.css",
	"/"+PLUME_PROJECT+"/js/jquery.js",
	"/"+PLUME_PROJECT+"/js/plume.js",
//	"/"+PLUME_PROJECT+"/js/bootstrap.js",

	"/"+PLUME_PROJECT+"/js/plumeimplement.js"
];
for(var i=0;i<PLUME_FILE.length;i++){
	if(PLUME_FILE[i].toLowerCase().indexOf(".js")!=-1){
		document.write("<script src='"+PLUME_FILE[i]+"'><\/script>");
	}else if(PLUME_FILE[i].toLowerCase().indexOf(".css")!=-1){
		document.write("<link rel='stylesheet' type='text/css' href='"+PLUME_FILE[i]+"'>");
	}
}