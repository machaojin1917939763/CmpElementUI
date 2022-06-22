<template>
    <div>
        <head-top></head-top>
        <span style="width: 100%;margin-left: 1%">配件名称：<el-input style="width: 25%"></el-input><el-button style="position: relative;float: right;margin-right: 1%" type="primary" icon="el-icon-search">检索</el-button></span>
        <br>
        <el-button round type="primary" style="margin-left: 1%" @click="showVue">新增配件</el-button>
        <el-table
            :data="tableData"
            border
            style="width: 100%">


            <el-table-column
                label="序号"
            >
                <template scope="scope">
                    {{scope.$index}}
                </template>
            </el-table-column>



            <el-table-column
                prop="partsid"
                label="配件编码"
            >
            </el-table-column>

            <el-table-column
                prop="partsname"
                label="配件名称">
            </el-table-column>

            <el-table-column
                prop="partsmodel"
                label="配件型号">
            </el-table-column>

            <el-table-column
                prop="partsloc"
                label="生产厂家">
            </el-table-column>

            <el-table-column
                prop="partsprodate"
                label="生产日期">
            </el-table-column>

            <el-table-column
                prop="partsremark"
                label="备注">
            </el-table-column>

            <el-table-column
                prop="address"
                label="操作">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small" style="color: red">删除</el-button>
                    <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next"
            :total="total"
        align="center">
        </el-pagination>
    </div>
</template>

<script>
    import headTop from '@/components/headTop'
    import axios from "axios";
    import layer from "layui-layer"
    export default {
        name:"partsList",
        data() {
            return {
                tableData: [],
                currentPage: 1,
                pageSize: 10,
                total: 0
            }
        },
    	components: {
    		headTop
    	},
    	mounted(){
           axios.get("http://192.168.1.5/parts?page=" + this.currentPage + "&pageSize=" + this.pageSize).then(
               res=>{
                   this.tableData = res.data.data.records;
                   this.currentPage = res.data.data.current;
                   this.total = res.data.data.total;
           })
    	},
    	methods: {
            handleSizeChange(val) {
                this.total = val;
                axios.get("http://192.168.1.5/parts?page=" + this.currentPage + "&pageSize=" + val).then(
                    res=>{
                        this.tableData = res.data.data.records;
                        this.currentPage = res.data.data.current;
                        this.total = res.data.data.total;
                    })
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                axios.get("http://192.168.1.5/parts?page=" + val + "&pageSize=" + this.pageSize).then(
                    res=>{
                        this.tableData = res.data.data.records;
                        this.currentPage = res.data.data.current;
                        this.total = res.data.data.total;
                    })
                console.log(this.tableData);
            },
            showVue(){
                layer.open({
                    type: 2,
                    title: '配件出入库',
                    shadeClose: true,
                    shade: false,
                    maxmin: true, //开启最大化最小化按钮
                    area: ['893px', '600px'],
                    content: 'http://localhost:8002/#/addParts'
                });
            },
            handleClick(scope){
                axios.delete("http://192.168.1.5/parts/" + scope.partsid).then(
                    res=>{
                       this.$message.success("删除成功");
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

	.button_submit{
		text-align: center;
	}
	.avatar-uploader .el-upload {
	    border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
	}
	.avatar-uploader .el-upload:hover {
	    border-color: #20a0ff;
	}
	.avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 120px;
	    height: 120px;
	    line-height: 120px;
	    text-align: center;
	}
	.avatar {
	    width: 120px;
	    height: 120px;
	    display: block;
	}
	.el-table .info-row {
	    background: #c9e5f5;
	}

	.el-table .positive-row {
	    background: #e2f0e4;
	}
    .el-table-column{
        text-align: center
    }
    .el-table{
        margin: 1%;
    }
</style>
