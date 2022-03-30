<template>
	<view >
		<web-view :src="link" :webview-styles="webviewStyles" ></web-view>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				link: "",
				title: "",
				webviewStyles: {
					progress: {
						color: '#FF3333'
					},
				}
			}
		},
		onLoad(option) {
			this.link = option.link
			this.title = option.title
			uni.setNavigationBarTitle({
				title:this.title
			})
		},
		methods:{
			back(){
				uni.navigateBack()
			}
		}
	
	}
</script>

<style>
	.body {
		display: flex;
		flex-direction: column;
	}
</style>
