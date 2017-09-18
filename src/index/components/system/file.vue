<template>
    <div class="file_container">
        <div class="file-uploader" :style="hasSelectedFile?'border:none':''" @click="selectFile">
            <el-progress type="circle" v-if="hasSelectedFile" :percentage="percentage"></el-progress>
            <div v-else class="file-uploader-icon el-icon-plus"></div>
        </div>

        <input type="file" v-show="false" id="fileHelper" ref="fileHelper" @change="uploadFile">

        <el-table
            :data="result"
            v-show="result&&result.length>0"
            style="width: 100%">
            <el-table-column
                prop="url"
                label="文件路径"
                >
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import api from "../../../common/api/api.js"
import {HOST} from "../../../common/api/api.js"
    export default {
        data() {
            return {
                hasSelectedFile:false,
                percentage:0,
                result:[]
            }
        },
        computed:{
            
        },
        methods: {
            selectFile(){
            　  var evt = document.createEvent("MouseEvents");  
                evt.initEvent("click", true, true);  
                this.$refs["fileHelper"].dispatchEvent(evt); 
            },
            uploadFile(e){
                this.hasSelectedFile = true;
                this.startProgress();
                api.uploadFile(e.srcElement.files[0]).then((data)=>{
                    if(!data||data.length<0){
                        this.$message.error("上传失败")
                        this.hasSelectedFile = false;
                    }
                    this.result = this.composeFile(data);
                    this.percentage = 100;
                })
            },
            startProgress(){
                if(this.percentage<90){
                    this.percentage+=Math.ceil(Math.random()*10)
                    setTimeout(()=>{
                        this.startProgress();
                    },300)
                }
            },
            composeFile(arr){
                /**
                 * 
                 *    未实现！！！
                 * 
                 * 把mac的以.开头的文件过滤到
                 */
                let result = [];
                arr.map((item)=>{
                    if(item.indexOf(".")==0)
                        return
                    result.push({
                        url:HOST+item.replace(/\/services/,'')
                    })
                })
                return result
            }
        },
        mounted(){
        
        }
    }
</script>
<style lang="less" rel="stylesheet/less">
    .file_container{

        .file-uploader  {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            width:126px;
            height: 126px;
            margin-bottom:30px;
        }
        .file-uploader:hover {
            border-color: #20a0ff;
        }
        .file-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 126px;
            height: 126px;
            line-height: 126px;
            text-align: center;
        }
        
    }
</style>