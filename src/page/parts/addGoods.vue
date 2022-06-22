<template>
    <div>
     	<head-top></head-top>
        <span style="width: 100%;margin-left: 1%">配件名称：<el-input style="width: 25%"></el-input>配件编码：<el-input style="width: 25%"></el-input><el-button style="position: relative;float: right;margin-right: 1%" type="primary" icon="el-icon-search">检索</el-button></span>
        <div>
            <el-button type="primary" @click="open">配件出入库</el-button>
        </div>
        <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
                label="序号"
                align="center"
            >
                <template scope="scope">
                    {{scope.$index}}
                </template>
            </el-table-column>
            <el-table-column
                prop="partsid"
                label="配件编码"
                align="center"
                >
            </el-table-column>
            <el-table-column
                prop="partsname"
                label="配件名称"
                align="center">
            </el-table-column>
            <el-table-column
                prop="partsmodel"
                label="库存数量"
                align="center">
            </el-table-column>
        </el-table>
        <div class="page"><el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next"
            :total="total">
        </el-pagination></div>
    </div>
</template>

<script>
 	import headTop from '@/components/headTop'
    import axios from "axios";
     import layer from "layui-layer";
    export default {
    	data(){
    		return {
                currentPage: 1,
                pageSize: 10,
                total: 0,
                tableData: []
    		}
    	},
    	components: {
    		headTop,
    	},
    	created(){
            axios.get("http://192.168.1.5/parts/out?page=" + this.currentPage +
            "&pageSize=" + this.pageSize).then(res=>{
                this.tableData = res.data.data.records;
                this.total = res.data.data.total;
                this.currentPage = res.data.data.current;
            })
    	},
    	computed: {

    	},
    	methods: {
            handleSizeChange(val) {
                this.total = val;
                axios.get("http://192.168.1.5/parts/out?page=" + this.currentPage +
                    "&pageSize=" + val).then(res=>{
                    this.tableData = res.data.data.records;
                    this.total = res.data.data.total;
                    this.currentPage = res.data.data.current;
                })
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                axios.get("http://192.168.1.5/parts/out?page=" + val +
                    "&pageSize=" + this.pageSize).then(res=>{
                    this.tableData = res.data.data.records;
                    this.total = res.data.data.total;
                    this.currentPage = res.data.data.current;
                })
            },
            //iframe 层
            open(){
                layer.open({
                    type: 2,
                    title: '配件选择页面',
                    shadeClose: true,
                    shade: false,
                    maxmin: true, //开启最大化最小化按钮
                    area: ['893px', '600px'],
                    content: 'http://localhost:8002/#/partsOutIn'
                });
            },
            //返回页面，页面进行刷新
            watch: {
                '$route'(to, from) {
                    location.reload()
                }
            }
		}
    }
</script>

<style lang="less">
  .page{
      position: relative;
      float: left;
      margin-left: 40%;
  }
</style>
