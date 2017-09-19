/**
 * Created by yf on 2017/8/16.
 */

export const fetchSubjectList = (state, payload) => {
    state.subjectList = payload;
};

export const fetchUserList = (state, payload) => {
    state.userList = payload;
};

export const fetchTotalSubjects = (state, payload) => {
    console.log("fetchTotalSubjects:");
    state.totalSubjects = payload;
    console.log(state.totalSubjects);
    console.log(payload);
};

export const fetchSubject = (state, payload) => {
    state.subject = payload;
}

export const updateSubject = (state, payload) => {
    state.addSubject = payload;
}

export const setCurrentView = (state, view) => {
    state.currentView = view;
    let v = state.tabs.find(item => item.id === view);
    let hv = state.historyTabs.find(item => item.id === view);
    if (!hv) {
        state.historyTabs.push(v);
    }
};

export const setSelectedSubject = (state, payload) => {
    state.selectedSubject = payload
}

export const setLoginUser = (state, payload) => {
    state.loginUser = payload
}
export const removeCurrentView = (state, view) => {
    let ind = state.historyTabs.findIndex(item => item.id === view);
    if (ind > -1) {
        state.historyTabs.splice(ind, 1);
        let curView = state.historyTabs.find(item => item.id === state.currentView);
        if (state.historyTabs.length > 0 && !curView) {
            state.currentView = state.historyTabs[state.historyTabs.length - 1].id;
        } else {
            state.currentView = curView ? state.currentView : '';
        }
    }
};
