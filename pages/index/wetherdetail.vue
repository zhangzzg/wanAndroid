<template>
	<view class="content">
		<view>
			<uni-nav-bar :title="title" backgroundColor="#007AFF" color="#fff" @clickLeft="back" statusBar="true"
				class="uni-navbar" leftIcon="back" />
		</view>
		<view class="weather">
			<image src="../../static/bg_partly_cloudy_day.jpg" class="image" mode="aspectFit"></image>
			<view class="title_area">
				<text class="temp">{{99 | getTemp}}</text>
				<text style="color: #FFFFFF;">空气质量良好</text>
			</view>
		</view>

		<view class="detail">
			<text>预报</text>
			<view class="detail_info" v-for="item in details">
				<text class="info">{{item.time}}</text>
				<view class="wether_info">
					<image :src="item.ikon" class="icon"></image>
					<text class="info">{{item.whether}}</text>
				</view>
				<text class="info">{{item.temp}}</text>
			</view>
		</view>
		<view class="life">
			<text>生活指数</text>
			<view class="lift_content">
				<view class="item" v-for="bean in items">
					<image :src="bean.url" class="image"></image>
					<text class="text">{{bean.status}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lat: 0.0,
				lng: 0.0,
				title: "",
				items: [{
					 status: "感冒",
					 url: "../../static/ic_coldrisk.png"
					},
					{
						status: "穿衣",
						url: "../../static/ic_dressing.png"
					},
					{
						status: "紫外线",
						url: "../../static/ic_ultraviolet.png"
					},
					{
						status: "洗车",
						url: "../../static/ic_carwashing.png"
					},
				],
				details: [{
						time: "2022-02-23",
						ikon: "../../static/ic_partly_cloud_day.png",
						whether: "晴天",
						temp: "23℃"
					},
					{
						time: "2022-02-24",
						ikon: "../../static/ic_heavy_rain.png",
						whether: "多雨",
						temp: "25℃"
					},
					{
						time: "2022-02-25",
						ikon: "../../static/ic_heavy_snow.png",
						whether: "多雨",
						temp: "29℃"
					},
					{
						time: "2022-02-26",
						ikon: "../../static/ic_light_snow.png",
						whether: "小雪",
						temp: "20℃"
					}
				]
			}
		},

		onLoad: function(option) {
			// this.getRealtimeWeather(option.lng,option.lat)
			console.log(option)
			this.title = option.message
		},
		
		filters:{
			getTemp(values){
				return values.toFixed() +"摄氏度"
			}
		},

		methods: {
			back() {
				uni.navigateBack()
			},
			async getRealtimeWeather(lng, lat) {
				const res = await this.$myHttp({
					url: "v2.5/${" + this.$myConstan + "}/${" + lng + "},${" + lat + "}/realtime.json",
				})
				console.log("首页的数据：", res.data)
				const resl = await this.$interceptor("request")
			},
		},
		computed: {

		},
		watch: {}
	}
</script>

<style lang="scss">
	.content {
		height: 100%;
		background-color: #DCDFE6;
	}

	.uni-navbar {
		.uni-navbar--border {
			// border: 0 none !important;
			border-bottom-width: 0.5px !important;
		}
	}

	.weather {
		width: 750rpx;
		height: 1040rpx;
		background:#FFFFFF;
		.image {
			width: 750rpx;
			height: 1040rpx;
		}
		.title_area {
			position: relative;
			bottom: 600rpx;
            display: flex;
			flex-direction: column;
			align-items: center;
			.temp {
				font-size: 60rpx;
				color: #FFFFFF;
			}
		}
	}

	.detail {
		width: 670rpx;
		display: flex;
		flex-direction: column;
		margin: 20rpx;
		padding: 20rpx;
		background-color: #FFFFFF;
		border-radius: 2px;
		color: #333333;

		.detail_info {
			display: flex;
			justify-content: space-between;
			margin-top: 20rpx;

			.wether_info {
				display: flex;

				.info {
					margin-bottom: 10rpx;
					font-size: 14px;
					margin-right: 20rpx;
				}

				.icon {
					width: 50rpx;
					height: 50rpx;
					margin-right: 20rpx;
				}
			}
		}
	}

	.life {
		width: 670rpx;
		margin: 20rpx;
		padding: 20rpx;
		border-radius: 2px;
		background-color: #ffffff;

		.lift_content {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			margin-top: 20rpx;

			.item {
				width: 325rpx;
				display: flex;
				margin-top: 20rpx;
				align-items: center;
			}

			.image {
				width: 106rpx;
				height: 106rpx;
			}

			.text {
				margin-left: 20rpx;
			}
		}

	}
</style>
