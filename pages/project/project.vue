<template>
	<view>
		<uni-nav-bar title="项目" backgroundColor="#dd524d" color="#fff" statusBar=true  />
		<my-tabs :tabs="tabs" @click="change" :current="current"></my-tabs>
		<swiper class="swiper" v-bind:style="{height:swiperH+'px'}" :duration="duration" :current="current"
			@change="changeSwiper">
			<swiper-item class="tab-body" v-for="(type, index) in tabs" :key="index">
				<scroll-view  @scroll="scroll" :scroll-top="scrollTop" scroll-y style="height: 100%;width: 100%;"
					@scrolltolower="onreachBottom(type.id)">
					<myproject :id="type.id"></myproject>
				</scroll-view>
			</swiper-item>
		</swiper>
		<backTop></backTop>
	</view>
</template>
<script>
	import myproject from "../../component/myproject.vue"
	export default {
		components:{
			myproject
		},
		data() {
			return {
				tabs: [],
				current: 0,
				duration: 500,
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				swiperH:0
			}
		},
		onLoad() {
			// 初始化swiper高度
			let tabH = uni.upx2px(200);
			this.swiperH = uni.getSystemInfoSync().windowHeight - tabH;
			uni.getSystemInfoSync()
			this.getProjectData()
			let that = this
			uni.$on("backtop", function() {
				// 解决view层不同步的问题
				that.scrollTop = that.old.scrollTop
				that.$nextTick(function() {
					that.scrollTop = 0
				});
			})
		},
		destroyed() {
			uni.$off("myproject")
		},
		methods: {
			onreachBottom(itemId) {
				uni.$emit("myproject",itemId)
			},
			scroll: function(e) {
				this.old.scrollTop = e.detail.scrollTop
			},
			itemClick(item) {
				console.log("item：", item)
				uni.navigateTo({
					url: "../search/detail/detail?link=" + item.link + "&&title=" + item.title
				})
			},
			
			change(item) {
				let index = item.index
				this.current = index;
			},
			
			changeSwiper(event) {
				let index = event.detail.current;
				this.current = index;
			},

			async getProjectData() {
				const res = await this.$myWebHttp({
					url: "project/tree/json",
				})
				console.log("项目分类数据:", res.data.data)
				this.tabs = res.data.data
			},
		}
	}
</script>

<style lang="scss">
	.swiper {
		position: fixed;
		width: 100%;
	}
	.tab-body {
		width: 100%;
		height: 100%;
	}
	.tabs {
		background-color: #19BE6B;
	}
	.list-item {
		display: flex;
		flex-direction: column;

		.item {
			display: flex;
			flex-direction: row;

			.image {
				flex: 1;
				height: 170rpx;
				margin-top: 20rpx;
				margin-bottom: 20rpx;
				display: flex;
				margin-right: 10rpx;
				justify-content: flex-start;
			}

			.conten {
				flex: 4;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				.title {
					font-size: 30rpx;
					color: #333333;
					margin-top: 15rpx;
					margin-right: 15rpx;
					font-size: 25rpx;
				}

				.desc {
					// font-size: 24rpx;
					// color: #999999;
					// lines: 1;
					// text-overflow: ellipsis;
					
					font-size: 8px;
					color: #999;
					/* font-weight: bold; */
					lines: 3;
					text-overflow:ellipsis; 
				}

				.time {
					display: flex;
					justify-content: space-between;
				}
			}
		}
	}
</style>
