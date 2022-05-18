<template>
	<view>
		<uni-nav-bar leftIcon="back" @clickLeft="backAction" :title= keyword backgroundColor="#01a4ff" color="#fff" statusBar=true />
		<view class="list-item" v-for="item in totalData" :key=item.id @click="itemClick(item)">
			<view class="title">
				<view >
					<text class="label" v-if="item.fresh">新</text>
					<text class="label" v-else-if="isPubulic(item.superChapterName)">公众号</text>
					<text class="text" v-if="item.author.length > 0">{{item.author}}</text> 
					<text class="text" v-else>{{item.shareUser}}</text> 
				</view>
				<text class="text">{{item.niceDate}}</text>
			</view>
			<text class="des" v-html="item.title"></text>
			<view class="bottom">
				<text class="noted" v-if="item.superChapterName.length > 0">{{item.superChapterName}}/{{item.chapterName}}</text>
				<text class="noted" v-else></text>
				<view @click.stop="favClick(item)" :class="['collect_status','iconfont','icon-collection', item.collect ? 'collec_true' : '']"/>
			</view>
			<view class="line"></view>
		</view>
		<backTop />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				totalData: [],
				keyword:"面试",
				page : 0
			}
		},
		
		onLoad(option) {
			this.keyword = option.keyword == null?"面试":option.keyword
			this.getHotKeyData()
			uni.$on("backtop",function(){
				uni.pageScrollTo({
				    scrollTop: 0,
				    duration: 300
				});
			})
		},
		
		onPullDownRefresh() {
			this.page = 0
			this.getHotKeyData()
		},
		
		onReachBottom() {
			this.page++
			this.getHotKeyData()
		},
		
		methods: {
			async getHotKeyData() {
				const res = await this.$myWebHttp({
					url: "article/query/"+this.page+"/json?k="+this.keyword,
					method:'POST',
				})
				console.log("热门关键字搜索文章数据:", res.data.data.datas)
				uni.stopPullDownRefresh()
				if(this.page==0){
					this.totalData = res.data.data.datas
				}else{
					this.totalData = this.totalData.concat(res.data.data.datas)
				}
			},
			isPubulic(str){
				return str == "公众号"
			},
			itemClick(item){
				console.log("itemClick：",item)
				uni.navigateTo({
					url:"../../detail/detail?link="+item.link+"&&title="+item.title,
					success(res) {
						console.log("success：",res)
					},
					fail(err) {
						console.log("fail",err)
					}
				})
			},
			backAction() {
				uni.navigateBack()
			},
			async favClick(item){
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
			}
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
