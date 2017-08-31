<template>
    <div class="subject_list">
        <el-table border :data="subjectList" style="width: 100%">
    
            <el-table-column prop="id" label="ID" width="120">
            </el-table-column>
    
            <el-table-column prop="name" label="名称" width="180">
            </el-table-column>
    
            <el-table-column label="操作" width="180">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
    
            <el-table-column label="上次编辑" width="300">
                <template scope="scope">
                    <div slot="reference">
                        {{scope.row.lastEdit.userName}}--{{scope.row.lastEdit.time}}
                    </div>
                </template>
            </el-table-column>
    
        </el-table>
        <el-dialog title="专题详情页" :visible.sync="dialogFormVisible" size="large">
            <div class="tag_area">
                <div class="tag_cell">
                <el-tag type="primary">版本标识</el-tag>
                <el-tag type="success">1.0.0</el-tag>
            </div>
            <div class="tag_cell">
                <el-tag type="primary">拥有者</el-tag>
                <el-tag type="success">火火的锅</el-tag>
            </div>
            </div>
            <div class="version_area">
                <div class="text_area">
                    放置的代码片段
                </div>
                <div class="select_area">
                    <el-form :model="form">
                    <el-form-item label="历史版本" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="请选择历史版本">
                        <el-option label="版本1.0.0" value="shanghai"></el-option>
                    <el-option label="版本1.0.1" value="shanghai"></el-option>
                    <el-option label="版本1.0.2" value="shanghai"></el-option>
                    </el-select>
                    </el-form-item> 
                </el-form>
                </div>
            </div>
            
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogFormVisible = false">保 存</el-button>
                <el-button @click="dialogFormVisible = false">取 消</el-button>

            </div>
        </el-dialog>


    </div>
</template>

<script>
import { SUBJECT_ITEM } from "../../../common/api/url.js"
import {mapState} from 'vuex' 
import subjectDialog from "./components/subjectDialog.vue"
export default {
    data() {
        return {      
                dialogFormVisible: false,
                title:'专题详情页',
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                formLabelWidth: '120px'
        }
    },
    components:{
        'subjectDialog':subjectDialog
    },
    methods: {
        deleteSubject(){
            // this.$store.dispatch("deleteSubject",{id:})
        },

        //下面的代码是之前跳转的页面的逻辑，
        //现在都在本页内了，所以以下代码需要更改
        handleEdit(index, row) {
           // window.location.href = SUBJECT_ITEM + "?subjectId=" + row.id;
           console.log(index);
           console.log(row);
            this.dialogFormVisible = true;
        },
        handleDelete(index, row) {
            this.$confirm('确认删除？')
                .then(_ => {
                    console.log(index, row);
                    this.$store.dispatch("deleteSubject", { subjectID: row.id })
                })
                .catch(_ => { });
        }
    },
    mounted() {

    },

    //通过mapState方法，
    //直接从根store里取
    computed: mapState({ 
        subjectList: 'subjectList'
    })  

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
.subject_list {
    max-width: 780px;
    .tag_area{
        display: flex;
        margin-bottom: 20px;
        .tag_cell{
            flex: 1
        }
    }
    .version_area{
        display: flex;
        min-height: 400px;
        .text_area{
            flex: 2;
            background: #ccc;
        }
        .select_area{
            flex: 1
        }
    }
    .dialog-footer{
        text-align: center;
    }
}

.el-form-item__content {
    text-align: left;
}

.time_to {
    text-align: center;
}

.time_sync {
    margin-left: 1em;
}

.product_confirm {
    margin-left: 1em;
}

.baseinfo {
    margin-top: 20px;
}

.s_item {
    &:after {
        content: "、";
        display: inline-block;
    }
    &:last-child {
        &:after {
            content: "";
        }
    }
}

.semi {
    &:after {
        content: ";";
        display: inline-block;
    }
    &:last-child {
        &:after {
            content: "";
        }
    }
}




</style>
