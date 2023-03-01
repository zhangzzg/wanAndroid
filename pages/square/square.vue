<template>
	<view>
		<uni-nav-bar class="header-main"  title="广场" backgroundColor="#01a4ff" color="#fff" statusBar=true />
		<view style="margin-top: 160rpx;">
			<view class="list-item" v-for="item in totalData" :key=item.id @click="itemClick(item)">
				<view class="title">
					<view >
						<text class="label" v-show="item.fresh">新</text>
						<text class="text">{{item.shareUser}}</text>
					</view>
					<text class="text">{{item.niceDate}}</text>
				</view>
				<text class="des">{{item.title}}</text>
				<view class="bottom">
					<text class="noted">{{item.superChapterName}}/{{item.chapterName}}</text>
					<view @click.stop="favClick(item)" :class="['collect_status','iconfont','icon-collection', item.collect ? 'collec_true' : '']"/>
				</view>
				<view class="line"></view>
			</view>
			<backTop />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				totalData: [],
				bold: true,
				offset: [5, -5],
				cid: 408,
				page: 0
			}
		},
		onLoad() {
			this.getWxarticleItemData()
			uni.$on("backtop",function(){
				uni.pageScrollTo({
				    scrollTop: 0,
				    duration: 300
				});
			})
		},
		onPullDownRefresh() {
			this.page = 0
			this.getWxarticleItemData() 
		},
		onReachBottom() {
			this.page ++
			this.getWxarticleItemData()
		},
		methods: {
			fabClick(){
				uni.pageScrollTo({
					scrollTop:0
				})
			},
			itemClick(item){
				console.log("item：",item)
				uni.navigateTo({
					url:"../search/detail/detail?link="+item.link+"&&title="+item.title
				})
			},
			async favClick(item) {
				if(!this.$comUtils.isLogin()){
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}else{
					if(item.collect){
						const res = await this.$myWebHttp({
							url: "lg/uncollect_originId/" + item.id + "/json",
							method:'POST'
						})
						if(res.data.errorCode == 0){
							item.collect = false
						}else{
							uni.showToast({
							    title: '取消收藏失败'+res.data.errorMsg,
							    duration: 2000,
								position:"bottom"
							});
						}
					}else{
						const res = await this.$myWebHttp({
							url: "lg/collect/"+item.id+"/json",
							method:'POST'
						})
						if(res.data.errorCode == 0){
							item.collect = true
						}else{
							uni.showToast({
							    title: '收藏失败'+res.data.errorMsg,
							    duration: 2000,
								position:"bottom"
							});
						}
					}
				}
			},
			async getWxarticleItemData() {
				const res = await this.$myWebHttp({
					url: "user_article/list/" + this.page + "/json",
				})
				uni.stopPullDownRefresh()
				console.log("广场数据:", res.data.data.datas)
				if(this.page == 0){
					this.totalData = res.data.data.datas
				}else{
					this.totalData = this.totalData.concat(res.data.data.datas)
				}
			},
		}
	}
</script>

<style lang="scss">
	.header-main{
		width: 100%;
	    position: fixed;
	    top:0;
	}
	.list-item {
		display: flex;
		flex-direction: column;
        margin: 15rpx;
		.title {
			display: flex;
			justify-content: space-between;
            .label {
				font-size: 25rpx;
				color: #dd524d;
				margin-right: 15rpx;
				border: 1px solid;
				border-radius: 2px;
				padding-left: 8rpx;
				padding-right: 8rpx;
			}
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
