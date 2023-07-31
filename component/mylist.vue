<template>
	<view>
		<view class="list-item" v-for="item in totalData" :key=item.id @click="itemClick(item)">
			<view class="title">
				<text class="text">{{item.author}}</text>
				<text class="text">{{item.niceDate}}</text>
			</view>
			<text class="des">{{item.title}}</text>
			<view class="bottom">
				<text class="noted">{{item.superChapterName}}/{{item.chapterName}}</text>
				<view @click.stop="favClick(item)"
					:class="['collect_status','iconfont','icon-collection', item.collect ? 'collec_true' : '']" />
			</view>
			<view class="line"></view>
		</view>
		<u-loadmore :status="status" ></u-loadmore>
	</view>
</template>

<script>
	export default {
		props:{
			mid:{
				type:Number,
				default:0  
			},
		},
		data() {
			return {
				totalData: [],
				page: 1,
				status:"nomore"
			}
		},
		created() {
			let that = this
			this.getWxarticleItemData()
			uni.$on("loadMore",(itemId)=>{
				if(this.mid == itemId ){
					console.log("itemId=",itemId)
					that.loadMore()
				}
			})
		},
		destroyed() {
			uni.$off("loadMore")
		},
		methods: {
			loadMore(){
				this.page++
				this.getWxarticleItemData()
			},
			fabClick() {
				uni.pageScrollTo({
					scrollTop: 0
				})
			},
			itemClick(item) {
				console.log("item：", item)
				uni.navigateTo({
					url: "../search/detail/detail?link=" + item.link + "&&title=" + item.title
				})
			},
			async favClick(item) {
				if (!this.$comUtils.isLogin()) {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				} else {
					if (item.collect) {
						const res = await this.$myWebHttp({
							url: "lg/uncollect_originId/" + item.id + "/json",
							method: 'POST'
						})
						if (res.data.errorCode == 0) {
							item.collect = false
						} else {
							uni.showToast({
								title: '取消收藏失败' + res.data.errorMsg,
								duration: 2000,
								position: "bottom"
							});
						}
					} else {
						const res = await this.$myWebHttp({
							url: "lg/collect/" + item.id + "/json",
							method: 'POST'
						})
						if (res.data.errorCode == 0) {
							item.collect = true
						} else {
							uni.showToast({
								title: '收藏失败' + res.data.errorMsg,
								duration: 2000,
								position: "bottom"
							});
						}
					}
				}
			},
			async getWxarticleItemData() {
				this.status = 'loading'
				const res = await this.$myWebHttp({
					url: "wxarticle/list/" + this.mid + "/" + this.page + "/json",
				})
				console.log("公众号某个分类数据:", res.data)
				if (res.data.data.curPage < res.data.data.pageCount) {
					this.totalData = this.totalData.concat(res.data.data.datas)
				} else if(res.data.data.curPage == res.data.data.pageCount) {
					this.status = 'nomore'
					this.totalData = this.totalData.concat(res.data.data.datas)
				}else{
					this.status = 'nomore'
				}
			},
		}
	}
</script>

<style lang="scss">
	.list-item {
		display: flex;
		flex-direction: column;
		margin: 15rpx;

		.title {
			display: flex;
			justify-content: space-between;

			.text {
				color: #999999;
				font-size: 20rpx;
			}
		}

		.des {
			color: #333333;
			font-size: 30rpx;
			margin-top: 20rpx;
			margin-bottom: 20rpx;
		}

		.bottom {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			margin-bottom: 20rpx;

			.noted {
				display: flex;
				font-size: 15rpx;
				color: #999999;
				align-items: flex-end;
			}
		}
	}
</style>
