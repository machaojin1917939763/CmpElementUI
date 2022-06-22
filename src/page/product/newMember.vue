<template>
    <div class="fillcontain">
        <head-top></head-top>
    </div>
</template>

<script>
import headTop from '../../components/headTop'
    export default {
    name: "newMember",
        components: {
            headTop,
            visitorPie,
        },
        //返回页面，页面进行刷新
        watch: {
            '$route'(to, from) {
                location.reload()
            }
        }
    }
</script>

<style lang="less">
</style>
