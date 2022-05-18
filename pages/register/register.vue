<template>
	<view>
		<uni-nav-bar leftIcon="back" @clickLeft="backAction" title="注册" backgroundColor="#01a4ff" color="#fff"
			statusBar=true />
	    <view class="head">
			<image src="../../static/login_icon.jpg" class="image"></image>
			<text class="text">注册</text>
		</view>
		<input placeholder="请输入用户名" class="input-account" v-model="account"/>
		<input placeholder="请输入密码" class="input-pwd" v-model="password"/>
		<input placeholder="请再次输入密码" class="input-pwd" v-model="confpassword"/>
		<button class="buttom" @click="register" :loading="isLoading">立即注册</button>
		<view class="register"  @click="backAction" >
			<text class="text-regs">已有账号?立即登录</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				repassword:"",
				account:"",
				password:"",
				isLoading:false
			}
		},
		methods: {
			backAction(){
				uni.navigateBack()
			},
			async register(){
				if(!this.account || !this.password || !this.repassword){
					uni.showToast({
						title:"请输入用户名和密码",
						position:"bottom",
						icon:"none"
					})
					return
				}
				this.isLoading = true
				const res = await this.$myWebHttp({
					url: "user/register="+this.account+"&&password="+this.password,
					method:"POST"
				})
				this.isLoading = false
				console.log("注册状态:", res.data)
				if(res.data.errorCode == 0){
					uni.showToast({
						title:"注册成功",
						position:"bottom",
						icon:"none"
					})
					uni.navigateBack()
				}else{
					uni.showToast({
						title:res.data.errorMsg,
						position:"bottom",
						icon:"none"
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.head{
		width: 750rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.image{
			width: 100px;
			height: 100px;
			margin-top: 60px;
			border-radius: 50%;
		}
		.text{
			color: $uni-color-primary;
			font-size: 26px;
			margin-top: 5px;
		}
	}
	.text-regs{
		text-decoration: underline;
		color: $uni-color-primary;
	}
	.buttom{
		margin-left: 50px;
		margin-right: 50px;
		margin-top: 30px;
		margin-bottom: 10px;
		background-color: $uni-color-primary;
		color: #ffffff;
		border-radius: 50px;
	}
	.register{
		margin-left: 50px;
		margin-right: 50px;
		display: flex;
		justify-content: flex-end;
	}
	.input-account{
		background-color: #ffffff;
		border: 1px solid $uni-color-primary;
		border-radius: 20px;
		margin-top: 50px;
		margin-left: 50px;
		margin-right: 50px;
		padding: 10px;
	}
	.input-pwd{
		background-color: #ffffff;
		border: 1px solid $uni-color-primary;
		border-radius: 20px;
		margin-left: 50px;
		margin-right: 50px;
		margin-top: 30px;
		padding: 10px;
	}
	.square{
		width: 100%;
		background-color: $uni-color-primary;
		height: 80px;
		border-radius:0 0 80% 80%;
		z-index: -1;
	}
</style>
