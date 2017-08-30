<template>
    <div class="user_container">
        <el-button style="margin-bottom: 10px;width: 100px" @click="handleAdd">添加用户</el-button>
        <div class="user_list">
            <el-table border :data="userList" style="width: 100%">

                <el-table-column prop="id" label="用户名">
                </el-table-column>

                <el-table-column prop="name" label="公司">
                </el-table-column>

                <el-table-column prop="password" label="密码">
                </el-table-column>

                <el-table-column label="专题">
                    <template scope="scope">
                        <el-button size="small" type="text" v-for="item in scope.row.subjectList" v-text="item.name"
                                   @click="handleEdit(scope.$index, scope.row)"></el-button>
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

        <el-dialog title="编辑"
                   :visible.sync="dialogFormVisible"
                   size="tiny"
                   :show-close=false>
            <el-form :model="form">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="form.id" auto-complete="off" class="edit_input">></el-input>
                </el-form-item>
                <el-form-item label="公司名" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off" class="edit_input">> </el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="form.password" auto-complete="off" class="edit_input"></el-input>
                </el-form-item>
                <el-form-item label="专题" :label-width="formLabelWidth">
                    <el-checkbox v-for="item in checkedList" :label="item.name"
                                 :checked="item.isChecked"></el-checkbox>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        components: {},
        data() {
            return {
                dialogFormVisible: false,
                form: {
                    id: "",
                    role: "",
                    name: "",
                    password: "",
                    subjectList: [
                        {
                            id: "",
                            name: ""
                        }
                    ]
                },
                formLabelWidth: '60px',
                checkedList: []
            }
        },
        computed: mapState({
            userList: 'userList',
            totalTopics: 'totalTopics',
        }),
        mounted() {
            //getCheckedList
            this.userList.forEach((item)=>{
                //这个copyArr传的空也要报错
                let totalTopicsCopy = copyArr(this.totalTopics.copy);
                item.subjectList.forEach((topic)=>{
                    let index = findTopic(topic.name, totalTopicsCopy);
                    if (index >= 0)
                        totalTopicsCopy[index].isChecked = true;
                });
                this.checkedList.push(totalTopicsCopy);
            })
        },
        methods: {
            handleEdit: function (index, row) {
                this.dialogFormVisible = true;
                this.form = this.userList[index];
            },
            handleAdd() {
                this.dialogFormVisible = true;
            },
        }
    }


    function findTopic(name, ary) {
        for (let i = 0; i < ary.length; i++) {
            if (name === ary[i].name) {
                return i;
            }
        }
        return -1;
    }

    function copyArr(arr) {
        let res = [];
        for (let i = 0; i < arr.length; i++) {
            res.push(arr[i])
        }
        return res
    }
</script>

<style>
    .edit_input {
    }
</style>