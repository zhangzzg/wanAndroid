<template>
	<view>
		<swiper :indicator-dots="true" :autoplay="true" :interval="2000" :duration="1000">
			<swiper-item v-for="(item,index) in images" :key=index @click="imageClick(item)">
				<view>
					<image :src="item.imagePath" style="width: 750rpx;"></image>
				</view>
			</swiper-item>
		</swiper>
		<!-- 列表数据 -->
		<view>
			<view class="list-item" v-for="(item,index) in totalData" :key=index @click="actionDetail(item)">
				<view class="list-title">
					<text class="label" v-show="item.type == 1">置顶</text>
					<text class="label" v-show="item.fresh">新</text>
					<text class="label" v-if="item.tags != null && item.tags.length > 0"
						style="color: #4CD964;">{{item.tags[0].name}}</text>
					<text class="author" v-if="item.author.length >0 ">{{item.author}}</text>
					<text class="author" v-else>{{item.shareUser}}</text>
					<text class="time">{{item.niceDate}}</text>
				</view>
				<view class="list-content">
					<image :src="item.envelopePic" class="image" mode="aspectFill" v-show="item.envelopePic.length>0 ">
					</image>
					<view class="info">
						<text class="title">{{item.title}}</text>
						<view class="bottom">
							<text class="noted">{{item.superChapterName}}/{{item.chapterName}}</text>
							<view @click.stop ="favClick">
								<uni-fav :checked= "item.collect"/>
							</view>
						</view>
					</view>
				</view>
				<view class="line"></view>
			</view>
		</view>
		<uni-fab  horizontal="right" vertical="bottom" @fabClick="fabClick"></uni-fab>
	</view>
</template>
<script>
	import cpn from '@/component/cpn.vue';
	export default {
		data() {
			return {
				images: [],
				totalData: [],
				resTop:[],
				page: 0
			}
		},
		onLoad() {
			this.getBanner()
			this.getTopData()
			this.getHomeData()
		},
		onPullDownRefresh() {
			console.log("下拉刷新")
			this.page = 0
			this.getTopData()
			this.getHomeData()
		},
		onReachBottom() {
			this.page++
			this.getHomeData()
		},
		methods: {
			imageClick(item){
				uni.navigateTo({
					url:"./detail/detail?link="+item.url+"&&title="+item.title
				})
			},
			actionDetail(item){
				uni.navigateTo({
					url:"./detail/detail?link="+item.link+"&&title="+item.title
				})
			},
			fabClick(){
				uni.pageScrollTo({
					scrollTop:0
				})
			},
			
			favClick(){
				console.log("收藏")
			},
			
			async getTopData(){
				 this.resTop = await this.$myWebHttp({
					url: "article/top/json",
				})
				console.log("置顶数据数据:", this.resTop.data.data)
			},
			
			async getHomeData() {
				uni.showNavigationBarLoading(); //显示加载动画
				const res = await this.$myWebHttp({
					url: "article/list/" + this.page + "/json",
				})
				console.log("首页数据:", res.data.data.datas)
				if(this.page == 0){
					this.totalData = []
					this.totalData = this.totalData.concat(this.resTop.data.data,res.data.data.datas)
				}else{
					this.totalData = this.totalData.concat(res.data.data.datas)
				}
				uni.stopPullDownRefresh()
				uni.hideNavigationBarLoading(); // 关闭加载动画
			},
			async getBanner() {
				const res = await this.$myWebHttp({
					url: "banner/json",
				})
				this.images = res.data.data
				console.log("banner数据:", res.data.data)
			},
			btnClick() {
				console.log("btnClick: ", this.$refs.cpn.msg)
				this.$refs.cpn.open()
			},
			getParenData() {
				console.log("getParenData")
			}
		},
		components: {
			cpn
		}
	}
</script>

<style lang="scss">
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
				font-size: 25rpx;
			}

			.time {
				display: flex;
				justify-content: flex-end;
				margin-right: 15rpx;
				color: #999999;
				font-size: 25rpx;
				flex: 1;
			}
		}

		.list-content {
			display: flex;
			margin: 15rpx;

			.image {
				width: 200rpx;
				height: 140rpx;
				margin-right: 15rpx;
			}

			.info {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				.title {
					margin-right: 15rpx;
					font-size: 30rpx;
				}
                .bottom{
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					.noted {
						font-size: 15rpx;
						margin-top: 15rpx;
						color: #999999;
					}
				}
			}
		}
	}
	.title_area {
		position: absolute;
		left: 620rpx;
		width: 100rpx;
		height: 100rpx;
	}
</style>
