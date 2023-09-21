<template>
	<view>
		<view class="toTop" @click="toTop">
			<image src="../../static/toTop.png"></image>
		</view>
	</view>
</template>

<script>
	export default {
		methods:{
			toTop(){
				uni.$emit('backtop')
			}
		}
	}
</script>

<style>
.toTop{
	position: fixed;
	width: 60px; 
	height: 60px;
	background: #dd524d;
	z-index: 55; 
	bottom: 70px; 
	right: 15px;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	opacity: .7;
}
.toTop image{
	width: 60%;
	height: 60%;
}
</style>
