<template>
    <div class="subject_list">
        <el-button size="small" type="success" @click="handleAdd()">新增</el-button>
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
        <el-dialog  title="专题详情页" :visible.sync="dialogFormVisible" size="large">
            <div class="tag_area">
                <div class="tag_cell">
                <el-tag type="primary">版本标识</el-tag>
                <el-input  v-model="versionValue" :placeholder="currentData.data.tag"  :disabled="inputDisabled1"></el-input>
                <el-button type="info" @click="editVersion">编辑</el-button>
            </div>
            <div class="tag_cell">
                <el-tag type="primary">拥有者</el-tag>
                <el-input v-model="ownerValue" type="success" :placeholder="currentData.owner" :disabled="inputDisabled2"></el-input>
            </div>
            </div>
            <div class="version_area">
                <div class="text_area" >
                    <div v-if="currentData!=null">{{currentData.data.content}}</div>                  
                </div>
                <div class="select_area" v-if="selectVisibal">
                    <el-form>
                        <el-form-item label="历史版本" :label-width="formLabelWidth">
                            <el-select v-model="valueOption" placeholder="请选择历史版本" @change="switchVersion(valueOption)">
                                <el-option  v-for="(item,index) in subject.history"  :key="item.id" :label="item.tag" :value="item.tag"></el-option>
                            </el-select>
                        </el-form-item> 
                    </el-form>
                </div>
            </div>
            
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleNewAndSave">{{wordSwitch}}</el-button>
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
                inputDisabled1:true,
                inputDisabled2:true,
                selectVisibal:true,
                wordSwitch:'编辑', 
                versionValue:'',                  //版本号
                ownerValue:'' ,                   //公司
                title:'专题详情页',
                valueOption:'',                  //这里也必须先定义，当前option的value
                currentData:{
                    owner:'',
                    data:[]
                },                  //当前数据
                formLabelWidth: '120px',
                
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
          
            this.dialogFormVisible = true;
            this.currentData.data = this.subject.history[0];
            this.currentData.owner = this.subject.owner.name;
            this.selectVisibal = true;
            this.inputDisabled1 = true;
            this.inputDisabled2 = true;
            this.wordSwitch = "编辑"
         
           
        },
        handleDelete(index, row) {
            this.$confirm('确认删除？')
                .then(_ => {
                    console.log(index, row);
                    this.$store.dispatch("deleteSubject", { subjectID: row.id });
                })
                .catch(_ => { });
        },
        editVersion(){
            this.inputDisabled1 = false;
            console.log(1)
            console.log(this.subject,1)
        },
        switchVersion(v){
            console.log(v);  //这里能拿到当前option的value值，但是index拿不到，只有去json里面遍历
            var length = this.subject.history.length;
            for(var i=0;i<length;i++){
                if(v == this.subject.history[i].tag){
                    this.currentData.data = this.subject.history[i];
                }
            }
            console.log(this.currentData)
            
        },
        handleNewAndSave(){
            //this.dialogFormVisible = false;
            this.wordSwitch = "保存";
            console.log("测试分支上传")
        },
        //新增清空当前显示的数据，隐藏版本记录栏
        handleAdd(){
            this.currentData.data = [];
            this.dialogFormVisible = true;
            this.inputDisabled1 = false;
            this.inputDisabled2 = false;
            this.selectVisibal = false;
            this.versionValue = '',                 
            this.ownerValue = '' ,  
            this.wordSwitch = "保存"
               
        }
    },
    mounted() {
        this.$store.dispatch("fetchSubject");
    },
    
    //通过mapState方法，
    //直接从根store里取
    computed: mapState({ 
        subjectList: 'subjectList',
        subject:'subject'
    })  

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
.subject_list {
     max-width: 780px;
     .el-button--success{
        width: 90px;
        height: 50px;
        margin-bottom: 12px;
        font-size: 20px;
     }
    .el-dialog{
        .el-dialog__header{
            padding-bottom: 10px;
            border-bottom: 1px solid #ccc;
        }
        .tag_area{
            display: flex;
            margin-bottom: 20px;
            .tag_cell{
                display: flex;
                flex: 1;
                .el-tag{
                    height: 36px;
                    line-height: 36px;
                    margin-right: 10px;
                }
                .el-input{
                    width: 120px;
                    margin-right: 10px;
                }
                
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

}



</style>
