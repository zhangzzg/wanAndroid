<template>
	<view>
		<view class="titleclass">
			<view class="status_bar"></view>
			<view class="header">
				<image class="header_avart" :src="bgImg" @click="showDrawer('showLeft')"></image>
				<view class="header_content">玩安卓</view>
				<image class="header_search" src="../../static/search.png" mode="aspectFit" @click="search"></image>
			</view>
		</view>
		<view class="banner">
			<swiper :indicator-dots="true" :autoplay="true" :interval="2000" :duration="1000" style="height: 200px;"
				@change='changeSwiper'>
				<swiper-item v-for="(item,index) in images" :key=index @click="imageClick(item)">
					<view>
						<image :src="item.imagePath" style="width: 750rpx;"></image>
					</view>
				</swiper-item>
			</swiper>
			<view class="tabindex">
				<view v-if="images && images.length > 0" v-html="images[nowIndex-1].title"></view>
				<view>{{nowIndex}}/{{images.length}}</view>
			</view>
		</view>
		<!-- 侧边栏 -->
		<uni-drawer ref="showLeft" mode="left" :width="300">
			<view class="drawer_conten">
				<view class="drawer_head" @click="login">
					<image class="header_avart" :src="bgImg"></image>
					<text class="text">{{username}}</text>
				</view>
				<view class="drawer" v-for="(item,index) in list" :key="index" @click="drawerClick(item,index)">
					<view class="drawer_sub">
						<image :src="item.thumb" class="image"></image>
						<text>{{item.title}}</text>
					</view>
					<view class="line1"></view>
				</view>
			</view>
		</uni-drawer>
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
							<view @click.stop="favClick(item)"
								:class="['collect_status','iconfont','icon-collection', item.collect ? 'collec_true' : '']" />
						</view>
					</view>
				</view>
				<view class="line"></view>
			</view>
		</view>
		   <u-loadmore :status="status[1]" ></u-loadmore>
		<backTop></backTop>
	</view>
</template>
<script>
	import list from '../drawerdatas.js'
	 // #ifdef APP-PLUS
		var buglyModule = uni.requireNativePlugin("buglyModule")
		const modal = uni.requireNativePlugin('modal');
	// #endif
	export default {
		data() {
			return {
				list: list,
				images: [],
				totalData: [],
				page: 0,
				nowIndex: 1,
				username: "登录",
				bgImg: '../../static/login_icon.jpg',
				status: ['loadmore', 'loading', 'nomore'],
			}
		},
		onHide() {
			// buglyModule.showToas("即将离开学习界面3")
		},
		mounted() {
			plus.nativeUI.showWaiting("加载数据中...")
			// #ifdef APP-PLUS
			buglyModule.initBugly("d447997385",value =>{
				 console.log(value)
			})
			// #endif
			this.getBanner()
			this.getHomeData()
			uni.$on("backtop", function() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
			})
			uni.getStorage({
				key: "username",
				success: (res) => {
					this.username = res.data
				}
			})
			uni.$on("login", () => {
				uni.getStorage({
					key: "username",
					success: (res) => {
						this.username = res.data
					}
				})
			})
		},
		onPullDownRefresh() {
			console.log("下拉刷新")
			this.page = 0
			this.getHomeData()
		},
		onReachBottom() {
			this.page++
			this.getHomeData()
		},
		methods: {
			login() {
				if (!this.$comUtils.isLogin()) {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}
			},
			changeSwiper(e) {
				this.nowIndex = e.detail.current + 1;
			},
			drawerClick(item, index) {
				switch (item.title) {
					case "百度一下":
						uni.navigateTo({
							url: "./detail/detail?link=https://www.baidu.com"
						})
						break;
					case "我的收藏":
					    let targetUrl = this.$comUtils.isLogin()? "/pages/collect/collect":"/pages/login/login"
						uni.navigateTo({
							url: targetUrl
						})
						break;
					case "我的文章":
						// uni.navigateTo({
						// 	url: "/pages/test/test"
						// })
						break;
					case "常用网站":
						// uni.navigateTo({
						// 	url: "/pages/camera/camera"
						// })
						break;
					case "关于作者":
					    // uni.navigateTo({
					    // 	url: '/pages/camera/face'
					    // })
						break;
					case "退出登录":
						uni.showModal({
							title: '提示',
							content: '确定退出登录？',
							success: (res) => {
								if (res.confirm) {
									this.logout()
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						})
						break;
				}
			},
			async logout() {
				const res = await this.$myWebHttp({
					url: "user/logout/json",
				})
				if (res.data.errorCode == 0) {
					uni.removeStorage({
						key: "username",
						success: () => {
							console.log("移除成功")
							this.username = "登录"
						}
					})
					uni.showToast({
						title: "退出登录成功",
						position: "bottom",
						icon: "none"
					})
				} else {
					uni.showToast({
						title: res.data.errorMsg,
						position: "bottom",
						icon: "none"
					})
				}
			},
			// 打开窗口
			showDrawer(e) {
				// this.$refs[e].open()
				this.$refs.showLeft.open()
			},
			closeDrawer(e) {
				this.$refs[e].close()
			},
			search() {
				uni.navigateTo({
					url: "./searchdetail/searchdetail"
				})
			},
			imageClick(item) {
				uni.navigateTo({
					url: "./detail/detail?link=" + item.url + "&&title=" + item.title
				})
			},
			actionDetail(item) {
				uni.navigateTo({
					url: "./detail/detail?link=" + item.link + "&&title=" + item.title
				})
			},
			async favClick(item) {
				let isLogin = this.$comUtils.isLogin()
				if (!isLogin) {
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
			async getHomeData() {
				const res = await this.$myWebHttp({
					url: "article/list/" + this.page + "/json",
				})
				plus.nativeUI.closeWaiting()
				if (res.data.data.curPage < res.data.data.pageCount) {
					this.totalData = this.totalData.concat(res.data.data.datas)
				} else if(res.data.data.curPage == res.data.data.pageCount) {
					this.status[2]
					this.totalData = this.totalData.concat(res.data.data.datas)
				}else{
					this.status[2]
				}
				uni.stopPullDownRefresh()
			},
			async getBanner() {
				const res = await this.$myWebHttp({
					url: "banner/json",
				})
				this.images = res.data.data
			},
			btnClick() {
				this.$refs.cpn.open()
			},
		},
	}
</script>

<style lang="scss">
	.titleclass {
		width: 100%;
		position: sticky;
		top: 0;
		z-index: 999;
	}

	.line1 {
		width: 300px;
		height: 1px;
		background-color: #DCDFE6;
	}

	.drawer_head {
		display: flex;
		height: 250px;
		background-color: #01a4ff;
		flex-flow: column;
		justify-content: center;
		align-items: center;

		.header_avart {
			color: #FFFFFF;
			width: 60px;
			height: 60px;
			margin-left: 10rpx;
			border-radius: 50%;
			overflow: hidden;
		}

		.text {
			color: #FFFFFF;
			margin-top: 10rpx;
			margin-left: 20rpx;
		}
	}

	.drawer_conten {
		display: flex;
		flex-flow: column;

		.drawer {
			display: flex;
			flex-flow: column;

			.drawer_sub {
				padding: 10px;
				display: flex;
				flex-flow: row;

				.image {
					width: 20px;
					height: 20px;
					margin-right: 10px;
				}
			}
		}
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: $uni-color-primary;
		height: 100rpx;
		text-align: center;

		.header_avart {
			color: #FFFFFF;
			width: 45px;
			height: 45px;
			margin-left: 10rpx;
			border-radius: 50%;
			overflow: hidden;
		}

		.header_content {
			color: #FFFFFF;
			padding: 10px;
			font-size: 40rpx;
		}

		.header_search {
			height: 40px;
			width: 40px;
			overflow: hidden;
			margin-right: 10rpx;
		}
	}

	.banner {
		position: relative;

		.tabindex {
			position: absolute;
			bottom: 0;
			height: 24px;
			background: rgba(0, 0, 0, 0.4);
			width: 100%;
			display: flex;
			justify-content: space-between;
			padding: 0 20px;
			align-items: center;
			color: #fff;
			font-size: 28rpx;
		}
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
					margin-top: 10px;
				}

				.bottom {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					margin-top: 10px;

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
