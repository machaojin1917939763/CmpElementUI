<template>
    <div class="fillcontain">
        uploadImg
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
