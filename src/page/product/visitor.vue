<template>
    <div>
        <head-top></head-top>
        <div style="margin-top: 2%">
            <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
                prop="productid"
                label="序号"
                align="center"
                >
            </el-table-column>
            <el-table-column
                prop="productcode"
                label="产品编码"
                align="center"
               >
            </el-table-column>
            <el-table-column
                prop="productname"
                label="产品名称"
                align="center">
            </el-table-column>
                <el-table-column
                    prop="productremark"
                    label="产品状态"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="操作"
                    align="center">
                    <template scope="scope">
                        <el-button type="text">编辑</el-button>
                        <el-button type="text" style="color: blueviolet" @click="showMessage(scope.row)">查看</el-button>
                        <el-button type="text" style="color: red" @click="deleteProduct(scope.row.productid)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div style="margin-left: 30%">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
	import headTop from '../../components/headTop'
    import axios from "axios";
    import layer from "layui-layer";
    export default {
    	data(){
    		return {
                currentPage: 1,
                total: 0,
                pageSize : 10,
                tableData: []
    		}
    	},
    	components: {
    		headTop,
    	},
    	mounted(){
            axios.get("http://192.168.1.5/product?page=" + this.currentPage + "&pageSize=" + this.pageSize).then(res=>{
                this.tableData = res.data.data.records;
                console.log(this.tableData);
                this.total = res.data.data.total;
                this.currentPage = res.data.data.current;
            })
    	},
    	methods: {
            handleSizeChange(val) {
                this.pageSize = val;
                axios.get("http://192.168.1.5/product?page=" + this.currentPage + "&pageSize=" + this.pageSize).then(res=>{
                    this.tableData = res.data.data.records;
                    this.total = res.data.data.total;
                    this.currentPage = res.data.data.current;
                })
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                axios.get("http://192.168.1.5/product?page=" + this.currentPage + "&pageSize=" + this.total).then(res=>{
                    this.tableData = res.data.data.records;
                    this.total = res.data.data.total;
                    this.currentPage = res.data.data.current;
                }
                )
            },
            showMessage(row){
                //自定页
                layer.msg('序号：' + row.productid + '<br>产品编码：'+ row.productcode + '<br>成品名称：' + row.productname + '<br>产品状态：' + row.productremark, {icon: 4});
            },
            deleteProduct(id){
                axios.delete("http://192.168.1.5/product/" + id).then(res=>{
                    this.$message(res.data.message);
                    this.handleCurrentChange(this.currentPage);
                })
            }

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
