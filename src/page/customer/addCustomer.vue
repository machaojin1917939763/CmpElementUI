<template>
    <div>
        <head-top></head-top>
        <br>
        <div style="width: 50%;text-align: center;margin-left: 20%">
            <h2 style="text-align: center" v-text="message"></h2>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

            <el-form-item label="客户姓名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>

            <el-form-item label="客户电话" prop="tel">
                <el-input v-model="ruleForm.tel"></el-input>
            </el-form-item>

            <el-form-item label="客户车牌号" prop="carno">
                <el-input v-model="ruleForm.carno"></el-input>
            </el-form-item>

            <el-form-item label="客户车型" prop="cartype">
               <el-input v-model="ruleForm.cartype"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(ruleForm)">立即执行</el-button>
                <el-button @click="resetForm()" type="danger">取消</el-button>
            </el-form-item>
        </el-form></div>
    </div>

</template>

<script>
import headTop from '../../components/headTop'
import axios from "axios";
export default {
    components: {
        headTop,
    },
    name: "addCustomer",
    data() {
        return {
            message: "编辑客户",
            ruleForm: {
                name: '',
                tel: '',
                carno: '',
                cartype: '',
            },
            rules: {
                name: [
                    { required: true, message: '请输入客户姓名', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                tel: [
                    { required: true, message: '请输入客户电话', trigger: 'blur' },
                    { min:11,max:11, message: '电话号码格式错误', trigger: 'blur' }
                ],
                carno: [
                    { required: true, message: '请输入客户车牌号', trigger: 'blur' },
                ],
                cartype: [
                    { required: true, message: '请输入客户车类型', trigger: 'blur' },
                ],
            }
        };
    },
    methods: {
        submitForm(formName) {
            axios.post("http://192.168.1.5/customer",this.ruleForm).then(res=>{
                this.$message({
                    showClose: true,
                    message: '恭喜你，客户添加成功',
                    type: 'success'
                });
                this.resetForm();
            })
        },
        resetForm() {
            this.$router.push("/customerLIst")
        },
        getData: function (){
            var addrstr = location.href;
            var str = addrstr.substring(addrstr.lastIndexOf("?") + 1);
            if(str.length > 5){
               this.message = "新增客户";
            }else {
                axios.get("http://192.168.1.5/customer/" + str).then(res=>{
                    this.ruleForm = res.data.data;
                    console.log(res.data.data);
                })
            }
        }
    },
    created() {
        this.getData();
    }

}
</script>

<style scoped>

</style>
