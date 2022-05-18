export default{
   isLogin(){
		let isLogin = false
		uni.getStorage({
			key:"username",
			success: (res) => {
				console.log("data: ",res.data)
				if(!res.data){
					isLogin = false
				}else{
					isLogin = true
				}
			},
			fail: (err) => {
				console.log("err",err)
				isLogin = false
			}
		})
		return isLogin 
	},
}