<template>
    <div class="fillcontain">
        sendMessage
    </div>
</template>

<script>
    export default {
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
