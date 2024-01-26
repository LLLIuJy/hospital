class Utils {
	constructor() {
		this.baseUrl = 'http://159.75.169.224:7300/pz'
	}
	// 获取用户信息
	getUserInfo() {
		// 调用登录的api
		uni.login({
			success: res => {
				console.log(res);
				this.request({
					url: '/auth/wxLogin',
					data: {
						code: res.code
					},
					success: res => {
						console.log(res, 'res');
					}
				})
			}
		})
	}
	// 对请求函数进行二次封装A
	request(option = {
		showLoading: false
	}) {
		// 判断url是否存在
		// 不存在
		if (!option.url) {
			return false
		}
		if (option.showLoading) {
			this.showLoading()
		}
		// 存在  http://159.75.169.224:7300/pz/auth/wxLogin
		uni.request({
			url: this.baseUrl + option.url,
			data: option.data ? option.data : {},
			header: option.header ? option.header : {},
			method: option.method ? option.method : 'GET',
			// 请求成功
			success: (response) => {
				// 关闭加载效果
				uni.hideLoading()
				// 后端返回数据异常
				if (response.data.code != 10000) {
					// 将失败结果返回出去
					if (option.fail && typeof option.fail == 'function') {
						option.fail(response)
					}
				} else {
					// 将成功的结果返回
					if (option.success && typeof option.success == 'function') {
						option.success(response.data)
					}
				}
			},
			// 请求失败
			fail: response => {
				// 关闭加载效果
				uni.hideLoading()
				console.log(response);
			}
		})
	}
	// 创建加载的loading效果
	showLoading() {
		const isShowLoading = uni.getStorageSync('isShowLoading')
		if (isShowLoading) {
			uni.hideLoading()
			uni.setStorageSync('isShowLoading', false)
		}
		uni.showLoading({
			title: '加载中...',
			complete: function() {
				uni.setStorageSync('isShowLoading', true)
			},
			fail: function() {
				uni.setStorageSync('isShowLoading', false)
			}
		})
	}
}

export default new Utils()