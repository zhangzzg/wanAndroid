const BASE_URL = "https://api.caiyunapp.com/"
const BASE_URL_ = "https://www.wanandroid.com/"
export const myHttp = (option)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:BASE_URL + option.url,
			method:option.method || 'GET',
			data:option.data || {},
			success: (res) => {
				resolve(res)
			},
			fail: (err) => {
				uni.showToast({
					title:"请求失败"
				})
				reject(err)
			}
		})
	})
}

export const myWebHttp = (option)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:BASE_URL_ + option.url,
			method:option.method || 'GET',
			data:option.data || {},
			header:option.header || {},
			success: (res) => {
				resolve(res)
			},
			fail: (err) => {
				console.log("请求失败错误: ",err)
				uni.showToast({
					title:"请求失败"
				})
				reject(err)
			}
		})
	})
}

export const myInterceptor = (method)=>{
    return new Promise((resolve,reject)=>{
		uni.addInterceptor(method,{
			invoke: (args) => {
				 // request 触发前拼接 url 
				console.log("拦截器invoke：", args)
				resolve(args)
			},
			complete: (args) => {
				args.data.code = 1
				console.log("拦截器complete：", args)
				resolve(args)
				uni.removeInterceptor("request")
			},
			fail: (err) => {
				reject(err)
				console.log("----err.data.errMsg---=",err.data.errMsg)
			},
		})
	})
}
