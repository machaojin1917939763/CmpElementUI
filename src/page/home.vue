<template>
    <div>
        <head-top></head-top>
        <div>
            <img src="../../screenshots/welcome.jpg" alt="">

        </div>
        <div style="position: relative;float: bottom;margin-left: 50%;width: 100%;height: 2%;bottom: 0">
            <span style="text-align: center">Power By @马超金
            </span></div>
    </div>
</template>

<script>
	import headTop from '../components/headTop'
    export default {
    	components: {
    		headTop,
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
    img{
        margin-top: 15%;
        margin-left: 23%;
    }
</style>
