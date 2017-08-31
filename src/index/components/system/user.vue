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
                                   v-show="item.isChecked"></el-button>
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
                    <el-checkbox v-for="item in form.subjectList" :label="item.name"
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
                form: {},
                formLabelWidth: '60px',
            }
        },
        computed: mapState({
            userList: 'userList',
            totalTopics: 'totalTopics',
        }),
        mounted() {
            //getCheckedList
            this.userList.forEach((item) => {
                //这个copyArr传的空也要报错
                item.subjectList.forEach((topic) => {
                    topic.isChecked = true;
                });
                difference(item.subjectList, this.totalTopics);
            });
            this.form = this.userList[0];
            console.log(this.userList);
            console.log("=============================");
        },
        methods: {
            handleEdit: function (index, row) {
                this.form = this.userList[index];
                console.log(this.form);
                this.dialogFormVisible = true;
            },
            handleAdd() {
                this.dialogFormVisible = true;
            },
        }
    }

    function difference(subjectList, totalTopics) {
        totalTopics.forEach((item) => {
            let index = findTopic(item.name, subjectList);
            if (index < 0) {
                subjectList.push(item);
            }
        });
    }


    function findTopic(name, ary) {
        for (let i = 0; i < ary.length; i++) {
            if (name === ary[i].name) {
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