<template>
	<view>
		<!-- <button style="margin-top: 100px;" @click="photo">调用相机</button> -->
		<!-- <image :src="pic"></image> @faceImg="faceImg" -->
		<pushlive></pushlive> 
	</view>
</template>

<script>
	import {
		pathToBase64
	} from 'image-tools'
	import pushlive from '@/pages/camera/pushlive/pushlive.vue'
	export default {
		components:{
			pushlive
		},
		data() {
			return {
				pic: "../../static/c1.png",
				imgfile: "",
				message:"正在识别..."
			}
		},
		onLoad() {
		},
		methods: {
			//调用相机获取图片地址和图片名字
			photo() {
				let that = this
				plus.camera.getCamera().captureImage(function(e) {
					plus.io.resolveLocalFileSystemURL(e, function(entry) {
						entry.file(function(file) {
							// console.log(e, entry.toLocalURL());
							// that.pic = entry.toLocalURL() //图片的本地路径
							// that.imgfile = file.name //图片的文件名
							console.log("that.pic：" + that.pic);
							that.urlToBase64(entry.toLocalURL())
						})
					}, function(e) {
						console.log("读取拍照文件错误：" + e.message);
					});
				});
			},
			carmera: function() {
				let that = this
				uni.chooseImage({
					count: 6, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //album 从相册选图，camera 使用相机
					success: function(res) {
						console.log("拍照成功: " + JSON.stringify(res.tempFilePaths)); //拍照图片的路径
						that.pic = res.tempFilePaths[0]
					},
					fail: function(err) {
						console.log("拍照错误: " + err)
					}
				});
			},
			urlToBase64(url) {
				// let base64 = 'data:image/jpeg;base64,' + res.data //不加上这串字符，在页面无法显示的哦
				pathToBase64(url).then(base64 => {
						console.log("返回结果: "+base64)
						this.pic = base64
					})
					.catch(error => {
						console.log("图片转换失败:"+error);
					})
			}
		}
	}
</script>

<style>

</style>
