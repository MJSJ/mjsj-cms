
import * as db from "./db.js"

import {get,all,local} from "./tool.js"

const HOST = "mykrystal.com"
const GET_URLS = {
    // getShopBoard:HOST+"/joy/merchant/getshopboard",
}
const POST_URLS = {
    // newUploadImage:HOST+"/joy/merchant/newuploadimage",
}

const JSONP_URLS ={
    // setShopBoard:HOST+'/joy/merchant/setshopboard'
}

//本地Mock数据
const LOCAL_URLS = {
    fetchSubjectList:db.subjectList,
    deleteSubject:db.result,
    fetchSubject:db.subject
}

const api = {
    ...all(GET_URLS,POST_URLS,JSONP_URLS),
    ...local(LOCAL_URLS)//将请求mock到本地，有线上接口后注释本行
}

export default api