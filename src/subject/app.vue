<template>
<div class="app">
    <loginBar></loginBar>
    <el-row>
        <el-col :span="3">
            <SideBar></SideBar>
        </el-col>

        <el-col :span="18" v-if="data.subject">
            <subject :subject="data.subject"></subject>
        </el-col>
    </el-row>
    
</div>
</template>

<script>
import qs from "qs"
import SideBar from '../common/components/sideBar.vue'
import LoginBar from '../common/components/loginBar.vue'
import subject from './components/subject.vue'
export default {
    name: 'app',
    components: {
        SideBar,
        subject,
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
        let qsObj = qs.parse(location.search.slice(1));
        let subjectId = qsObj.subjectId;
        this.$store.dispatch('fetchSubject',{subjectId});
    },
    methods: {

    },
    computed: {

    }
}
</script>

<style scoped lang="less" rel="stylesheet/less">

</style>
