<template>
	<view>
		<view class="status_bar"></view>
		<my-tabs :tabs="tabs" @click="change" :current="current"></my-tabs>
		<swiper class="swiper" v-bind:style="{height:swiperH+'px'}" :duration="duration" :current="current"
			@change="changeSwiper">
			<swiper-item class="tab-body">
				<scroll-view @scroll="scroll" :scroll-top="scrollTop" scroll-y style="height: 100%;width: 100%;"
					@scrolltolower="onreachBottom(index)">
					<view class="head" v-for="item in totalData" :key=item.id @click="itemClick(item)">
						<text class="title">{{item.name}}</text>
						<view class="content">
							<text class="label" v-for="(sitem,index) in item.children"
								:key="index">{{sitem.name}}</text>
						</view>
						<view class="line"></view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<easy-scroll :list="totalsData"></easy-scroll>
			</swiper-item>
		</swiper>
		<backTop v-if="current == 0"></backTop>
	</view>
</template>
<script>
	import {
		tabBean
	} from "../bean.js"
	import easyScroll from '@/component/easy-scroll.vue'
	export default {
		data() {
			return {
				tabs: [{
						name: '导航',
					},
					{
						name: '体系',
					},
				],
				totalData: [],
				totalsData: [],
				current: 0,
				bold: true,
				offset: [5, -5],
				page: 0,
				scrollTop: 0,
				swiperH: 0,
				duration: 500,
				old: {
					scrollTop: 0
				}
			}
		},
		onPullDownRefresh() {
			this.getTreeData()
			this.getWxarticleItemData()
		},
		onLoad() {
			let that = this
			// 初始化swiper高度
			let tabH = uni.upx2px(80); //80rpx转换px
			this.swiperH = uni.getSystemInfoSync().windowHeight - tabH;
			uni.$on("backtop", function() {
				that.scrollTop = that.old.scrollTop
				that.$nextTick(function() {
					that.scrollTop = 0
				});
			})
		},
		created() {
			this.getTreeData()
			this.getWxarticleItemData()
		},
		components: {
			easyScroll
		},
		methods: {
			onreachBottom(index) {
				setTimeout(function() {
					// uni.$emit("loadMore")
				}, 800);
			},
			itemClick(item) {
				const tabsData = item.children.map(e =>
					new tabBean(e.name, e.id)
				)
				const navData = JSON.stringify(tabsData);
				console.log("item：", item)
				uni.navigateTo({
					url: "./article/article?uid=" + item.id + "&&title=" + item.name +
						"&&children=" + navData
				})
			},
			scroll: function(e) {
				this.old.scrollTop = e.detail.scrollTop
			},
			change(item) {
				let index = item.index
				this.current = index;
			},
			changeSwiper(event) {
				let index = event.detail.current;
				this.current = index;
			},
			async getTreeData() {
				const res = await this.$myWebHttp({
					url: "/tree/json",
				})
				console.log("体系数据:", res.data.data)
				uni.stopPullDownRefresh()
				this.totalData = res.data.data
			},
			async getWxarticleItemData() {
				const res = await this.$myWebHttp({
					url: "navi/json",
				})
				console.log("导航数据:", res.data)
				this.totalsData = res.data.data
			},
		}
	}
</script>

<style lang="scss">
	.header-main{
		position: fixed;
		top: 0;
	}
	.swiper {
		width: 100%;
	}

	.tab-body {
		width: 100%;
		height: 100%;
	}

	.tabs {
		background-color: #19BE6B;
	}

	.head {
		display: flex;
		flex-direction: column;

		.title {
			font-size: 30rpx;
			color: #333333;
			margin: 15rpx;
		}

		.content {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			margin-left: 15rpx;
			margin-bottom: 15rpx;

			.label {
				font-size: 28rpx;
				color: #999999;
				margin-right: 15rpx;
			}
		}
	}
</style>
