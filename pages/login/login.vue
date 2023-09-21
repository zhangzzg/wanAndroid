<template>
	<view>
		<view class="head">
			<view class="close_btn iconfont icon-close" @click="close"></view>
			<image src="../../static/login_icon.jpg" class="image"></image>
			<text class="text">登录</text>
		</view>
		<view class="square" />
		<input placeholder="请输入用户名" class="input-account" v-model="account" />
		<input placeholder="请输入密码" class="input-pwd" v-model="password" />
		<button class="buttom" @click="login" :loading="islogin">立即登录</button>
		<view class="register" @click="btnregister">
			<text class="text-regs">没有账号?立即注册</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				account: "19977293395",
				password: "zhang1234",
				islogin: false
			}
		},
		methods: {
			close() {
				uni.navigateBack()
			},
			btnregister() {
				uni.navigateTo({
					url: '../register/register'
				})
			},
			async login() {
				if (!this.account || !this.password) {
					uni.showToast({
						title: "请输入用户名和密码",
						position: "bottom",
						icon: "none"
					})
					return
				}
				this.islogin = true
				const res = await this.$myWebHttp({
					url: "user/login?username=" + this.account + "&&password=" + this.password,
					method: "POST"
				})
				this.islogin = false
				if (res.data.errorCode == 0) {
					console.log("登录成功,用户名：", res.data.data.username)
					uni.setStorageSync("username", res.data.data.username)
					uni.$emit("login")
					uni.navigateBack()
				} else {
					console.log("登录失败,用户名：", res.data)
					uni.showToast({
						title: res.data.errorMsg,
						position: "bottom",
						icon: "none"
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.head {
		width: 750rpx;
		height: 220px;
		background-color: $uni-color-primary;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;

		.image {
			width: 100px;
			height: 100px;
			border-radius: 50%;
		}

		.text {
			color: white;
			font-size: 26px;
		}
	}

	.close_btn {
		position: absolute;
		top: 50px;
		left: 30px;
		font-size: 24px;
		color: #fff;
	}

	.text-regs {
		text-decoration: underline;
		color: $uni-color-primary;
	}

	.buttom {
		margin-left: 50px;
		margin-right: 50px;
		margin-top: 30px;
		margin-bottom: 10px;
		background-color: $uni-color-primary;
		color: #ffffff;
		border-radius: 50px;
	}

	.register {
		margin-left: 50px;
		margin-right: 50px;
		display: flex;
		justify-content: flex-end;
	}

	.input-account {
		background-color: #ffffff;
		border: 1px solid $uni-color-primary;
		border-radius: 20px;
		margin-top: 50px;
		margin-left: 50px;
		margin-right: 50px;
		padding: 10px;
	}

	.input-pwd {
		background-color: #ffffff;
		border: 1px solid $uni-color-primary;
		border-radius: 20px;
		margin-left: 50px;
		margin-right: 50px;
		margin-top: 30px;
		padding: 10px;
	}

	.square {
		width: 100%;
		background-color: $uni-color-primary;
		height: 80px;
		border-radius: 0 0 80% 80%;
		z-index: -1;
	}
</style>
