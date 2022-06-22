<template>
  <div>
      <headTop></headTop>
      <div>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="配件名称：" prop="partsname">
                  <el-input v-model="ruleForm.partsname"></el-input>
              </el-form-item>
              <el-form-item label="规格型号：" prop="partsmodel">
                  <el-input v-model="ruleForm.partsmodel"></el-input>
              </el-form-item>
              <el-form-item label="生成厂家：" prop="partsloc">
                  <el-input v-model="ruleForm.partsloc"></el-input>
              </el-form-item>
              <el-form-item label="生产日期：" prop="partsprodate">
                  <el-date-picker
                      v-model="ruleForm.partsprodate"
                      type="date"
                      placeholder="选择日期"
                  style="width: 100%">
                  </el-date-picker>
              </el-form-item>
              <el-form-item label="备注：" prop="partsremark">
                  <el-input
                      type="textarea"
                      autosize
                      placeholder="请输入内容"
                      v-model="ruleForm.partsremark">
                  </el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" @click="submitForm(ruleForm)">保存</el-button>
                  <el-button @click="resetForm()">返回</el-button>
              </el-form-item>
          </el-form>
      </div>
  </div>
</template>

<script>
import headTop from '../../components/headTop'
import layer from "layui-layer";
import axios from "axios";
export default {
    name: "addParts",
    components:{
        headTop
    },
    data() {
        return {
            ruleForm: {
                name: '',
                region: '',
                delivery: false,
                type: [],
                resource: '',
                desc: '',
                partsname:'测试数据',
                partsloc: '测试数据',
                partsprodate: '2022-6-15',
                partsmodel: '测试数据',
                partsremark:'测试数据'




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

            rules: {
                partsname: [
                    { required: true, message: '请填写配件名字', trigger: 'blur' }
                ],
                partsloc: [
                    { required: true, message: '请填写配件生产厂家', trigger: 'blur' }
                ],
                partsprodate: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'blur' }
                ],
                partsmodel: [
                    {  required: true, message: '请填写配件型号', trigger: 'blur' }
                ],
                partsremark: [
                    { required: true, message: '请填写备注', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        submitForm(formName) {
            console.log(formName);
            axios.post("http://192.168.1.5/parts",formName).then(res=>{
                this.$message.success("添加成功，请点击 X 退出");
            })
        },
        resetForm() {
            this.$message.error("已取消，请点击 X 退出");
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
