<template>
	<view>
		<view class="list-item" v-for="item in totalData" :key=item.id @click="itemClick(item)">
			<view class="item">
				<image class="image" :src="item.envelopePic" mode="aspectFit"></image>
				<view class="conten">
					<view>
						<text class="title">{{item.title}}</text>
					</view>
					<view>
						<text class="desc">{{item.desc.substring(0,50)}}...</text>
					</view>
					<view class="time">
						<text class="title">{{item.author}}</text>
						<text class="title">{{item.niceDate}}</text>
					</view>
				</view>
			</view>
			<u-image></u-image>
			<view class="line"></view>
		</view>
		<u-loadmore :status="status" ></u-loadmore>
	</view>
</template>
<script>
	export default {
		props:{
			id:{
				type:Number,
				default:0
			}
		},
		data() {
			return {
				totalData: [],
				current: 0,
				bold: true,
				offset: [5, -5],
				cid: 0,
				page: 1,
				status:"nomore"
			}
		},
		
		created() {
			this.getTreeData()
			let that = this
			uni.$on("myproject", function() {
				that.loadMore()
			})
		},
		methods: {
			loadMore() {
				this.page++
				this.getTreeData()
			},
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

			async getTreeData() {
				this.status = 'loading'
				const res = await this.$myWebHttp({
					url: "project/list/" + this.page + "/json?cid=" + this.id,
				})
				console.log("某一个分类数据:", res.data.data.datas)
				let datas = res.data.data.datas
				if (this.page == 1) {
					  this.totalData = datas
				} else {
					  if(datas.length > 0){
						 this.totalData = this.totalData.concat(datas)
					  }else{
						 this.status = 'nomore'
					  }
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
					margin-bottom: 10rpx;
				}
			}
		}
	}
</style>
