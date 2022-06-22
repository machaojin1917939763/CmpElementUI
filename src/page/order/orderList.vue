<template>
    <div class="fillcontain">
        <head-top></head-top>
        <span>订单编码：<el-input style="width: 27%"></el-input> 订单保存时间：<el-input style="width: 27%"></el-input>订单状态：
            <el-select v-model="value" placeholder="请选择" style="width: 15%">
    <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
    </el-option>
  </el-select>
            <el-button type="primary" @click="text()">检索</el-button>
        </span>
        <div class="table_container">
            <el-table
			    :data="tableData"
			    @expand='expand'
                :expand-row-keys='expendRow'
                :row-key="row => row.index"
			    style="width: 100%"
            >
			    <el-table-column
			      label="序号"
			      prop="orderid"
                  align="center"
                >
			    </el-table-column>

			    <el-table-column
			      label="订单编码"
			      prop="ordercode"
                  align="center">
			    </el-table-column>

                <el-table-column
                    label="订单保存时间"
                    prop="orderdate"
                    align="center">
                </el-table-column>

			    <el-table-column
			      label="订单状态"
                  align="center"
                prop="orderflag">
			    </el-table-column>

                <el-table-column
                    label="操作"
                    prop="status"
                    align="center">
                    <template scope="scope">
                        <span v-if="scope.row.orderflag ==='待审核'">
                        <el-button type="primary" >通过</el-button>
                        <el-button type="danger" >不通过</el-button>
                    </span>
                    </template>

                </el-table-column>
			</el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="pageSize"
                  layout="total, prev, pager, next"
                  :total="count">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import headTop from '../../components/headTop'
    import axios from "axios";
    import layer from "layui-layer"
    export default {
        name: "orderList",
        data() {
            return {
                tableData: [],
                currentRow: null,
                offset: 0,
                limit: 10,
                count: 0,
                currentPage: 1,
                pageSize:10,
                restaurant_id: null,
                expendRow: [],
                value: '',
                options: [{
                    value: '选项1',
                    label: '未通过'
                }, {
                    value: '选项2',
                    label: '已通过'
                }, {
                    value: '选项3',
                    label: '待审核'
                }, ],

            }
        },
        components: {
            headTop,
        },
        created() {
            axios.get("http://192.168.1.5/order?page=" + this.currentPage + "&pageSize=" + this.limit).then(res=>{
                this.tableData = res.data.data.records;
                this.count = res.data.data.total;
                this.currentPage = res.data.data.current;
            })
        },
        methods: {
            handleSizeChange(val){
                this.limit = val;
                axios.get("http://192.168.1.5/order?page=" + this.currentPage + "&pageSize=" + val).then(res=>{
                    this.tableData = res.data.data.records;
                    this.count = res.data.data.total;
                    this.currentPage = res.data.data.current;
                })
            },
            handleCurrentChange(val){
                this.currentPage = val;
                axios.get("http://192.168.1.5/order?page=" + val + "&pageSize=" + this.limit).then(res=>{
                    this.tableData = res.data.data.records;
                    this.count = res.data.data.total;
                    this.currentPage = res.data.data.current;
                })
            },

            //弹窗管理
            text(){
               layer.open({
                    type: 2,
                    title: '很多时候，我们想最大化看，比如像这个页面。',
                    shadeClose: true,
                    shade: false,
                    maxmin: true, //开启最大化最小化按钮
                    area: ['893px', '600px'],
                    content: '/addUser'
                });
            }
        },
        mounted() {

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
    .table_container{
        padding: 20px;
    }
    .demo-table-expand {
	    font-size: 0;
	}
	.demo-table-expand label {
	    width: 90px;
	    color: #99a9bf;
	}
	.demo-table-expand .el-form-item {
	    margin-right: 0;
	    margin-bottom: 0;
	    width: 50%;
	}
    .Pagination{
        position: relative;
        float: left;
        margin-left: 40%;
    }
</style>
