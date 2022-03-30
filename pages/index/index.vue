<template>
	<view>
		<view class="content">
			<view>
				<uni-nav-bar left-icon="settings" title="查询天气" backgroundColor="#007AFF" color="#fff"
					@clickLeft="showDrawer()" statusBar="true" />
			</view>
			<view class="head">
				<input class="input" type="text" placeholder="请输入内容" v-model="message">
			</view>
			<!-- 天气列表 -->
			<view>
				<view class="item" v-for="(item,index) in citys" @click="itemClick(item)">
					<text class="city">{{item.name}}</text>
					<text class="city_info">{{item.formatted_address}}</text>
					<view class="line"></view>
				</view>
			</view>

			<uni-drawer ref = "showLeft" mode="left" :mask-click="false"  class="drawer">
				<view class="drawer_conten">
					<!-- <text v-for="item in 10" :key="item">可滚动内容 {{ item }}</text> -->
				</view>
				<button class="button_class" @click="closeDrawer" type="primary">关闭</button>
			</uni-drawer>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				message: "",
				citys: []
			}
		},
		
		onLoad() {
			this.getCitys()
		},
		
		onPullDownRefresh() {
			this.getCitys()
		},
		
		watch:{
			message(newValue){
				console.log("获取输入名称",newValue)
				this.message = newValue
				this.getCitys()
			}
		},
		
		methods: {
			showDrawer(e) {
				console.log("showDrawer",e)
				this.$refs.showLeft.open();
			},
			closeDrawer() {
				this.$refs.showLeft.close();
			},
			itemClick(item) {
				console.log("点击事件", item)
				uni.navigateTo({
					url: "./wetherdetail?lat=" + item.location.lat + "&lng=" + item.location.lng + "&message=" + this
						.message
				})
			},
			async getCitys() {
				const res = await this.$myHttp({
					url: "v2/place?token=${" + this.$myConstan + "}&lang=zh_CN",
					data: {
						query: this.message
					}
				})
				uni.stopPullDownRefresh()
				console.log("城市列表：", res.data.places)
				this.citys = res.data.places
			}
		},
	}
</script>

<style lang="scss">
	.content {
		width: 100vw;
		height: 100vh;
	}
	
    .drawer{
		display: flex;
		.drawer_conten{
			height: 90%;
		}
		.button_class{
			margin: 20rpx;
		}
	}
	
	.head {
		width: 100%;
		height: 110rpx;
		background-color: #007AFF;
		display: flex;
		align-items: center;
		
		.input {
			width: 750rpx;
			background-color: #FFFFFF;
			margin-left: 20rpx;
			margin-right: 20rpx;
			padding-top: 10rpx;
			padding-bottom: 10rpx;
			padding-left: 10rpx;
			border: #999999 1px solid;
			border-radius: 5px;
			color: #999999;
		}
	}

	.item {
		display: flex;
		flex-direction: column;
		padding-left: 20rpx;
		padding-right: 20rpx;
		justify-content: space-between;

		.city {
			color: #333;
			font-size: 36rpx;
			padding-top: 10rpx;
		}

		.city_info {
			color: #999999;
			font-size: 30rpx;
			margin-top: 10rpx;
			margin-bottom: 20rpx;
		}

	}
</style>
