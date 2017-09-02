<template>
    <div class="subject_list">
        <el-button size="small" type="success" @click="showDetail()">新增</el-button>
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

        <subjectDetail v-if="detailVisble" @visibleListener="visibleListener" :subjectID="subjectID"></subjectDetail>
    </div>
</template>

<script>
import { SUBJECT_ITEM } from "../../../common/api/url.js"
import {mapState,mapMutations} from 'vuex' 
import subjectDetail from "./components/subjectDetail.vue"
export default {
    data() {
        return {    
            detailVisble:false,
            subjectID:0//选中的subject，0为初始状态
        }
    },

    watch:{
        dialogFormVisible(v){
            if(!v)
                return
            this.$nextTick(()=>{
                this.initCode()
            })
            
        }
    },
    components:{
        'subjectDetail':subjectDetail
    },
    methods: {
        ...mapMutations(['setSelectedSubject']),

        //下面的代码是之前跳转的页面的逻辑，
        //现在都在本页内了，所以以下代码需要更改
        handleEdit(index, row) {
            this.showDetail();
            this.subjectID = row.id;
        },
        handleDelete(index, row) {
            this.$confirm('确认删除？')
                .then(_ => {
                    console.log(index, row);
                    this.$store.dispatch("deleteSubject", { subjectID: row.id });
                })
                .catch(_ => { });
        },
        showDetail(){
            this.detailVisble = true;
        },
        visibleListener(value){
            this.detailVisble = value
        }
    },
    mounted() {
        // this.$store.dispatch("fetchSubject");
        //监听子组件的visible
        
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
                // background: #ccc;
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
