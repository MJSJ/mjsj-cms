<template>
    <el-dialog :visible.sync="true" title="专题详情页" size="large" :show-close="false">
        <div class="tag_area">
            <div class="tag_cell">
                <el-tag type="primary">专题名字</el-tag>
                <el-input   v-model="nameValue"  :disabled="inputaDisabledName"></el-input>
            </div>
            <div class="tag_cell">
                <el-tag type="success">版本标识</el-tag>
                <el-input   v-model="versionValue"  :disabled="inputaDisabled"></el-input>
            </div>
            <div class="tag_cell">
                <el-tag type="danger">拥有者</el-tag>
                <el-input  v-model="ownerValue" type="success"  :disabled="loginUser.role==1"></el-input>
            </div>
        </div>
        <div class="version_area">
            <div class="text_area">
                <article ref="code" id="code"></article>
            </div>
            <div class="select_area" v-if="historyVisible">
                        <ul class="versionNameUl">
                            <li class="versionNameLi versionNameLi_title">历史版本</li>
                            <li @click="switchVersion($index)" class="versionNameLi"  v-for="(item,$index) in subject.history"  :key="item.id" :class="$index == index ? bmg_e5Class : ''">{{item.tag}}</li>
                        </ul>
                        <div class="msg_cell" style="border-top: 1px solid #cccccc;padding-top: 10px"><el-tag type="primary">操作人</el-tag>：<el-tag type="primary">{{currentData && currentData.data.userName}}</el-tag></div>
                        <div class="msg_cell"><el-tag type="primary">时间</el-tag>：<el-tag type="primary">{{currentData && handleDataFormat(currentData.data.time)}}</el-tag></div>
                        <div class="temporary_version">
                                <el-button :disabled="TemporaryDisabled" type="info" @click="switchToTemporary">临时版本({{TemporaryVersion}})</el-button>
                        </div>
                        <p class="tooltip">注:临时版本用去在编辑状态下，切换到其他版本代码之前，会自动保存当前正在编辑的代码块，点击回到编辑未保存的版本。</p>

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
            inputaDisabledName:false,
            wordSwitch:'保存',
            title:'专题详情页',
            index:0,
            TemporaryIndex:0,
            showCursorWhenSelecting:false,
            bmg_e5Class:'bmg_e5',
            nameValue:'',
            versionValue:'',
            ownerValue:'',
            TemporaryDisabled:true,    //临时版本按钮 ，只要在切换版本之后才能点击
            TemporaryVersion:'',
            lastSubject:null
        }
    },
    props:{
        subjectID:0
    },
    methods: {
        switchVersion(index){
            if(this.index!=index){
                this.TemporaryIndex = this.index;        //获取点击前的index
                this.TemporaryVersion = this.currentData.data.tag;   //保存上一次的版本号，这里不同于时间，可以通过直接修改nidex，改变curentData来改变，这里单独拿的变量，最好优化
                this.TemporaryContent = this.editor.getValue();
                let content = this.subject.history[index].content;    //切换content
                this.editor.setValue(content);
                this.index = index;    //切换index
                this.versionValue = this.currentData.data.tag;   //切换版本号
                if( this.wordSwitch == "保存"){                   //这里过滤调未点击编辑时，切换不会影响 临时版本按钮状态
                    this.TemporaryDisabled = false;
                }
            }else{
                window.vm.$message("已是当前版本！");
                return false
            }
        },
        handleNewAndSave(){
           // this.wordSwitch = "保存";
           // console.log(this.subjectID);
           // console.log(this.editor.getValue());
            var content = this.editor.getValue();
            if(this.wordSwitch == "编辑"){
                this.wordSwitch = "保存";
                this.inputaDisabled = false;
                this.inputaDisabledName = true;
                this.editor.options.readOnly = false;           //重新配置editor,因为editor只生产了一次，所以再配置项里面加readOnly:this.readOnly 来操作编辑器 无效
                return false;
            }else if(this.wordSwitch == "保存"){
                if(content!='' &&  this.nameValue!='' && this.versionValue!=''){
                    if(this.subjectID == 0){
                        this.$store.dispatch("updateSubject",{content:content,subjectName:this.nameValue,tag:this.versionValue});
                    }else{
                        this.$store.dispatch("updateSubject",{content:content,tag:this.versionValue,subjectID:this.subjectID});
                    }
                    this.$nextTick(this.$emit('visibleListener', false));
                    this.index = 0;        //更新到最新版本
                    return false;
                }else{
                    this.$confirm("请确认录入完整信息！")
                    .then(_=>{
                        console.log("确定")
                    })
                    .catch(_ =>{console.log("取消")})
                }
            }      
        },
        //新增清空当前显示的数据，隐藏版本记录栏
        initCode(){
            if(this.editor){
                console.log(this.editor)
            }
            this.editor = CodeMirror(this.$refs.code, {
                value: this.currentData&&this.currentData.data&&this.currentData.data.content||'',
                lineNumbers: true,
                mode: "text/html",
                keyMap: "sublime",
                autoCloseBrackets: true,
                matchBrackets: true,
                showCursorWhenSelecting: true,
                theme: "monokai",
                styleActiveLine: true,
                tabSize: 4,
                readOnly:false,
            });
        },
        hideDetial(){
            this.$emit('visibleListener', false)
        },
        switchToTemporary(){
            this.index = this.TemporaryIndex;
            this.editor.setValue(this.TemporaryContent);
            this.versionValue = this.TemporaryVersion;

        },
        handleDataFormat(str){
            if(str){
                return new Date(str).toLocaleString();
            }
        }
    },
    mounted() {
        var self = this;
        console.log(this.subjectID);
        self.lastSubject = self.subject;
        self.subjectID!=0 && self.$store.dispatch('fetchSubject',{subjectID:self.subjectID});
        console.log(this.subject);
        setTimeout(() =>{console.log(this.subject)},1000);
        //debugger;
        let timer = setInterval(() =>{
            if(self.subjectID != 0 && self.currentData && self.currentData.data && self.subject!= self.lastSubject){
                clearInterval(timer);
                self.nameValue = self.currentData.name;
                self.versionValue = self.currentData.data.tag;
                self.ownerValue = self.currentData.owner;
                self.initCode();
                this.editor.options.readOnly = true;    //这里在生成编辑器后，再来配置只读功能
            }else if(self.subjectID == 0){
                clearInterval(timer);
                self.initCode();
            }
        })
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
            if(this.subjectID != 0 && this.subject && this.subject.history){            //第一次执行拿不到数据，第二次才拿到数据，所哟要过滤到第一次
                 return{
                    owner:this.subject&&this.subject.owner || '',
                    name:this.subject&&this.subject.name|| '',
                    data:this.subject&&this.subject.history&&this.subject.history[this.index] || []
                }
            }else if(this.subjectID == 0){
                return {
                    owner:'',
                    name:'',
                    data:[]
                }
            }
        },
        historyVisible(){
            if(this.subjectID!=0){
               this.wordSwitch = "编辑";
                this.inputaDisabled = true;
                this.inputaDisabledName = true;
               return true
            }else{
                return  false;
            }
        },
    },
    watch:{
    } 
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->

