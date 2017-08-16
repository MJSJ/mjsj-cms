/**
 * Created by yf on 2017/8/16.
 */
import api from "../../common/api/api.js";

export const fetchSubjectList = (context) => {
    api.fetchSubjectList().then((data)=>{
        context.commit("fetchSubjectList",data)
    })
};

export const deleteSubject = (context,args) => {
    api.deleteSubject(args).then((data)=>{
        //删除成功后重新发起拉取list的action
        if(data){
            context.dispatch("fetchSubjectList");
            window.vm.$message("删除成功");
        }else{
            window.vm.$message.error('删除失败');
        }
    }).catch((e)=>{
        window.vm.$message(e);
    })
};
