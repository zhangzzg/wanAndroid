<template>
	<view>
		<view class="tabs">
			<uni-nav-bar title="公众号" backgroundColor="#01a4ff" color="#fff" statusBar=true />
			<my-tabs :tabs=tabs :current= current></my-tabs>
		</view>
		<swiper :current="tabIndex" :duration="300" @change="onswiperchange" style="height: 100vh;">
			<swiper-item v-for="(sitem, index) in tabs" :key="sitem.id">
				<u-list :enableBackToTop="true" :scrollTop="scrollTop" @scrolltolower="scrolltolower">
					<u-list-item class="list-item" v-for="(item,index) in totalData" :key=index @click="itemClick(item)">
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
					</u-list-item>
				</u-list>
			</swiper-item>
		</swiper>
		<backTop></backTop>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabs: [],
				totalData: [],
				current: 0,
				bold: true,
				offset: [5, -5],
				cid: 408,
				page: 1,
				tabIndex: 0,
				triggered: false,
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
			}
		},
		onLoad() {
			console.log("onLoad")
			this.getWxarticle()
			this.getWxarticleItemData()
			uni.$on('backtop', () => {
				this.goTop()
			})
			uni.$on("click",(item)=>{
				this.change(item)
			})
		},
		methods: {
			goTop() {
				 uni.pageScrollTo({
				 	scrollTop: 0,
					duration: 300
				 });
			},
			scrolltolower() {
				this.page++
				this.getWxarticleItemData()
			},
			onswiperchange(e) {
				this.tabIndex = e.detail.current
				this.current = this.tabIndex
				this.page = 1
				this.cid = this.tabs[this.tabIndex].id;
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
			change(item) {
				let index = item.index
				if (this.current != index) {
					this.page = 1
				}
				this.current = index;
				this.cid = this.tabs[index].id;
				this.getWxarticleItemData()
				console.log("切换获取cid: ", this.cid)
			},
			async getWxarticle() {
				const res = await this.$myWebHttp({
					url: "wxarticle/chapters/json",
				})
				console.log("公众号分类数据:", res.data.data)
				this.tabs = res.data.data
			},
			async getWxarticleItemData() {
				const res = await this.$myWebHttp({
					url: "wxarticle/list/" + this.cid + "/" + this.page + "/json",
				})
				uni.stopPullDownRefresh()
				console.log("公众号某个分类数据:", res.data.data.datas)
				if (this.page == 1) {
					this.totalData = res.data.data.datas
				} else {
					this.totalData = this.totalData.concat(res.data.data.datas)
				}
			},
		}
	}
</script>

<style>
	.tab {
		position: fixed;
		top: 0;
		width: 750rpx;
		height: 30px;
		background-color: red;
	}

	.text {
		color: #999999;
		font-size: 20rpx;
	}

	.list-item {
		display: flex;
		flex-direction: column;
		margin: 15rpx;
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


	}

	.title {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.noted {
		display: flex;
		font-size: 15rpx;
		color: #999999;
		align-items: flex-end;
	}
</style>
