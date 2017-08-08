<template>
<div class="app">
    <loginBar></loginBar>
    <el-row>
        <el-col :span="3">
            <SideBar></SideBar>
        </el-col>

        <el-col :span="18"  v-if="data.subjectList">
            <subjectList :subjectList="data.subjectList"></subjectList>
        </el-col>
    </el-row>
    
</div>
</template>

<script>
import SideBar from '../common/components/sideBar.vue'
import LoginBar from '../common/components/loginBar.vue'
import SubjectList from './components/subjectList.vue'
export default {
    name: 'app',
    components: {
        SideBar,
        SubjectList,
        LoginBar
    },
    data() {
        return {

        }
    },
    props: {
        data: {}
    },
    mounted() {
        this.$store.dispatch('fetchSubjectList');
    },
    methods: {

    },
    computed: {

    }
}
</script>

<style scoped lang="less" rel="stylesheet/less">

</style>
