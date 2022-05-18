<template>
	<view>
		<uni-nav-bar leftIcon="back" @clickLeft="backAction" title="收藏" backgroundColor="#01a4ff" color="#fff" statusBar=true />
		<view class="list-item" v-for="item in totalData" :key=item.id @click="itemClick(item)">
			<view class="title">
				<text class="text" v-if="item.author">{{item.author}}</text>
				<text class="text" v-else>匿名</text>
				<text class="text">{{item.niceDate}}</text>
			</view>
			<text class="des">{{item.title}}</text>
			<view class="bottom">
				<text class="noted">{{item.chapterName}}</text>
				<view @click.stop="favClick(item)" :class="['collect_status','iconfont','icon-collection', 'collec_true' ]"/>
			</view>
			<view class="line" ></view>
		</view>
		<backTop></backTop>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				totalData: [],
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
			backAction(){
				uni.navigateBack()
			},
			itemClick(item){
				console.log("item：",item)
				uni.navigateTo({
					url:"../search/detail/detail?link="+item.link+"&&title="+item.title
				})
			},
			async favClick(item){
				const res = await this.$myWebHttp({
					url: "lg/uncollect_originId/" + item.originId + "/json",
					method:'POST'
				})
				console.log('取消收藏状态：',res.data)
				if(res.data.errorCode == 0){
					this.getWxarticleItemData()
				}else{
					uni.showToast({
					    title: '取消收藏失败'+res.data.errorMsg,
					    duration: 2000,
						position:"bottom"
					});
				}
			},
			async getWxarticleItemData() {
				const res = await this.$myWebHttp({
					url: "lg/collect/list/"+this.page+"/json",
				})
				uni.stopPullDownRefresh()
				console.log("收藏分类:", res.data.data.datas)
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
