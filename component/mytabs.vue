<template>
	<view>
		<u-tabs :current="current" :list="tabs" lineWidth="20" :lineColor="lineColor" :activeStyle="{
			            color: activedTextColor,
			            fontWeight: 'bold',
			            transform: 'scale(1.05)'
			        }" :inactiveStyle="{
			            color: inactiveTextColor,
			            transform: 'scale(1)'
			        }" itemStyle="padding-left: 15px; padding-right: 15px; height: 34px;" @click="click" :style="{'background-color':bgColor}"> 
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
			},
			bgColor:{
				type:String,
				default:"#ffffff"
			},
			lineColor:{
				type:String,
				default:"#dd524d"
			},
			activedTextColor:{
				type:String,
				default:"#303133"
			},
			inactiveTextColor:{
				type:String,
				default:"#606266"
			}
		},
		methods:{
			click(item){
				// uni.$emit('click',item)
				this.$emit("click",item)
			}
		}
	}
</script>

<style>
</style>