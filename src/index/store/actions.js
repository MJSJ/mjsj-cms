/**
 * Created by yf on 2017/8/16.
 */
import api from "../../common/api/api.js";

export const fetchSubjectList = (context) => {
    api.fetchSubjectList().then((data) => {
        // data => subjecList对象
        //提交一个mutation
        console.log(data)
        context.commit("fetchSubjectList", data)
    })
};

export const fetchSubject = (context, args) => {
    api.fetchSubject(args).then((data) => {
        context.commit("fetchSubject", data)
    })
}

export const updateSubject = (context, args) => {
    api.updateSubject(args).then((data) => {
        context.commit("updateSubject", data)
        console.log(data)
        if (data.success) {
            context.dispatch("fetchSubjectList");
            window.vm.$message("删除成功");
        } else {
            window.vm.$message.error('删除失败');
        }

    })
}


export const deleteSubject = (context, args) => {
    api.deleteSubject(args).then((data) => {
        //删除成功后重新发起拉取list的action
        console.log(data);
        if (data.success) {
            context.dispatch("fetchSubjectList");
            window.vm.$message("删除成功");
        } else {
            window.vm.$message.error('删除失败');
        }
    }).catch((e) => {
        window.vm.$message(e);
    })
}

export const fetchUserList = (context, args) => {
    api.fetchUserList(args).then((data) => {
        context.commit("fetchUserList", data)
    })
};

export const fetchTotalTopics = (context, args) => {
    api.fetchTotalTopics(args).then((data) => {
        context.commit("fetchTotalTopics", data)
    })
};

export const updateCompany = (context, args) => {
    api.updateCompany(args).then((data) => {
        //删除成功后重新发起拉取list的action
        if (data.success) {
            context.dispatch("fetchUserList");
            context.dispatch('fetchTotalTopics', {status: 1});
            window.vm.$message("编辑成功");
        } else {
            window.vm.$message.error('编辑失败');
        }
        context.commit("fetchUserList", data.data)
    })
};

export const deleteUser = (context, args) => {
    api.deleteUser(args).then((data) => {
        //删除成功后重新发起拉取list的action
        if (data.success) {
            context.dispatch("fetchUserList");
            context.dispatch('fetchTotalTopics', {status: 1});
            window.vm.$message("删除成功");
        } else {
            window.vm.$message.error('删除失败');
        }
        context.commit("fetchUserList", data.data)
    })
};
