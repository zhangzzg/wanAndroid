<template>
	<view>
		<u-tabs :current="current" :list="tabs" lineWidth="20" lineColor="#01a4ff" :activeStyle="{
			            color: '#303133',
			            fontWeight: 'bold',
			            transform: 'scale(1.05)'
			        }" :inactiveStyle="{
			            color: '#606266',
			            transform: 'scale(1)'
			        }" itemStyle="padding-left: 15px; padding-right: 15px; height: 34px;" @click="click">
		</u-tabs>
	</view>
</template>

<script>
	export default{
		props:{
			tabs:{
				type:Array,
				default:[]
			},
			current:{
				type:Number,
				default:0
			}
		},
		methods:{
			click(item){
				uni.$emit('click',item)
			}
		}
	}
</script>

<style>
</style>