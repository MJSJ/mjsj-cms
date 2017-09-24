<template>
    <div class="user_container">
        <el-button style="margin-bottom: 10px;width: 100px" @click="handleAdd">添加用户</el-button>
        <div class="user_list" style="min-height: 450px">
            <el-table border :data="totalSubjectList[currentIndex]" style="width: 100%">
                <el-table-column prop="id" label="用户名">
                </el-table-column>

                <el-table-column prop="name" label="公司">
                </el-table-column>

                <el-table-column prop="password" label="密码">
                </el-table-column>

                <el-table-column label="专题">
                    <template scope="scope">
                        <el-button size="small" type="text" v-for="item in scope.row.subjectList"
                                   v-text="item.name" v-if="item.isChecked"></el-button>
                    </template>
                </el-table-column>

                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog :title="isAddUser ? '添加':'编辑'"
                   v-if="dialogFormVisible"
                   :visible.sync="true"
                   size="tiny"
                   :show-close=false>
            <el-form :model="form">
                <el-form-item label="公司名" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off" class="edit_input">> </el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="form.password" auto-complete="off" class="edit_input"></el-input>
                </el-form-item>
                <el-form-item label="专题" :label-width="formLabelWidth">
                    <el-checkbox v-for="(item,index) in form.subjectList"
                                 :label="item"
                                 :checked="item.isChecked"
                                 @change="handleCheckedTopicsChange(index)">{{item.name}}
                    </el-checkbox>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <p v-show="isShowWarning" v-text="warningHint" style="color: red;"></p>
                <el-button @click="handleEditCancel">取 消</el-button>
                <el-button type="primary" @click="handleEditConfirm">确 定</el-button>
            </div>
        </el-dialog>
        <div class="block" style="padding-left: 75%;margin-top: 50px">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="10"
                    layout="total, prev, pager, next"
                    :total="totalPages">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    function Topic(id, name, isChecked) {
        this.id = id;
        this.name = name;
        this.isChecked = isChecked
    }

    function Form(id, role, name, password, subjectList) {
        this.id = id;
        this.role = role;
        this.name = name;
        this.password = password;
        this.subjectList = subjectList;
    }

    let currentForm = {};
    let indexWhichClicked = 0;

    export default {
        components: {},
        data() {
            return {
                dialogFormVisible: false,
                form: {},
                formLabelWidth: '60px',
                warningHint: "",
                isShowWarning: false,
                isAddUser: false,

                currentPage:1,
                totalPages:0,
                totalSubjectList:[],
                currentIndex:0,

            }
        },
        computed: mapState({
            userList: 'userList',
            totalTopics: 'totalTopics',
        }),
        mounted() {

            this.totalPages = this.userList.length;
            this.handleData(this.userList);

            this.initValue();
        },
        methods: {
            initValue() {
                console.log("刷新数据");
                console.log(this.totalTopics);
                this.form = this.userList[0];
            },
            handleEdit(index, row) {
                this.showDialog();
                indexWhichClicked = index;
                this.changeEditForm(this.userList[index]);
            },
            handleDelete(index, row) {
                this.$confirm('确认删除？')
                    .then(_ => {
                        this.$store.dispatch("deleteUser", {userID: this.userList[index].id});
//                        this.userList.splice(index, 1);
                    })
                    .catch(_ => {
                    });
            },
            handleAdd() {
                this.showDialog();
                this.changeEditForm(new Form("", "", "", "", this.totalTopics));
                this.isAddUser = true;
            },
            handleCheckedTopicsChange(index) {
                this.form.subjectList[index].isChecked = !this.form.subjectList[index].isChecked;
                console.log(index)
            },

            changeEditForm(form) {
                currentForm = new Form(form.id, form.role, form.name, form.password, this.createNewSubjectList(form.subjectList));
                this.form = currentForm;
            },

            createNewSubjectList(subjectList) {
                let newSubjectList = [];
                subjectList.forEach((item) => {
                    newSubjectList.push(new Topic(item.id, item.name, item.isChecked));
                });
                difference(newSubjectList, this.totalTopics);
                console.log("=========");
                console.log(newSubjectList);
                return newSubjectList;
            },

            handleEditConfirm() {
                if (this.isAddUser) {
                    if (currentForm.name === "" || currentForm.password === "") {
                        this.warningHint = "输入框不能为空";
                        this.isShowWarning = true;
                        return;
                    }
                    this.isShowWarning = false;
                }
                this.$store.dispatch("updateCompany", createNewUser(currentForm));
                this.dismissDialog();
            },

            handleEditCancel() {
                this.dismissDialog();
            },

            dismissDialog() {
                this.dialogFormVisible = false;
                this.isAddUser = false;
            },
            showDialog() {
                this.dialogFormVisible = true;
                this.isShowWarning = false;
            },



            //分页
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentIndex = val - 1;
            },
            handleArr(array,size){
                if(array && array instanceof Array){
                    var result = [];
                    for (var x = 0; x < Math.ceil(array.length / size); x++) {
                        var start = x * size;
                        var end = start + size;
                        result.push(array.slice(start, end));
                    }
                    return result;
                }
            },
            //处理数据10条一页
            handleData(arr){
                if(arr && arr instanceof Array){
                    var length = arr.length;
                    this.totalPages = length;
                    if(length <= 10){
                        this.totalSubjectList.push(arr);
                        console.log(this.totalSubjectList[0])
                    }else{

                        this.total = Math.floor(length/10) + 1;
                        this.totalSubjectList = this.handleArr(this.userList,10);
                        console.log(this.totalSubjectList)
                    }
                }
            },
        }
    }

    function createNewUser(currentForm) {
        let subjectIdList = [];
        currentForm.subjectList.forEach((item) => {
            if (item.isChecked)
                subjectIdList.push(item.id);
        });
        currentForm.subjectList = subjectIdList;
        return currentForm;
    }

    function difference(subjectList, totalTopics) {
        console.log("totalTopics：");
        console.log(totalTopics);
        totalTopics.forEach((item) => {
            let index = findTopic(item.id, subjectList);
            if (index < 0) {
                let topic = new Topic(item.id, item.name, item.isChecked);
                subjectList.push(topic);
            }
        });
    }


    function findTopic(id, ary) {
        for (let i = 0; i < ary.length; i++) {
            if (id === ary[i].id) {
                return i;
            }
        }
        return -1;
    }

</script>

<style>
    .edit_input {
    }
</style>