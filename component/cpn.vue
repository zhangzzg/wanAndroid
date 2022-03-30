<template >
	<view>
		<!-- <view>
			<slot name="left"><text>左边</text></slot>
			<slot name="center"><text>中间</text></slot>
			<slot name="right"><text>右边</text></slot>
		</view>
		<view>
			<slot :data = "books"></slot>
		</view> -->
		<button @click="btngetdata">子组件按钮</button>
	</view>
</template>

<script>
	export default{
		 data(){
             return {
				 books:[
					 "西游记",
					 "红楼梦",
					 "水浒传",
					 "三国演义"
				 ],
				 msg: "hello world"
			 }			
		},
		methods:{
			open(){
				console.log("打印子组件的信息")
			},
			btngetdata(){
				// this.$parent.getParenData()
				console.log("获取父组件实例：",this.$parent)
			}
		}
	}
</script>

<style>
</style>
