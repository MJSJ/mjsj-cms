"use strict";

import api from "../../common/api/api.js"

let mutations = {
    fetchSubject(state,payload){
        state.subject = payload;
    },
};

let actions = {
    fetchSubject(context,args){
        api.fetchSubject(args).then((data)=>{
            context.commit("fetchSubject",data)
        })
    }
};

export default function generateStore(baseargs){
    return {
        state: {
            baseargs: baseargs,
            ajaxData: null,
            subject:null
        },
        mutations: mutations,
        actions: actions
    }
}
