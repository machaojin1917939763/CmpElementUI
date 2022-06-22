<template>
   <div>
       <head-top></head-top>
       <div>
           <span style="width: 100%;margin-left: 1%">配件名称：<el-input style="width: 15%"></el-input>
               出/入库：
               <el-select v-model="name" placeholder="请选择">
                   <el-option
                  v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                    </el-option>
  </el-select>
               出入库类型：
               <el-select v-model="type" placeholder="请选择">
                   <el-option
                       v-for="item in options1"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
                    </el-option>
  </el-select>
               出入库日期：
               <el-input style="width: 15%" v-model="billtime"></el-input>
               <el-button style="position: relative;float: right;margin-right: 1%" type="primary">检索</el-button></span>
           <el-table
               :data="tableData"
               stripe
               style="width: 100%"
           >
               <el-table-column
                   label="序号" align="center">
                   <template scope="scope">
                       {{scope.$index}}
                   </template>
               </el-table-column>
               <el-table-column
                   label="出/入库"
                   width="180" align="center">
                   <template scope="scope">
                       <span v-if="scope.row.partsmodel === 'in'">入库</span>
                       <span v-else>出库</span>
                   </template>
               </el-table-column>
               <el-table-column
                   prop="partsname"
                   label="出入库类别"
                   width="180" align="center">
               </el-table-column>
               <el-table-column
                   prop="partsloc"
                   label="配件名称" align="center">
               </el-table-column>
               <el-table-column
                   prop="partsid"
                   label="数量" align="center">
               </el-table-column>

               <el-table-column
                   prop="partsprodate"
                   label="时间" align="center">
               </el-table-column>
               <el-table-column
                   prop="partsremark"
                   label="操作人" align="center">
               </el-table-column>
           </el-table>
       </div>
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
    import headTop from "../../components/headTop";
    import axios from "axios";
export default {
    name: "partsReptileList",
    components:{
        headTop
    },
    data() {
        return {
            name: '',
            type: '',
            billtime: '',
            currentPage: 1,
            pageSize: 10,
            total: 0,
            options: [{
                value: '选项1',
                label: '出库'
            }, {
                value: '选项2',
                label: '入库'
            }, ],
            options1: [{
                value: '选项1',
                label: '待填入'
            }, {
                value: '选项2',
                label: '待填入'
            }, ],
            tableData: []

        }

    },
    mounted() {
        axios.get("http://192.168.1.5/parts/bill?page=" + this.currentPage + "&pageSize=" + this.pageSize).then(res=>{
            this.tableData = res.data.data.records;
            this.currentPage = res.data.data.current;
            this.total = res.data.data.total;
        })
    },
    methods: {
        handleSizeChange(val) {
            this.total = val;
            axios.get("http://192.168.1.5/parts/bill?page=" + this.currentPage + "&pageSize=" + this.pageSize).then(res=>{
                this.tableData = res.data.data.records;
                this.currentPage = res.data.data.current;
                this.total = res.data.data.total;
            })
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            axios.get("http://192.168.1.5/parts/bill?page=" + this.currentPage + "&pageSize=" + this.pageSize).then(res=>{
                this.tableData = res.data.data.records;
                this.currentPage = res.data.data.current;
                this.total = res.data.data.total;
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

<style scoped>

</style>
