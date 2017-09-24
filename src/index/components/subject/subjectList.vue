<template>
    <div class="subject_list">
        <el-button size="small" type="success" @click="showDetail()">新增</el-button>
        <div class="table_container" style="min-height: 450px">
            <el-table border :data="totalSubjectList[currentIndex]">
                <el-table-column prop="id" label="ID" width="200">
                </el-table-column>

                <el-table-column prop="name" label="名称" width="300">
                </el-table-column>

                <el-table-column label="操作" width="300">
                    <template scope="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>

                <el-table-column label="上次编辑" >
                    <template scope="scope">
                        <div slot="reference" v-if="scope.row.lastEdit">
                            {{scope.row.lastEdit.userName}}--{{handleDataFormat(scope.row.lastEdit.time)}}
                        </div>
                    </template>
                </el-table-column>

            </el-table>
        </div>
        <div class="block" style="padding-left: 75%;">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="10"
                    layout="total, prev, pager, next"
                    :total="totalPages">
            </el-pagination>
        </div>
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
            subjectID:0,//选中的subject，0为初始状态
            currentPage:1,
            totalPages:0,
            totalSubjectList:[],
            currentIndex:0,
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
            this.detailVisble = true;
            this.subjectID = row.id;
            console.log(this.subjectID)
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
            this.subjectID = 0;
            this.$nextTick(() =>{
                 this.detailVisble = true;
            })
        },
        visibleListener(value){
            this.detailVisble = value
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
                   this.totalSubjectList = this.handleArr(this.subjectList,10);
                   console.log(this.totalSubjectList)
                }
            }
        },
        handleDataFormat(str){
            if(str){
                return new Date(str).toLocaleString();
            }
        }
    },
    mounted() {
        // this.$store.dispatch("fetchSubject");
        //监听子组件的visible
        //console.log(this.subjectList)
        this.totalPages = this.subjectList.length;
        this.handleData(this.subjectList);
    },
    
    //通过mapState方法，
    //直接从根store里取
    computed: mapState({ 
        subjectList:'subjectList',
        subject:'subject'
    })  

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
.subject_list {
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
                flex: 1;
            }
            .select_area{
                flex: 1;
                margin-left: 50px;
                max-width: 300px;
                border: 1px solid #ccc;
                border-radius: 10px;
                padding: 5px;
                background-color: aliceblue;
                .versionNameUl{
                    height: 190px;
                    overflow-y: scroll;
                    .versionNameLi{
                        background-color:#f3f3f3;
                        border-radius: 10px;
                        text-indent: 1em;
                        cursor: pointer;
                        height:40px;
                        line-height: 40px;
                        text-align: center;
                        transition: .5s all ease;
                        margin-bottom:10px;
                    }
                    .versionNameLi_title{
                        background-color: #1d90e6;
                        color: #fff;
                    }
                    .bmg_e5{
                        background-color: #4caf50;
                        color: #fff;
                    }
                }
                .msg_cell{
                    margin: 20px 0 10px 0;
                    .el-tag{
                        min-width: 50px;
                        text-align: center;
                    }
                }
                .temporary_version{
                    text-align: center;
                    margin-top: 40px;
                }
                .tooltip{
                    font-size: 12px;
                    margin-top: 20px;
                }
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
