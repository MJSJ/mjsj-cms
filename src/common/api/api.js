import * as db from "./db.js"

import {get, all, local} from "./tool.js"

const HOST = "//mykrystal.com"
//const HOST = "//localhost:8081"
const GET_URLS = {
    fetchSubjectList:HOST+"/cms/fetchSubjectList",
    fetchSubject:HOST+"/cms/fetchSubject",
    getShopBoard:HOST+"/joy/merchant/getshopboard",
    fetchUserList:HOST+"/cms/fetchUserList",
    fetchTotalTopics:HOST+"/cms/fetchSubjectList",
    logout:HOST+"/cms/logout"
}
const POST_URLS = {
    // newUploadImage:HOST+"/joy/merchant/newuploadimage",
    login:HOST+"/api/login",
    newUploadImage:HOST+"/joy/merchant/newuploadimage",

    deleteSubject:HOST+"/cms/deleteSubject",

    updateSubject:HOST+"/cms/updateSubject",

    updateCompany: HOST + "/cms/updateCompany",
    deleteUser: HOST + "/cms/deleteUser",
}

const JSONP_URLS = {

}

//本地Mock数据
const LOCAL_URLS = {
    fetchSubjectList: db.subjectList,
    deleteSubject: db.result,
    fetchSubject: db.subject,
    // fetchUserList: db.userList,
    // fetchTotalTopics: db.totalTopics
}

const api = {
    ...all(GET_URLS, POST_URLS, JSONP_URLS),
    //...local(LOCAL_URLS)//将请求mock到本地，有线上接口后注释本行
}

export default api