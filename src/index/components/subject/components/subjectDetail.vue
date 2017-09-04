<template>
    <el-dialog :visible.sync="true" title="专题详情页" size="large" :show-close="false">
        <div class="tag_area">
            <div class="tag_cell">
                <el-tag type="primary">专题名字</el-tag>
                <el-input  v-model="nameValue" :placeholder="currentData&&currentData.name"  :disabled="inputaDisabled"></el-input>
            </div>
            <div class="tag_cell">
                <el-tag type="primary">版本标识</el-tag>
                <el-input  v-model="versionValue" :placeholder="currentData&&currentData.data&&currentData.data.tag"  :disabled="inputaDisabled"></el-input>
            </div>
            <div class="tag_cell">
                <el-tag type="primary">拥有者</el-tag>
                <el-input v-model="ownerValue" type="success" :placeholder="currentData&&currentData.owner" :disabled="loginUser.role==1"></el-input>
            </div>
        </div>
        <div class="version_area">
            <div class="text_area">
                <article ref="code" id="code"></article>
            </div>
            <div class="select_area" v-if="historyVisible">
                <el-form>
                    <el-form-item label="历史版本 : " :label-width="formLabelWidth">
                        <!-- <el-select v-model="valueOption" placeholder="请选择历史版本" @change="switchVersion(valueOption)">
                            <el-option  v-for="(item,index) in subject.history"  :key="item.id" :label="item.tag" :value="item.tag"></el-option>
                        </el-select> -->
                        <ul class="versionNameUl">
                            <li @click="switchVersion(index)" class="versionNameLi"  v-for="(item,index) in subject.history"  :key="item.id">{{item.tag}}</li>                          
                        </ul>
                        <div class="">操作人：{{currentData.data.userName}}</div>
                        <div class="time">时间：{{currentData.data.time}}</div>
                    </el-form-item> 
                </el-form>
            </div>
            <!-- <historyVersion :historyData="historyData"><historyVersion/>   -->
        </div>
        
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleNewAndSave">{{wordSwitch}}</el-button>
            <el-button @click="hideDetial()">取 消</el-button>
        </div>
    </el-dialog>
</template>

<script>
import {mapState} from 'vuex' 
//import historyVersion from './historyVersion.vue'
export default {
    conponents:{
        //'historyVersion':historyVersion
    },
    data() {
        return {               
            dialogFormVisible: false, 
            inputaDisabled:false,
            wordSwitch:'保存', 
            nameValue:'',
            versionValue:'',                  //版本号
            ownerValue:'' ,                   //公司
            title:'专题详情页',
            valueOption:'',                  //这里也必须先定义，当前option的value
            // currentData:{
            //     owner:'',
            //     data:[]
            // },                  //当前数据
            formLabelWidth: '120px',
            index:0,
            readOnly:false,
            showCursorWhenSelecting:false
        }
    },
    props:{
        subjectID:0
    },
    methods: {
        switchVersion(index){       
            // console.log(index);
            // console.log(this.currentData)
            // this.currentData.data = this.subject.history[index];
             let content = this.subject.history[index].content;       
             this.editor.setValue(content);
            // console.log(this.subject)
            // console.log(this.currentData)
            this.index = index;
            console.log(this.index);
            
        },
        handleNewAndSave(){
           // this.wordSwitch = "保存";
            console.log(this.subjectID);
            console.log(this.editor.getValue());
            var content = this.editor.getValue();
            if(this.wordSwitch == "编辑"){
                this.wordSwitch = "保存";
                this.readOnly = false;
                this.inputaDisabled = false;
                console.log(this.readOnly)
                return false;
            }
            if(this.wordSwitch == "保存"){
                if(this.content!='' && this.nameValue!='' && this.versionValue!=''){
                    this.$store.dispatch("updateSubject",{subjectName:this.nameValue,content:content,tag:this.versionValue});
                }else{
                    this.$confirm("请确认录入信息完整！")
                    .then(_=>{
                        console.log("确定")
                    })
                    .catch(_ =>{console.log("取消")})
                }
            }      
        },
        //新增清空当前显示的数据，隐藏版本记录栏
        initCode(){
            this.editor = CodeMirror(this.$refs.code, {
                value: this.currentData&&this.currentData.data&&this.currentData.data.content||'',
                lineNumbers: true,
                mode: "text/html",
                keyMap: "sublime",
                autoCloseBrackets: true,
                matchBrackets: true,
                showCursorWhenSelecting: true,
                theme: "monokai",
                tabSize: 4,
                readOnly:this.readOnly
            });
        },
        hideDetial(){
            this.$emit('visibleListener', false)
        },
    },
    mounted() {
        this.$store.dispatch("fetchSubject",{subjectID:this.subjectID || ''});   
        this.$nextTick(()=>{
            this.initCode()
        }); 
    },
    //通过mapState方法，
    //直接从根store里取
    computed:{
           ...mapState({ 
            subjectList: 'subjectList',
            subject:'subject',
            loginUser:'loginUser'
        }),
        currentData(){
            if(this.subjectID!=0){
                 return{
                    owner:this.subject&&this.subject.owner&&this.subject.owner.name || '',
                    name:this.subject&&this.subject.name|| '',
                    data:this.subject&&this.subject.history&&this.subject.history[this.index] || []
                }
            }
        },
        historyVisible(){
            if(this.subjectID == 0){  
               this.inputaDisabled = false;
               return false
            }else{
                this.wordSwitch = "编辑";
                this.inputaDisabled = true;
                return  true;
            }
        },
        readOnly(){
            if(this.subjectID == 0){
                return false;
            }else{
                return true;
            }
        }

    },
    watch:{
        
    } 
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
            max-width:70%;
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
                flex: 1;
                .versionNameUl{
                    border: 1px solid #ccc;
                    .versionNameLi{
                        background-color:#f3f3f3;
                        text-indent: 1em;   
                        cursor: pointer;                    
                    }
                    .versionNameLi:hover{
                        background-color: #e5e5e5;
                    }
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
