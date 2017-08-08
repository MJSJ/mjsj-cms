<template>
<div class="subject_list">
    <el-table
      border
      :data="subjectList"
      style="width: 100%">

      <el-table-column
      prop="id"
      label="ID"
      width="120">
    </el-table-column>

        <el-table-column
      prop="name"
      label="名称"
      width="180">
    </el-table-column>

       <el-table-column
        label="操作"
        width="180">
        <template scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>

   
     <el-table-column
        label="上次编辑"
        width="300">
        <template scope="scope">
            <div slot="reference">
                {{scope.row.lastEdit.userName}}--{{scope.row.lastEdit.time}}
            </div>
        </template>
      </el-table-column>

    </el-table>
</div>
</template>

<script>
import {SUBJECT_ITEM} from "../../common/api/url.js"

export default {
    data() {
       return {
        }
    },
    props:{
        subjectList:{}
    },
    methods:{
        handleEdit(index, row) {
            window.location.href = SUBJECT_ITEM + "?subjectId="+row.id;
        },
        handleDelete(index, row) {
            this.$confirm('确认删除？')
                .then(_ => {
                    console.log(index, row);
                    this.$store.dispatch("deleteSubject",{subjectID:row.id})
                })
                .catch(_ => { });
        }
    },
    mounted(){
        
    }
   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">

.subject_list{
    max-width: 780px;
}
.el-form-item__content{
    text-align: left;
}
.time_to{
    text-align: center;
}
.time_sync{
    margin-left:1em;
}
.product_confirm{
    margin-left:1em;
}
.baseinfo{
    margin-top:20px;
}
.s_item{
    &:after{
        content:"、";
        display:inline-block;
    }
    &:last-child{
        &:after{
            content:"";
        }
    }
}
.semi{
    &:after{
        content:";";
        display:inline-block;
    }
    &:last-child{
        &:after{
            content:"";
        }
    }
}
</style>
