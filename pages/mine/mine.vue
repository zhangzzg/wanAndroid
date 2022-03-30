<template>
	<view>
		 <u-search :show-action="false" shape="square" height="80" disabled 
		  placeholder="体系" @click="search"  ></u-search>
		 <view class="tabs">
			<u-tabs  bg-color="#fafafa" :bold="bold" active-color="#01a4ff" :list="tabs"
			@change="change" :current="current"  :offset="offset" ></u-tabs>
		</view> 
		
		<view class="head" v-for="item in totalData" :key=item.id @click="itemClick(item)">
			<text class="title">{{item.name}}</text>
			<view class="content">
				<text class="label"v-for="(sitem,index) in item.children":key=index>{{sitem.name}}</text>
			</view>
			<view class="line"></view>
		</view>
		<!-- <uni-fab  horizontal="right" vertical="bottom" @fabClick="fabClick"></uni-fab> -->
	</view>
</template>
<script>
	import {tabBean} from "../bean.js"
	export default {
		data() {
			return {
				tabs: [{
					name: '体系',
				}, {
					name:  '导航',
				},
				],
				totalData:[],
				current: 0,
				bold: true,
				offset: [5, -5]
			}
		},
		onPullDownRefresh() {
			this.getTreeData()
		},
		onLoad() {
			this.getTreeData()
		},
		methods: {
			search(){
				console.log("---search---")
			},
			itemClick(item){
			    const tabsData = item.children.map(e=>
					new tabBean(e.name,e.id)
				)
				const navData = JSON.stringify(tabsData); 
				console.log("item：",item)
				uni.navigateTo({
					url:"./article/article?uid="+item.id+"&&title="+item.name+
					"&&children="+navData
				})
			},
			fabClick(){
				uni.pageScrollTo({
					scrollTop:0
				})
			},
			change(index) {
				this.current = index;
			},
			async getTreeData() {
				const res = await this.$myWebHttp({
					url: "/tree/json",
				})
				console.log("体系数据:", res.data.data)
				uni.stopPullDownRefresh()
				this.totalData = res.data.data
			},
		}
	}
</script>

<style lang="scss">
	.tabs{
		background-color: #19BE6B;
	}
	.head{
		display: flex;
		flex-direction: column;
		.title {
			font-size: 30rpx;
			color: #333333;
			margin: 15rpx;
		}
		.content{
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			margin-left: 15rpx;
			margin-bottom: 15rpx;
			.label{
				font-size: 28rpx;
				color: #999999;
				margin-right: 15rpx;
			}
		}
	}
</style>
