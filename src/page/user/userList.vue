<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="father" align="center" style="margin-top: 5%">
            <span style="text-align: center">用户姓名：<el-input style="width: 25%" v-model="username"></el-input>          姓名：<el-input style="width: 25%" v-model="name"></el-input>
                <el-input type="text" :disabled="true" style="width: 4%"></el-input>
            <el-button type="primary" @click="getEmp">检索</el-button>
            <el-button type="primary" @click="addUser">添加用户</el-button></span>
        </div>
        <div class="table_container">
            <el-table
                :data="tableData"
                style="width: 100%" align="center">
                <el-table-column
                    prop="id"
                    label="序号"
                    width="300"
                    align="center">
                </el-table-column>

                <el-table-column
                    label="用户姓名"
                    width="180"
                    align="center">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top">
                            <p>姓名: {{ scope.row.name }}</p>
                            <p>住址: {{ scope.row.sex }}</p>
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium" type="primary">{{ scope.row.name }}</el-tag>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="dept"
                    label="用户名"
                    width="300"
                    align="center">
                </el-table-column>

                <el-table-column
                    label="日期"
                    width="180"
                    align="center">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.hiredate }}</span>
                    </template>
                </el-table-column>



                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 30, 40]"
                    v-bind:page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="count">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import headTop from '../../components/headTop'
    import axios from "axios";
    export default {
        data(){
            return {
                pageSize: 10,
                tableData: [],
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,
                username: "",
                name: ""
            }
        },
    	components: {
    		headTop,
    	},
        created(){
            this.initData();
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            handleSizeChange(){

            },
            handleCurrentChange(){

            },
            getEmp:function (){
                axios.get("http://192.168.1.5/user?page=" + this.currentPage + "&pageSize=" + this.pageSize
                 + "&username=" + this.username + "&name=" + this.name).then(res=>{
                    this.tableData = res.data.data.records;
                    this.count = res.data.data.total;
                    this.currentPage = res.data.data.pages;
                    console.log(this.tableData);
                })
            },
            addUser:function (){
                this.$router.push("/addUser");
            }
        },
        mounted() {
            axios.get("http://192.168.1.5/user?page=" + this.currentPage + "&pageSize=" + this.pageSize).then(res=>{
                this.tableData = res.data.data.records;
                this.count = res.data.data.total;
                this.currentPage = res.data.data.pages;
                console.log(this.tableData);
            })
        },
        watch:{
            '$route'(to,from){
                location.reload()
            }
        }
    }
</script>

<style lang="less">
    .table_container{
        padding: 20px;
    }

    .father{
        width: 100%;
    }
    .block{
        text-align: center;
    }
</style>
