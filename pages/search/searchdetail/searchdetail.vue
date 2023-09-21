<template>
	<view>
		<view class="status_bar"></view>
		<view class="search">
			<image class="back" @click="back" src='../../../static/back_icon.png'></image>
			<u-search placeholder="请输入关键字" v-model="keyword" :showAction="false"></u-search>
		</view>
		<view class="hot">
			<text>热门搜索</text>
		</view>
		<view class="tags">
			<text v-for="(item, index) in hotKeys" :key="index" class="text" @click="itemclick(item)">
				{{item.name}}
			</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: "",
				hotKeys: []
			}
		},
		onLoad() {
			this.getHotKeyData()
		},
		methods: {
			back() {
				uni.navigateBack()
			},
			itemclick(item) {
				this.keyword = item.name
				uni.navigateTo({
					url:"./hotarticle/hotarticle?keyword="+this.keyword
				})
			},
			async getHotKeyData() {
				const res = await this.$myWebHttp({
					url: "hotkey/json",
				})
				this.hotKeys = res.data.data
			},
		}
	}
</script>

<style lang="scss">
	.search {
		display: flex;
		align-items: center;
		background-color: #dd524d;
		padding: 20rpx;

		.back {
			padding-right: 20rpx;
			padding-top: 10rpx;
			padding-bottom: 10rpx;
			color: #FFFFFF;
			width: 45rpx;
			height: 45rpx;
		}
	}

	.hot {
		margin-left: 30rpx;
		margin-top: 20rpx;
		font-size: 14px;
		color: #01a4ff;
	}

	.tags {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin: 20rpx;
		.text {
			padding: 2px 8px;//上下，左右
			background: #F24544;
			border-radius: 4px;
			font-size: 14px;
			// display: inline-block;
			color: #fff;
			margin: 5px 5px;//上下，左右
		}
	}
</style>
