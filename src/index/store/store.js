"use strict";

import api from "../../common/api/api.js"
import {tabs} from "../components";

let mutations = {
    fetchSubjectList(state,payload){
        state.subjectList = payload;
    },
};

let actions = {
    fetchSubjectList(context){
        api.fetchSubjectList().then((data)=>{
            context.commit("fetchSubjectList",data)
        })
    },
    deleteSubject(context,args){
     
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
    },
};

export default function generateStore(baseargs){
    return {
        state: {
            baseargs: baseargs,
            ajaxData: null,
            subjectList:null,
            info:"",
            currentView: 'subject',
            tabs: tabs,
        },
        mutations: mutations,
        actions: actions
    }
}
