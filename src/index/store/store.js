"use strict";

import {tabs} from "../components";
import * as actions from './actions';
import * as mutations from './mutations';
import subject from "./modules/subject";
import system from "./modules/system";

export default function generateStore(baseargs){
    return {
        state: {
            baseargs: baseargs,
            ajaxData: null,
            subjectList:null,
            info:"",
            currentView: '',
            tabs: tabs,
            historyTabs: [],
        },
        mutations,
        actions,
        modules:{
            subject,
            system,
        }
    }
}
