<template>
	<view>
		<uni-nav-bar leftIcon="back" @clickLeft="backAction" :title="name" backgroundColor="#01a4ff" color="#fff"
			statusBar=true />
		<my-tabs :tabs="tabs" :current="current"></my-tabs>
		<swiper class="swiper" v-bind:style="{height:swiperH+'px'}" :duration="duration" :current="current"
			@change="changeSwiper">
			<swiper-item class="tab-body" v-for="(type, index) in tabs" :key="index">
				<scroll-view  @scroll="scroll" :scroll-top="scrollTop" scroll-y style="height: 100%;width: 100%;"
					@scrolltolower="onreachBottom(index)">
					<myarticle :id="type.id"></myarticle>
				</scroll-view>
			</swiper-item>
		</swiper>
		<backTop ></backTop>
	</view>
</template>

<script>
	import myarticle from "../../../component/myarticle.vue"
	export default {
		components:{
			myarticle
		},
		data() {
			return {
				cid: 0,
				page:0,
				name: "",
				tabs: [],
				current: 0,
				bold: true,
				totalData:[],
				scrollTop: 0,
				swiperH: 0,
				duration: 500,
				old: {
					scrollTop: 0
				}
			}
		},
		onLoad(option) {
			let that = this
			this.cid = option.uid
			this.name = option.title
			// 初始化swiper高度
			let tabH = uni.upx2px(220); //80rpx转换px
			this.swiperH = uni.getSystemInfoSync().windowHeight - tabH;
			let obj = option.children.replace("\"([^\"]*)\"", "$1");
			let tabs1 = JSON.parse(obj)
			console.log("tabs1: ", tabs1)
			this.tabs = tabs1
			this.getArticle()
			uni.$on("backtop",function(){
				// 解决view层不同步的问题
				that.scrollTop = that.old.scrollTop
				that.$nextTick(function() {
					that.scrollTop = 0
				});
			})
		},
		methods: {
			onreachBottom(index) {
				setTimeout(function () {
				    uni.$emit("loadMoreArticle")
				}, 800);
			},
			scroll: function(e) {
				this.old.scrollTop = e.detail.scrollTop
			},
			changeSwiper(event) {
				let index = event.detail.current;
				this.current = index;
				console.log("changeSwiper切换获取cid: ", this.cid)
			},
			actionDetail(item){
				uni.navigateTo({
					url:"../../search/detail/detail?link="+item.link+"&&title="+item.title
				})
			},
			change(index) {
				this.current = index;
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
				}
			}
		}
	}
</script>

<style lang="scss">
	.swiper {
		position: fixed;
		width: 100%;
	}
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
				color: #999999;
			}
	
			.time {
				display: flex;
				justify-content: flex-end;
				margin-right: 15rpx;
				color: #999999;
				flex: 1;
			}
		}
	}
	
	.title {
		margin: 20rpx;
		color: #333333;
	}
	.bottom{
		margin-left: 20rpx;
		margin-bottom: 20rpx;
		color: #999999;
	}	
</style>
