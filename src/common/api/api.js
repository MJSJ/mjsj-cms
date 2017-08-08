
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

const LOCAL_URLS = {
    fetchSubjectList:db.subjectList,
    deleteSubject:db.result,
    fetchSubject:db.subject
}

const api = {
    ...all(GET_URLS,POST_URLS,JSONP_URLS),
    ...local(LOCAL_URLS)
}

export default api