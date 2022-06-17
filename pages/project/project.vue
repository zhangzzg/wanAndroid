<template>
	<view>
		<uni-nav-bar title="项目" backgroundColor="#01a4ff" color="#fff" statusBar=true  />
		<my-tabs :tabs=tabs></my-tabs>
		<view class="list-item" v-for="item in totalData" :key=item.id @click="itemClick(item)">
			<view class="item">
				<image class="image" :src="item.envelopePic" mode="aspectFit"></image>
				<view class="conten">
					<view>
						<text class="title">{{item.title}}</text>
					</view>
					<view>
						<!-- <text class="desc">{{item.desc.substring(0,50)}}</text> -->
					</view>
					<view class="time">
						<text class="title">{{item.author}}</text>
						<text class="title">{{item.niceDate}}</text>
					</view>
				</view>
			</view>
			<view class="line"></view>
		</view>
		<backTop></backTop>
	</view>
</template>
<script>
	import {
		tabBean
	} from "../bean.js"
	export default {
		data() {
			return {
				tabs: [],
				totalData: [],
				current: 0,
				bold: true,
				offset: [5, -5],
				cid: 0,
				page: 1
			}
		},
		onPullDownRefresh() {
			this.page = 1
			this.getTreeData()
		},
		onLoad() {
			this.getProjectData()
			this.getTreeData()
			uni.$on("backtop", function() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
			})
			uni.$on("click",(item)=>{
				this.change(item)
			})
		},
		onReachBottom() {
			this.page++
			this.getTreeData()
		},
		methods: {
			itemClick(item) {
				console.log("item：", item)
				uni.navigateTo({
					url: "../search/detail/detail?link=" + item.link + "&&title=" + item.title
				})
			},
			
			fabClick() {
				uni.pageScrollTo({
					scrollTop: 0
				})
			},
			
			change(item) {
				let index = item.index
				if (this.current != index) {
					this.page = 1
				}
				this.current = index;
				this.cid = this.tabs[index].id;
				this.getTreeData()
			},

			async getProjectData() {
				const res = await this.$myWebHttp({
					url: "project/tree/json",
				})
				console.log("项目分类数据:", res.data.data)
				this.tabs = res.data.data
			},

			async getTreeData() {
				const res = await this.$myWebHttp({
					url: "project/list/" + this.page + "/json?cid=" + this.cid,
				})
				console.log("某一个分类数据:", res.data.data.datas)
				uni.stopPullDownRefresh()
				if (this.page == 1) {
					this.totalData = res.data.data.datas
				} else {
					this.totalData = this.totalData.concat(res.data.data.datas)
				}
			}
		}
	}
</script>

<style lang="scss">
	.tabs {
		background-color: #19BE6B;
	}
	.list-item {
		display: flex;
		flex-direction: column;

		.item {
			display: flex;
			flex-direction: row;

			.image {
				flex: 1;
				height: 170rpx;
				margin-top: 20rpx;
				margin-bottom: 20rpx;
				display: flex;
				margin-right: 10rpx;
				justify-content: flex-start;
			}

			.conten {
				flex: 4;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				.title {
					font-size: 30rpx;
					color: #333333;
					margin-top: 15rpx;
					margin-right: 15rpx;
					font-size: 25rpx;
				}

				.desc {
					// font-size: 24rpx;
					// color: #999999;
					// lines: 1;
					// text-overflow: ellipsis;
					
					font-size: 8px;
					color: #999;
					/* font-weight: bold; */
					lines: 3;
					text-overflow:ellipsis; 
				}

				.time {
					display: flex;
					justify-content: space-between;
				}
			}
		}
	}
</style>
