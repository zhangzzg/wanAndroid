<template>
	<view>
		<view class="list-item" v-for="(item,index) in totalData" :key=index @click="actionDetail(item)">
			<view class="list-title">
				<text class="author" v-if="item.author.length > 0 ">{{item.author}}</text>
				<text class="author" v-else>{{item.shareUser}}</text>
				<text class="time">{{item.niceDate}}</text>
			</view>
			<text class="title">{{item.title}}</text>
			<view class="bottom">
				<text class="noted">{{item.superChapterName}}/{{item.chapterName}}</text>
			</view>
			<view class="line"></view>
		</view>
		<u-loadmore :status="status"></u-loadmore>
	</view>
</template>

<script>
	export default {
		props:{
			id:{
				type:Number,
				default:0
			},
		},
		data() {
			return {
				cid: 0,
				page:0,
				tabs: [],
				current: 0,
				bold: true,
				totalData:[],
				status:"nomore"
			}
		},
		created() {
			let that = this
			this.getArticle()
			uni.$on("loadMoreArticle",function(itemId){
				if(itemId == that.id){
					 that.loadMore()
				}
			})
		},
		methods: {
			loadMore() {
				this.page++
				this.getArticle()
			},
			actionDetail(item){
				uni.navigateTo({
					url:"../../search/detail/detail?link="+item.link+"&&title="+item.title
				})
			},
			async getArticle() {
				this.status = "loading"
				const res = await this.$myWebHttp({
					url: "article/list/"+this.page+"/json?cid=" + this.id,
				})
				if (res.data.data.curPage < res.data.data.pageCount) {
					this.totalData = this.totalData.concat(res.data.data.datas)
				} else if(res.data.data.curPage == res.data.data.pageCount) {
					this.status = 'nomore'
					this.totalData = this.totalData.concat(res.data.data.datas)
				}else{
					this.status = 'nomore'
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
		margin-top: 15rpx;
		flex-direction: column;
	
		.list-title {
			display: flex;
			align-items: center;
	
			.label {
				margin-right: 15rpx;
				margin-left: 15rpx;
				font-size: 25rpx;
				color: #dd524d;
				border: 1px solid;
				border-radius: 2px;
				padding-left: 8rpx;
				padding-right: 8rpx;
			}
	
			.author {
				margin-right: 15rpx;
				margin-left: 15rpx;
				color: #999999;
			}
	
			.time {
				display: flex;
				justify-content: flex-end;
				margin-right: 15rpx;
				color: #999999;
				flex: 1;
			}
		}
	}
	
	.title {
		margin: 20rpx;
		color: #333333;
	}
	.bottom{
		margin-left: 20rpx;
		margin-bottom: 20rpx;
		color: #999999;
	}	
</style>
