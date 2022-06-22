<template>
  <div> <head-top></head-top>
      <div style="width: 100%;margin-left: 45%;margin-top: 2%"><h1 v-text="messages"></h1></div>
   <div style="width: 50%;text-align: center;margin-left: 20%;margin-top: 3%">

       <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

           <el-form-item label="用户姓名" prop="name">
               <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
           </el-form-item>

           <el-form-item label="用户名" prop="loginname">
               <el-input type="text" v-model="ruleForm.loginname" autocomplete="off"></el-input>
           </el-form-item>

           <el-form-item label="出生日期" prop="hiredate">
               <el-date-picker
                   v-model="ruleForm.hiredate"
                   type="date"
                   placeholder="选择出生日期"
                   style="width: 100%">
               </el-date-picker>
           </el-form-item>

           <el-form-item label="选择部门" prop="dept">
               <el-autocomplete
                   class="inline-input"
                   v-model="ruleForm.dept"
                   :fetch-suggestions="querySearch"
                   placeholder="请选择部门"
                   @select="handleSelect"
                   style="width: 100%"
               ></el-autocomplete>
           </el-form-item>


           <el-form-item label="性别" prop="sex">
               <el-switch
                   v-model="ruleForm.sex"
                   active-color="#13ce66"
                   inactive-color="#ff4949"
                   active-value="男"
                   inactive-value="女">
               </el-switch>
               <el-button v-if="ruleForm.sex" type="primary">男</el-button>
               <el-button v-else type="danger">女</el-button>

           </el-form-item>

           <el-form-item label="密码" prop="LoginPwd">
               <el-input type="password" v-model="ruleForm.loginpwd" autocomplete="off"></el-input>
           </el-form-item>

           <el-form-item label="确认密码" prop="checkPass">
               <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
           </el-form-item>


           <el-form-item>
               <el-button type="primary" @click="submitForm(ruleForm)">提交</el-button>
               <el-button @click="resetForm()">取消</el-button>
           </el-form-item>
       </el-form>
   </div>
  </div>
</template>

<script>
import headTop from "../../components/headTop";
import axios from "axios";
export default {
    components:{
        headTop
    },
    name: "addUser",
    data() {
        return {
            messages : "新增用户",
            restaurants: [],
            ruleForm: {
                loginpwd: '',
                checkPass: '',
                LoginName: '',
                name: '',
                dept: '',
                value: '男',
                sex:'男',
                hiredate: ''

            },
            rules: {
                name: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                loginpwd: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 8, message: '长度在 6 到 8 个字符', trigger: 'blur' }
                ],
                checkPass: [
                    { required: true, message: '请再次输入密码', trigger: 'blur' },
                    { min: 6, max: 8, message: '长度在 6 到 8 个字符', trigger: 'blur' }
                ],
                loginname: [
                    { required: true, message: '请输入用户姓名', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
            },
        pickerOptions: {
            disabledDate(time) {
                return time.getTime() > Date.now();
            },
            shortcuts: [{
                text: '今天',
                onClick(picker) {
                    picker.$emit('pick', new Date());
                }
            }, {
                text: '昨天',
                onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24);
                    picker.$emit('pick', date);
                }
            }, {
                text: '一周前',
                onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', date);
                }
            }]
        },

        };
    },
    methods: {
        submitForm(formName) {
            if(this.ruleForm.name === null){
                this.$message({
                    showClose: true,
                    message: '用户名不能为空',
                    type: 'error'
                });
            }
            if(this.ruleForm.loginname === null){
                this.$message({
                    showClose: true,
                    message: '用户姓名不能为空',
                    type: 'error'
                });
            }
            if(this.ruleForm.loginpwd === null ||this.ruleForm.checkPass === null ){
                this.$message({
                    showClose: true,
                    message: '密码不能为空',
                    type: 'error'
                });
            }
            if(this.ruleForm.loginpwd !== this.ruleForm.checkPass){
                this.$message({
                    showClose: true,
                    message: '两次密码不一样',
                    type: 'error'
                });
            }
            axios.post("http://192.168.1.5/user",this.ruleForm).then(res=>{
                console.log(this.ruleForm);
                this.$message({
                    showClose: true,
                    message: '添加用户成功',
                    type: 'success'
                });
                this.resetForm();
            })
        },
        resetForm() {
            this.$router.push("/userList");
        },
        querySearch(queryString, cb) {
            var restaurants = this.restaurants;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter(queryString) {
            return (restaurant) => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        loadAll() {
            return [
                { "value": "销售部"},
                { "value": "研发部"},
                { "value": "财务部"},
            ];
        },
        handleSelect(item) {
            console.log(item);
        }
    },
    mounted() {
        this.restaurants = this.loadAll();
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
