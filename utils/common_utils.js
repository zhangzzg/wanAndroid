export default{
   isLogin(){
		return uni.getStorageSync("username")
	},
}
