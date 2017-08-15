<template>
    <div class="content">
        <keep-alive>
            <component v-bind:is="currentView"></component>
        </keep-alive>
    </div>
</template>

<script>
import {components} from '../../index/components';
export default {
    data () {
        return {
        }
    },
    computed: {
        currentView () {
            return this.$store.state.currentView;
        }
    },
    components
}
</script>