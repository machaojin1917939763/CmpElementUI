<template>

    <div>
        <head-top></head-top>
        <el-input value="请输入姓名：" placeholder="请输入内容" style="width: 95%" v-model="name"></el-input><el-button @click="getCus"> 检索</el-button>
       <el-button id="button" type="primary" round @click="open">新增用户</el-button><br><br><br><br>
        <span v-text="time"></span>
        <div >
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                    prop="name"
                    label="客户姓名"
                align="center">
                </el-table-column>
                <el-table-column
                    prop="tel"
                    label="电话"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="carno"
                    label="车牌号"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="cartype"
                    label="车型"
                    align="center">
                </el-table-column>

                <el-table-column
                    label="操作"
                    align="center"
                > <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small" style="color: red">删除</el-button>
                    <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
                </template>
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage4"
                    :page-sizes="[10, 20, 30, 40]"
                    v-bind:page-size="pageSize"
                    layout="total, sizes, prev, pager, next"
                    :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
	import headTop from '../../components/headTop';
    import footer from "../../components/footer";
    import axios from "axios";
    import addCustomer from "./addCustomer";
    export default {
        comments:
            {
                addCustomer
            } ,
        data(){
            return {
                total: 0,
                pageSize: 10,
                tableData: [],
                currentPage4: 1,
                name: "",
                cusData: [],
                time:""
            }
        },
    	components: {
    		headTop,
            footer
    	},
        methods: {
            handleClick(row) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                   axios.delete("http://192.168.1.5/customer/" + row.id).then(res=>{
                       this.$message({
                           type: 'success',
                           message: '删除成功!'
                       });
                       location.reload();
                   })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
                console.log(row);
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            open() {
                //实现页面跳转
                this.$router.push({
                    path:'/addCustomer',
                    params: {
                        cusData: 1
                    }
                });
            },
            //分页查询数据
            getCus:function (){
                axios.get("http://192.168.1.5/customer?page=" + this.currentPage4 + "&pageSize=" + this.pageSize + "&name=" + this.name).then(res=>{
                    this.tableData = res.data.data.records;
                    this.total = res.data.data.total;
                    this.currentPage4 = res.data.data.pages;
                })
            },
            edit: function (row){
                this.$router.push({
                    path:'/addCustomer?' + row.id,
                });
            }
        },
        mounted() {
            axios.get("http://192.168.1.5/customer?page=" + this.currentPage4 + "&pageSize=" + this.pageSize + "&name=" + this.name).then(res=>{
                this.tableData = res.data.data.records;
                this.total = res.data.data.total;
                this.currentPage4 = res.data.data.pages;
                this.time = new Date().toTimeString();
            })
        },
        //返回页面，页面进行刷新
        watch:{
            '$route'(to,from){
                location.reload()
            }
        }
    }
</script>

<style lang="less">
	#button{
        position: relative;
        float: left;
        margin-left: 0;
    }
    .block{
        position: relative;
        float: left;
        margin-left: 35%;
    }
    el-table-column{
        text-align: center;
    }
    .main{
        width: 80%;
        height: 70%;
        margin-left: 2%;
        margin-right: 10%;
    }
</style>
