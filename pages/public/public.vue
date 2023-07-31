<template>
	<view>
		<uni-nav-bar  title="公众号" backgroundColor="#01a4ff" color="#fff" statusBar=true />
		<my-tabs :tabs="types" @click="change" :current="current"></my-tabs>
		<swiper class="swiper" v-bind:style="{height:swiperH+'px'}" :duration="duration" :current="current"
			@change="changeSwiper">
			<swiper-item class="tab-body" v-for="(type, index) in types" :key="type.id">
				<scroll-view  @scroll="scroll" :scroll-top="scrollTop" scroll-y style="height: 100%;width: 100%;"
					@scrolltolower="onreachBottom(type.id)">
					<mylist :mid="type.id"></mylist>
				</scroll-view>
			</swiper-item>
		</swiper>
		<backTop></backTop>
	</view>
</template>
<script>
	import mylist from '../../component/mylist.vue'
	export default {
		data() {
			return {
				types: [],
				current: 0,
				itemList: [],
				status: ['loadmore', 'loading', 'nomore'],
				curStatus: 0,
				cid: 408,
				page: 1,
				tabs: [],
				totalData: [],
				scrollTop: 0,
				swiperH: 0,
				duration: 500,
				old: {
					scrollTop: 0
				},
			}
		},
		components: {
			mylist
		},
		onLoad() {
			// 初始化swiper高度
			let tabH = uni.upx2px(220);
			this.swiperH = uni.getSystemInfoSync().windowHeight - tabH;
			this.getWxarticle()
			let that = this
			uni.$on("backtop", function() {
				that.scrollTop = that.old.scrollTop
				that.$nextTick(function() {
					that.scrollTop = 0
				});
			})
		},
		methods: {
			scroll: function(e) {
				this.old.scrollTop = e.detail.scrollTop
			},
			change(item) {
				let index = item.index
				this.current = index;
				this.cid = this.tabs[index].id;
			},
			changeSwiper(event) {
				let index = event.detail.current;
				this.current = index;
				this.cid = this.tabs[index].id;
			},
			async getWxarticle() {
				const res = await this.$myWebHttp({
					url: "wxarticle/chapters/json",
				})
				this.types = this.tabs = res.data.data
			},
			onreachBottom(itemId) {
				uni.$emit("loadMore",itemId)
			},
		}
	}
</script>

<style lang="scss">
	.swiper {
		width: 100%;
	}
	.tab-body {
		width: 100%;
		height: 100%;
	}
	
</style>
