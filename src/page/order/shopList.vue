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
            <el-button type="primary" @click="text()" icon="el-icon-search">检索</el-button>
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
                        <el-button type="text" icon="el-icon-edit" v-if="scope.row.orderflag !== '已通过'">修改</el-button>
                        <el-button type="text" icon="el-icon-share" style="color: dodgerblue" @click="showMessage(scope.row)">查看</el-button>
                        <el-button type="text" icon="el-icon-delete" style="color: red" @click="deleteList(scope.row.orderid)">删除</el-button>
                    </template>

                </el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: center;margin-top: 10px;">
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
    import {baseUrl, baseImgPath} from '@/config/env'
    import {cityGuess, getResturants, getResturantsCount, foodCategory, updateResturant, searchplace, deleteResturant} from '@/api/getData'
    import axios from "axios";
    import layer from "layui-layer";
    export default {
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
            },
            showMessage(row){
                //自定页
                layer.msg('序号：' + row.orderid + '<br>订单编码：'+ row.ordercode + '<br>订单保存时间：' + row.orderdate + '<br>订单状态：' + row.orderflag, {icon: 4});
            },
            deleteList(id){
               axios.delete("http://192.168.1.5/order/" + id).then(res=>{
                   this.$message("删除成功");
                   //页面更新
                   this.handleCurrentChange(this.currentPage);
               })
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

<style>


</style>
