<template>
<div>
    <head-top></head-top>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="类型">
            <el-select v-model="ruleForm.partsname" placeholder="出入库类型" style="width: 90%;">
                <el-option label="出库" value="出库"></el-option>
                <el-option label="入库" value="入库"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="出/入库">
            <el-select v-model="ruleForm.partsmodel" placeholder="请选择出入库方式" style="width: 90%;">
                <el-option v-for="item in ruleForm.out" v-model="item.name">{{item.name}}</el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="出/入库日期" required >

            <el-col>
                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.partsloc" style="width: 90%;"></el-date-picker>
            </el-col>
        </el-form-item>
        <el-form-item label="配件">
            <el-select v-model="ruleForm.partsprodate" placeholder="请选择配件" style="width: 90%;">
                <el-option v-for="item in ruleForm.outType" v-text="item.partsname" v-model="item.partsname" value=""></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="出/入库数量">
            <el-input style="width: 90%" v-model="ruleForm.partsid"></el-input>
        </el-form-item>
        <el-form-item label="说明">
            <el-input style="width: 90%" v-model="ruleForm.partsremark"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm(ruleForm)">提交</el-button>
            <el-button @click="resetForm(ruleForm)">重置</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
import headTop from "../../components/headTop";
import axios from "axios";
export default {
    name: "partsOutIn",
    data() {
        return {
            ruleForm: {
                partsid: '',
                partsname: '',
                partsmodel: '',
                partsloc: '',
                partsprodate: '',
                partsremark: '',
                out:'',
                outType:''
            },
            rules: {
                name: [
                    {required: true, message: '请输入活动名称', trigger: 'blur'}
                ],
                region: [
                    {required: true, message: '请输入出入库类别', trigger: 'blur'}
                ],
                date1: [
                    { required: true, message: '请选择日期', trigger: 'blur'}
                ],
                type: [
                    {required: true, message: '请至少选择一个活动性质', trigger: 'blur'}
                ],
                resource: [
                    {required: true, message: '请选择活动资源', trigger: 'blur'}
                ],
                desc: [
                        {required: true, message: '请填写活动形式', trigger: 'blur'}
                    ]
            }
        }
    },
    components:{
        headTop
    },
    methods:{
        submitForm(ruleForm){
            console.log(ruleForm);
            axios.post("http://192.168.1.5/parts/add/3",ruleForm).then(res=>{
                this.$message(res.data.message);
            })
        },
        resetForm(ruleForm){
            this.ruleForm = "";
        }
    },
    mounted() {
        axios.get("http://192.168.1.5/parts/code").then(res=>{
                this.ruleForm.out = res.data.data;
                console.log(res.data.data);
        })
        axios.get("http://192.168.1.5/parts?page=1&pageSize=100").then(res=>{
            this.ruleForm.outType = res.data.data.records;
            console.log(res.data.data.records);
        })
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
