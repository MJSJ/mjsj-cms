<template>
    <el-dialog :visible.sync="true" title="专题详情页" size="large">
        <div class="tag_area">
            <div class="tag_cell">
            <el-tag type="primary">版本标识</el-tag>
            <el-input  v-model="versionValue" :placeholder="currentData.data.tag"  :disabled="inputEditable"></el-input>
        </div>
        <div class="tag_cell">
            <el-tag type="primary">拥有者</el-tag>
            <el-input v-model="ownerValue" type="success" :placeholder="currentData.owner" :disabled="loginUser.role==1"></el-input>
        </div>
        </div>
        <div class="version_area">
            <div class="text_area" >
                <article ref="code" id="code"></article>
            </div>
            <div class="select_area" v-if="historyVisible">
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
            <el-button @click="hideDetial()">取 消</el-button>
        </div>
    </el-dialog>
</template>

<script>
import {mapState} from 'vuex' 
export default {
    data() {
        return {
            
            historyVisible:true,      

            //看看下面哪些不要

            dialogFormVisible: false, 
            inputEditable:true,
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
    props:{
        subjectID:0
    },
    methods: {
        switchVersion(v){
            console.log(v);  //这里能拿到当前option的value值，但是index拿不到，只有去json里面遍历
            var length = this.subject.history.length;
            for(var i=0;i<length;i++){
                if(v == this.subject.history[i].tag){
                    let content = this.subject.history[i].content;
                    this.currentData.data = this.subject.history[i];

                    //设置编辑器里的代码
                    this.editor.setValue(content)
                }
            }
            console.log(this.currentData)
            
        },
        handleNewAndSave(){
            //this.dialogFormVisible = false;
            this.wordSwitch = "保存";
        },
        //新增清空当前显示的数据，隐藏版本记录栏
        initCode(){
            this.editor = CodeMirror(this.$refs.code, {
                value: this.currentData.data.content||' ',
                lineNumbers: true,
                mode: "text/html",
                keyMap: "sublime",
                autoCloseBrackets: true,
                matchBrackets: true,
                showCursorWhenSelecting: true,
                theme: "monokai",
                tabSize: 4
            });
        },
        hideDetial(){
            this.$emit('visibleListener', false)
        }
    },
    mounted() {
        this.$nextTick(()=>{
            this.initCode()
        })
        this.$store.dispatch("fetchSubject",{id:this.subjectID});
    },
    
    //通过mapState方法，
    //直接从根store里取
    computed: mapState({ 
        subjectList: 'subjectList',
        subject:'subject',
        loginUser:'loginUser'
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
