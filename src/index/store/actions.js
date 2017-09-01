/**
 * Created by yf on 2017/8/16.
 */
import api from "../../common/api/api.js";

export const fetchSubjectList = (context) => {
    api.fetchSubjectList().then((data)=>{
        // data => subjecList对象
        //提交一个mutation
        context.commit("fetchSubjectList",data)
    })
};

export const fetchSubject = (context,args)=>{
    api.fetchSubject(args).then((data)=>{
        context.commit("fetchSubject",data)
    })
}

export const deleteSubject = (context,args) => {
    api.deleteSubject(args).then((data)=>{
        //删除成功后重新发起拉取list的action
        console.log(data);
        var data = data.data;
        if(data.success){
            context.dispatch("fetchSubjectList");
            window.vm.$message("删除成功");
        }else{
            window.vm.$message.error('删除失败');
        }
    }).catch((e)=>{
        window.vm.$message(e);
    })
};
