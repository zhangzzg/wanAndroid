<template>
	<view>
		<uni-nav-bar leftIcon="back" @clickLeft="backAction" :title="name" backgroundColor="#01a4ff" color="#fff"
			statusBar=true />
		<view class="tabs">
			<u-tabs bg-color="#fafafa" :bold="bold" active-color="#01a4ff" :list="tabs" @change="change"
				:current="current" ></u-tabs>
		</view>
		
		<view class="list-item" v-for="(item,index) in totalData" :key=index @click="actionDetail(item)">
			<view class="list-title">
				<text class="author" v-if="item.author.length >0 ">{{item.author}}</text>
				<text class="author" v-else>{{item.shareUser}}</text>
				<text class="time">{{item.niceDate}}</text>
			</view>
			<text class="title">{{item.title}}</text>
			<view class="bottom">
				<text class="noted">{{item.superChapterName}}/{{item.chapterName}}</text>
				<!-- <view @click.stop ="favClick">
					<uni-fav :checked= "item.collect"/>
				</view> -->
			</view>
			<view class="line"></view>
		</view>
		<!-- <uni-fab  horizontal="right" vertical="bottom" @fabClick="fabClick"></uni-fab> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cid: 0,
				page:0,
				name: "",
				tabs: [],
				current: 0,
				activeColor: this.$u.color['primary'],
				bold: true,
				// offset: [5, -5]
				totalData:[]
			}
		},
		onPullDownRefresh() {
			this.page = 0
			this.getArticle()
		},
		onReachBottom() {
			this.page++
			this.getArticle()
		},
		onLoad(option) {
			this.cid = option.uid
			this.name = option.title
			let obj = option.children.replace("\"([^\"]*)\"", "$1");
			let tabs1 = JSON.parse(obj)
			console.log("tabs1: ", tabs1)
			this.tabs = tabs1
			this.getArticle()
		},
		methods: {
			fabClick(){
				uni.pageScrollTo({
					scrollTop:0
				})
			},
			actionDetail(item){
				uni.navigateTo({
					url:"../../search/detail/detail?link="+item.link+"&&title="+item.title
				})
			},
			change(index) {
				if(this.current != index){
					this.page = 0
				}
				this.current = index;
				this.getArticle()
			},
			backAction() {
				uni.navigateBack()
			},
			async getArticle() {
				const res = await this.$myWebHttp({
					url: "article/list/"+this.page+"/json?cid=" + this.tabs[this.current].id,
				})
				console.log("文章：", res.data.data.datas)
				if(this.page == 0){
					this.totalData = res.data.data.datas
				}else{
					this.totalData = this.totalData.concat(res.data.data.datas)
					// if(res.data.data.datas != null && res.data.data.datas.length > 0){
					// 	this.totalData = this.totalData.concat(res.data.data.datas)
					// }else{
					// 	console.log("没有更多了")
					// }
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
				color: #333333;
			}
	
			.time {
				display: flex;
				justify-content: flex-end;
				margin-right: 15rpx;
				color: #333333;
				flex: 1;
			}
		}
	}
	
	.title {
		margin: 20rpx;
		color: #01a4ff;
	}
	.bottom{
		margin-left: 20rpx;
		margin-bottom: 20rpx;
		color: #19BE6B;
	}	
</style>
