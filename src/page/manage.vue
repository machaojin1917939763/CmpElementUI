<template>
	<div class="manage_page fillcontain">
		<el-row style="height: 100%;">
	  		<el-col :span="4"  style="min-height: 100%; background-color: #324057;">
				<el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
					<el-menu-item index="manage"><i class="el-icon-menu"></i>首页</el-menu-item>
					<el-submenu index="2">
						<template slot="title"><i class="el-icon-document"></i>订单模块</template>
                        <el-menu-item index="shopList">订单管理</el-menu-item>
                        <el-menu-item index="orderList">订单审核</el-menu-item>
					</el-submenu>
					<el-submenu index="3">
						<template slot="title"><i class="el-icon-plus"></i>配件模块</template>
                        <el-menu-item index="partsList">配件管理</el-menu-item>
                        <el-menu-item index="addGoods">配件出入库管理</el-menu-item>
                        <el-menu-item index="partsReptileList">配件出入库流水查询</el-menu-item>
					</el-submenu>
					<el-submenu index="4">
						<template slot="title"><i class="el-icon-star-on"></i>产品信息</template>
						<el-menu-item index="visitor">产品管理</el-menu-item>
						<el-menu-item index="newMember">组装管理</el-menu-item>
						<el-menu-item index="uploadImg">上线管理</el-menu-item>
						<el-menu-item index="explain">下线信息</el-menu-item>
					</el-submenu>
					<el-submenu index="5">
						<template slot="title"><i class="el-icon-edit"></i>物资合同</template>
						<el-menu-item index="vueEdit">配件合同管理</el-menu-item>
						<el-menu-item index="constratProduct">产品销售管理</el-menu-item>
					</el-submenu>
					<el-submenu index="6">
						<template slot="title"><i class="el-icon-setting"></i>系统管理</template>
						<el-menu-item index="userList">用户管理</el-menu-item>
						<el-menu-item index="customerLIst">客户管理</el-menu-item>
						<el-menu-item index="adminList">出入库类型管理</el-menu-item>
						<el-menu-item index="sendMessage">订单状态管理</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-col>
			<el-col :span="20" style="height: 100%;overflow: auto;">
				<keep-alive>
				    <router-view></router-view>
				</keep-alive>
			</el-col>
		</el-row>
  	</div>
</template>

<script>
    export default {
		computed: {
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			}
		},
    }
</script>
<style lang="less" scoped>
	@import '../style/mixin';
	.manage_page{

	}
</style>
