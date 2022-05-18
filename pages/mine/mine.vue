<template>
	<view>
		<view class="status_bar"></view>
		<view class="tabs">
			<u-tabs bg-color="#01a4ff" :bold="bold"  active-color="#ffffff" inactive-color="#f8f8f8" :list="tabs" @change="change"
				:current="current" :offset="offset" ></u-tabs>
		</view>
         <view v-if="current == 1">
			 <view class="head" v-for="item in totalData" :key=item.id @click="itemClick(item)">
			 	<text class="title">{{item.name}}</text>
			 	<view class="content">
			 		<text class="label" v-for="(sitem,index) in item.children" :key=index>{{sitem.name}}</text>
			 	</view>
			 	<view class="line"></view>
			 </view>
		 </view> 
		 <view v-else-if="current == 0">
			<easy-scroll :list="totalsData"></easy-scroll>
		 </view>
		<backTop v-if="current == 1"></backTop>
	</view>
</template>
<script>
	import {tabBean} from "../bean.js"
	import easyScroll from '@/component/easy-scroll.vue'
	export default {
		data() {
			return {
				tabs: [
					{
						name: '导航',
					},
					{
						name: '体系',
					},
				],
				totalData: [],
				totalsData: [],
				current: 0,
				bold: true,
				offset: [5, -5],
				page: 0
			}
		},
		onPullDownRefresh() {
			this.getTreeData()
			this.getWxarticleItemData()
		},
		onLoad() {
			switch (this.current) {
				case 1:
					this.getTreeData()
					break;
				case 0:
					this.getWxarticleItemData()
					break;
			}
			uni.$on("backtop", function() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
			})
		},
		components:{
			easyScroll
		},
		methods: {
			itemClick(item) {
				const tabsData = item.children.map(e =>
					new tabBean(e.name, e.id)
				)
				const navData = JSON.stringify(tabsData);
				console.log("item：", item)
				uni.navigateTo({
					url: "./article/article?uid=" + item.id + "&&title=" + item.name +
						"&&children=" + navData
				})
			},
			fabClick() {
				uni.pageScrollTo({
					scrollTop: 0
				})
			},
			change(index) {
				this.current = index;
				switch (index) {
					case 1:
						this.getTreeData()
						break;
					case 0:
						this.getWxarticleItemData()
						break;
				}
			},
			async getTreeData() {
				const res = await this.$myWebHttp({
					url: "/tree/json",
				})
				console.log("体系数据:", res.data.data)
				uni.stopPullDownRefresh()
				this.totalData = res.data.data
			},
			async getWxarticleItemData() {
				const res = await this.$myWebHttp({
					url: "navi/json",
				})
				console.log("导航数据:", res.data)
					this.totalsData = res.data.data
			},
		}
	}
</script>

<style lang="scss">
	.tabs {
		background-color: #19BE6B;
	}

	.head {
		display: flex;
		flex-direction: column;

		.title {
			font-size: 30rpx;
			color: #333333;
			margin: 15rpx;
		}

		.content {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			margin-left: 15rpx;
			margin-bottom: 15rpx;

			.label {
				font-size: 28rpx;
				color: #999999;
				margin-right: 15rpx;
			}
		}
	}
	
</style>
