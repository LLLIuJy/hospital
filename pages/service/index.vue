<template>
	<view>
		<!-- 进度条 -->
		<view class="od-banner">
			<!-- 背景图片 -->
			<image src="/static/resource/images//od_bg_icon.png" mode="widthFix" class="od-banner-icon"></image>
			<view class="od-jd od-jd-0">
				<!-- 进度条 -->
				<view class="od-jd-out">
					<!-- 进度条里面的进度显示 -->
					<view class="od-jd-in"></view>
				</view>
				<!-- 关于进度的文字 -->
				<view class="vp-flex od-jd-text">
					<view class="vp-flex_1">
						<text class="od-jd-st-0">填写订单</text>
					</view>
					<view class="vp-flex_1">
						<text class="od-jd-st-10">在线支付</text>
					</view>
					<view class="vp-flex_1">
						<text class="od-jd-st-20">专人服务</text>
					</view>
					<view class="vp-flex_1">
						<text class="od-jd-st-30">服务完成</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 快捷窗口名称和标题 -->
		<view class="pub-box">
			<view class="pub-box-bd">
				<view class="weui-cell weui-cell_input">
					<!-- 图标 -->
					<view class="weui-cell__hd">
						<image class="serv-icon"
							:src="service.icon_image?service.icon_image_url:'../../static/resource/images/avatar.jpg'">
						</image>
					</view>
					<!-- 名称 -->
					<view class="weui-cell__bd">
						<text class="serv-name">{{service.name}}</text>
					</view>
					<!-- 服务内容 -->
					<view class="weui-cell__ft">
						<view class="f5 ic_info" @click="handleTap">
							服务内容
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 表单 -->
		<block v-if="service.stype==10 || service.stype==15 || service.stype==20">
			<view class="pub-box">
				<view class="pub-box-bd">
					<!-- 就诊医院 -->
					<view class="weui-cell weui-cell_input">
						<view class="weui-cell__hd">
							<view class="weui-label">
								就诊医院
							</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft weui-cell__ft_in-access">
							<view>
								<!-- picker从底部弹起的滚动选择器。 -->
								<picker @change="onHospitalchange" :value="hopspital_index" :range="hospitals"
									range-key="name">
									<input type="text" :disabled="true" placeholder="请选择就诊医院"
										:value="hospitals[hospital_index].name" placeholder-class="vp-placeholder" />
								</picker>
							</view>
						</view>
					</view>

					<!-- 就诊时间 -->
					<view class="weui-cell weui-cell_input">
						<view class="weui-cell__hd">
							<view class="weui-label">
								就诊时间
							</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft weui-cell__ft_in-access">
							<view>
								<dtPicker @dtPickerChanged="onStartTimeChanged" :timestamp="order.starttime"
									placeholder="请选择就诊时间"></dtPicker>
							</view>
						</view>
					</view>

					<!-- 就诊人 -->
					<view class="weui-cell weui-cell_input" @click="onClientChange">
						<view class="weui-cell__hd">
							<view class="weui-label">
								就诊人
							</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft weui-cell__ft_in-access">
							<view>
								<input type="text" placeholder="请选择就诊人" style="text-align: right;" class="weui-input"
									placeholder-class="vp-placeholder" :disabled="true" :value="client.name">
							</view>
						</view>
					</view>

					<block v-if="service.stype == 15">
						<!-- 接送陪诊 -->
						<view class="weui-cell weui-cell_input">
							<view class="weui-cell__hd">接送地址</view>
							<view class="weui-cell__bd">
								<input class="weui-input" name="receiveAddress" style="text-align: right"
									placeholder-class="vp-placeholder" placeholder="请填写就诊人所在地址"
									v-model="order.receiveAddress" />
							</view>
						</view>
					</block>
					<!-- 联系电话 -->
					<view class="weui-cell weui-cell_input">
						<view class="weui-cell__hd">联系电话</view>
						<view class="weui-cell__bd">
							<input class="weui-input" type="number" name="tel" style="text-align: right"
								placeholder-class="vp-placeholder" placeholder="请填写您的联系电话" v-model="order.tel" />
						</view>
					</view>
				</view>
			</view>
			<!-- 服务需求 -->
			<view class="pub-box">
				<view class="pub-box-tt">服务需求</view>
				<view class="pub-box-bd">
					<view class="weui-cell weui-cell_input">
						<view class="weui-cell__bd">
							<textarea name="demand" auto-height placeholder="请简单描述您要就诊的科室.."
								placeholder-class="vp-placeholder" style="min-height: 150rpx" v-model="order.demand" />
						</view>
					</view>
				</view>
			</view>
		</block>
		<!-- 代跑取药 -->
		<block v-if="service.stype == 30 || service.stype == 40">
			<!-- 送取结果,代跑取药 -->
			<view class="pub-box">
				<view class="pub-box-bd">
					<view class="weui-cell weui-cell_input">
						<view class="weui-cell__hd">
							<view class="weui-label">所在医院</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft weui-cell__ft_in-access">
							<view>
								<picker @change="onHospitalchange" :value="hospital_index" :range="hospitals"
									range-key="name">
									<input type="text" :disabled="true" placeholder="请选择就诊所在医院"
										:value="hospitals[hospital_index].name" placeholder-class="vp-placeholder" />
								</picker>
							</view>
						</view>
					</view>

					<view class="weui-cell weui-cell_input">
						<view class="weui-cell__hd">
							<view class="weui-label">服务时间</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft weui-cell__ft_in-access">
							<view>
								<dtPicker @dtPickerChanged="onStartTimeChanged" :timestamp="order.starttime"
									placeholder="请选择期望服务时间"></dtPicker>
							</view>
						</view>
					</view>

					<view class="weui-cell weui-cell_input" @click="onAddressChange">
						<view class="weui-cell__hd">
							<view class="weui-label">收件信息</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft weui-cell__ft_in-access">
							<input class="weui-input" :disabled="true" style="text-align: right"
								placeholder-class="vp-placeholder" placeholder="请选择收件信息" :value="
		                                                        order.address.userName
		                                                            ? order.address.userName + '(' + order.address.cityName + order.address.countyName + order.address.detailInfo + ')'
		                                                            : ''
		                                                    " />
							<!-- {{order.address?(order.address.userName+'('+order.address.telNumber+')'):''}} -->
						</view>
					</view>
					<view class="weui-cell weui-cell_input">
						<view class="weui-cell__hd">联系电话</view>
						<view class="weui-cell__bd">
							<input class="weui-input" type="number" name="tel" style="text-align: right"
								placeholder-class="vp-placeholder" placeholder="请填写您的联系电话" v-model="order.tel" />
						</view>
					</view>
				</view>
			</view>

			<view class="pub-box">
				<view class="pub-box-tt">服务需求</view>
				<view class="pub-box-bd">
					<view class="weui-cell weui-cell_input">
						<view class="weui-cell__bd">
							<textarea name="demand" auto-height placeholder="如有其他服务要求请在此填写.."
								placeholder-class="vp-placeholder" style="min-height: 150rpx" v-model="order.demand" />
						</view>
					</view>
				</view>
			</view>
		</block>



		<!-- 下单 -->
		<view style="height: 300rpx"></view>
		<!-- 悬浮提交按钮 -->
		<view class="vp-foot">
			<view style="background: #ffffff; padding: 20rpx">
				<view class="xieyi" style="text-align: center">
					<text :class="'is_xieyi ' + (is_xieyi ? 'is_xieyi_on' : '')" @click="onXieyiChange">我已阅读并同意</text>
					<navigator :url="cfg.page_xy">《用户协议》</navigator>
					<text>和</text>
					<navigator :url="cfg.page_fw">《服务协议》</navigator>
				</view>
				<view>
					<button :class="'btnp ' + (is_xieyi ? '' : 'btnp-disabled')" @click="submit">
						确认下单
						<block v-if="order.price > 0">（支付{{ order.price }}元）</block>
					</button>
				</view>
			</view>
		</view>
		<!-- 点击确认下单之后的弹出框 -->
		<uni-popup ref="popup" type="center" :is-mask-click="false" background-color="#fff">
			<view class="popup-content">
				<view class="group">
					<input class="uni-input" type="tel" v-model="validMobile.phone" placeholder="手机号" />
				</view>
				<view class="group">
					<input class="uni-input" v-model="validMobile.validCode" placeholder="验证码" />
					<text class="valid-text" @click="countdownChange">{{countdown.validText}}</text>
				</view>
			</view>
			<view class="btns">
				<view class="cancal" @click="cancal">取消</view>
				<view class="ok" @click="ok">确定</view>
			</view>
		</uni-popup>
		<uni-popup ref="qrcodePopup" type="center" :is-mask-click="false" background-color="#fff">
			<view class="pay-box">
				<!-- 关闭按钮 -->
				<image @click="payment" src="/static/resource/images/modal_closer.png" style="display: block;width: 15px;height: 15px;"></image>
				<!-- 提示 -->
				<view class="text-center">
					微信支付
				</view>
				<!-- 二维码 -->
				<canvas id="qrcode" canvas-id="qrcode" style="width: 300rpx;height: 300rpx;"></canvas>
				<view class="text-center">
					请用本人微信扫描二维码
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref,
		toRaw
	} from 'vue'
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import UQRCode from 'uqrcodejs';
	const app = getApp()
	// 弹出框
	const popup=ref()
	const qrcodePopup=ref()

	onLoad((options) => {
		// console.log(options);
		main_load(options)
	})
	// 获取页面服务详情
	const service = ref({})
	// 医院数据源
	const hospitals = ref([])
	// 选中的医院索引
	const hospital_index = ref(0)
	// 订单数据
	const order = reactive({
		// 价格
		price: '',
		// 就诊时间
		starttime: '',
		// 地址
		address: {
			// 姓名
			userName: '',
			// 城市
			cityName: '',
			// 地区
			countyName: '',
			// 地址详情
			detailInfo: ''
		},
		receiveAddress: '',
		tel: '',
		demand: ''
	})
	const cfg = reactive({
		page_xy: '',
		page_fw: ''
	})
	// 就诊人
	const client = reactive({
		name: ''
	})
	// 是否同意协议
	const is_xieyi = ref(false)
	// 手机验证
	const validMobile = reactive({
		// 手机号码
		phone: '',
		// 验证码
		validCode: ''
		
	})
	// 获取验证码按钮里面的信息
	const countdown = reactive({
		validText: '获取验证码',
		time: 60
	})

	// 获取快捷入口（多个的）数据
	const main_load = (options) => {
		app.globalData.utils.request({
			url: '/Service/order',
			data: {
				svid: options.svid
			},
			success: (res) => {
				// console.log(res);
				service.value = res.data.service
				hospitals.value = res.data.hospitals
				// 默认选中医院
				// toRaw返回默认数据
				const hospitalsData = toRaw(hospitals.value)
				console.log(hospitalsData);
				if (options.hid > 0) {
					// 自动选中对应的医院
					for (let i = 0; i < hospitalsData.length; i++) {
						if (hospitalsData[i].id == options.hid) {
							hospital_index.value == i
							order.price == hospitalsData[i].service_price
							break;
						}
					}
				}
			}
		})
	}
	// 点击打开服务提醒弹窗
	const handleTap = () => {

	}
	// 切换就诊医院
	const onHospitalchange = (e) => {
		const value = parseInt(e.detail.value)
		hospital_index.value = value
		order.price = toRaw(hospitals.value)[value].service_price
	}
	// 修改日期后的回调函数
	const onStartTimeChanged = (e) => {
		order.starttime = e.detail.value
	}
	// 点击选择就诊人
	const onClientChange = () => {
		// 跳转到就诊人信息页面
		uni.navigateTo({
			url: '../clients/index?act=select'
		})
	}
	// 接收全局自定义事件
	uni.$on('clientChange', (data) => {
		console.log(data);
		client.name = data.name
		client.id = data.user_id
		client.age = data.age
		client.sex = data.sex
		client.mobile = data.mobile
	})
	// 点击用户协议同意按钮
	const onXieyiChange = () => {
		is_xieyi.value = !is_xieyi.value
	}
	// 收件信息
	const onAddressChange = () => {
		uni.chooseAddress({
			success: res => {
				console.log(res);
				order.address.userName = res.userName
				order.address.cityName = res.cityName
				order.address.countyName = res.countyName
				order.address.detailInfo = res.detailInfo
			},
			fail: () => {
				console.log(res, 'err');
			}
		})
	}

	let submitOrder

	// 下单
	const submit = () => {
		// 如果没有勾选同意协议
		if (!is_xieyi.value) {
			// 给一个提示
			return uni.showToast({
				title: '请先阅读并同意用户协议和服务协议',
				icon: 'none',
				duration: 1000
			})
		}
		// 订单数据
		const orderData = toRaw(order)
		// 服务数据
		const serviceData = toRaw(service.value)
		// 医院数据
		const hospitalsData = toRaw(hospitals.value)
		// 就诊人
		const clientData = toRaw(client)
		
		orderData.service_code=serviceData.code
		orderData.service_id=serviceData.id
		orderData.service_name=serviceData.name
		orderData.service_stype=serviceData.stype
		
		// 医院的选择校验
		if (serviceData.stype < 100) {
			if (hospital_index == 0) {
				return uni.showToast({
					title: '请选择医院',
					icon: 'none',
					duration: 1000
				})
			}
			orderData.hospital_id = hospitalsData[hospital_index.value].id
			orderData.hospital_name = hospitalsData[hospital_index.value].name
		}
		// 就诊时间
		if (!order.starttime) {
			return uni.showToast({
				title: '请选择时间',
				icon: 'none',
				duration: 1000
			})
		}
		// 如果服务类型为陪诊
		if (serviceData.stype == 10 || serviceData.stype == 15 || serviceData.stype == 20) {
			// 就诊人验证
			if (!clientData.id) {
				return uni.showToast({
					title: '请选择就诊人',
					icon: 'none',
					duration: 1000
				})
			}
			orderData.client = {}
			// 添加数据
			orderData.client.age = clientData.age
			orderData.client.number = clientData.number
			orderData.client.mobile = clientData.mobile
			orderData.client.name = clientData.name
			orderData.client.sex = clientData.sex

			// 接送地址验证
			if (serviceData.stype == 15) {
				if (!order.receiveAddress) {
					return uni.showToast({
						title: '请填写就诊人所在地址',
						icon: 'none',
						duration: 1000
					})
				}
			}
		}
		if (serviceData.stype == 30 || serviceData.stype == 40) {
			// 判断收件地址
			if (!orderData.address.userName) {
				return uni.showToast({
					title: '请选择收件信息',
					icon: 'none',
					duration: 1000
				})
			}
		}
		// 判断联系电话
		if (!orderData.tel) {
			return uni.showToast({
				title: '请填写您的联系方式',
				icon: 'none',
				duration: 1000
			})
		}
		console.log(orderData);
		submitOrder=orderData
		// 判断当前用户是否存在
		if (!uni.getStorageSync('token')) {
			popup.value.open('center')
		}else{
			// 下单的逻辑
			createOrder(submitOrder)
		}
	}
	// 下单界面取消按钮
	const cancal = () => {
		// 关闭弹窗
		popup.value.close()
	}
	// 下单界面确定按钮
	const ok = () => {
		// 先确定手机号码和验证码是否都填写完毕
		if(!validMobile.phone || !validMobile.validCode){
			// 如果不存在，给一个提示
			return uni.showToast({
				title: '请检查手机号码和验证码是否填写',
				icon: 'none',
				duration: 1000
			})
		}
		// 验证短信
		app.globalData.utils.request({
			url:'/user/authentication',
			method:'POST',
			data:{
				tel:validMobile.phone,
				code:validMobile.validCode
			},
			success:res=>{
				// 将token缓存
				uni.setStorageSync('token',res.data.token)
				// 下单的方法
				createOrder(submitOrder)
				// 关闭验证码弹出框
				popup.value.close()
			},
			fail:res=>{
				uni.showToast({
					title: res.msg,
					icon: 'none',
					duration: 1000
				})
			}
		})
		
	}
	
	// 获取验证码按钮是否被点击
	let flag = false
	// 点击获取验证码
	const countdownChange = () => {
		// 判断手机号是否存在
		if (!validMobile.phone) {
			// 如果不存在，给一个提示
			return uni.showToast({
				title: '请输入手机号码',
				icon: 'none',
				duration: 1000
			})
		}
		if (flag) return
		// 添加验证码倒计时
		const time = setInterval(() => {
			if (countdown.time <= 0) {
				countdown.validText = '获取验证码'
				countdown.time = 60
				flag = false
				// 清除定时器
				clearInterval(time)
			} else {
				countdown.time -= 1
				countdown.validText = `剩余${countdown.time}s`
			}
		}, 1000)
		// 被点击，变为true
		flag = true
		// 调用接口，发送验证码
		app.globalData.utils.request({
			url:'/get/code',
			method:'POST',
			data:{
				tel:validMobile.phone
			},
			// 发送成功的回调
			success:res=>{
				uni.showToast({
					title: '验证码发送成功，请注意查收',
					icon: 'none',
					duration: 1000
				})
			},
			// 发送失败的回调
			fail:res=>{
				uni.showToast({
					title: res.msg,
					icon: 'none',
					duration: 1000
				})
			}
		})
	}
	// 创建订单
	const createOrder=(orderData)=>{
		// 调用创建订单接口
		app.globalData.utils.request({
			url:'/pay/createOrder',
			method:'POST',
			header:{
				token:uni.getStorageSync('token')
			},
			data:orderData,
			success:res=>{
				// 打开弹出层
				qrcodePopup.value.open('center')
				 // 获取uQRCode实例
				  const qr = new UQRCode();
				  // 设置二维码内容
				  qr.data = res.wx_code
				  // 设置二维码大小，必须与canvas设置的宽高一致
				  qr.size = 150;
				  // 调用制作二维码方法
				  qr.make();
				  // 获取canvas上下文
				  var canvasContext = uni.createCanvasContext('qrcode'); // 如果是组件，this必须传入
				  // 设置uQRCode实例的canvas上下文
				  qr.canvasContext = canvasContext;
				  // 调用绘制方法将二维码图案绘制到canvas上
				  qr.drawCanvas();
			},
			fail:res=>{
				
			}
		})
	}
	// 点击二维码关闭按钮，跳转到订单列表
	const payment=()=>{
		uni.switchTab({
			url:'/pages/order/index'
		})
	}
</script>

<style>
	page {
		background: #f0f0f0;
	}

	.weui-cells {
		margin: 0;
	}

	.weui-cell {
		padding: 20rpx;
	}

	.weui-cells::before {
		display: none;
	}

	.weui-label {
		width: auto;
	}

	.weui-cell__ft {
		color: #353535;
	}

	.weui-cell__ft text {
		color: #353535;
	}

	.od-banner {
		overflow: hidden;
		position: relative;
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAyAAAAABCAIAAACpCl0xAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHrSURBVHjadFVBcgMxCEP3Prtv6vfUrI1A2JvMtJPYGIQQgJ+/X0YgPh+uv/V1nTCI9ZORJthGaVyWrFehU9qX/cvP9d+d9Ieyf4uVqMxPRpf/jfm5SRs+vsxVzOd19Yq8gbmZrnaUJueJtrBjPHd+klJ3aNSRA8uAF0o8rnJg1ihOTizZ5tKeJttN7AHvKNYNu3jAWeJWyMVJKJ2T/9e4h+dR4vPJi4eLik2Rp4uhZOabjTNLK1IhreUzp8MFB8Mj06YaSwxU0Z8LsYQkVDfLmNWe1ZhWTHwcwcCYp0MNb9pbqt0pmkyWu4aBBdy0yLNXXorl6nbGfdqEpQydLz4oTm7N4xgFEXkUUhst68VhkpTw6YKpFnB+8CrLcZ6xNnMFuSLegU51Cm/pBkbOaLpVSND4FgbUcCihz5Igrh68dSL9LoaiNIxWqJ17W4XNjcLcspF2JbMYhLSQtvjwOmu6UZl9wtUEPX811zn1CGt1Sxv3KknFbZcZBTWqsqjDLHAkqx66V0mSUOqh2kmnsHL4oCHjy3iTWrLv1bYs1bF7xJpq20Snfw4T06EG+15qFJ3FftQIDMYlqeRjLC8czUWtbFiXsReJ+FVKYcSf67sHQl/5KGkaplpt/aiWyeK39WS2tJWL6CmUMv8XYABQPZBxCZSO0gAAAABJRU5ErkJggg==) repeat-y center;
		background-size: 100%;
	}

	.od-banner-icon {
		position: absolute;
		top: 30rpx;
		right: -20rpx;
		width: 130rpx;
		opacity: 0.6;
	}

	.od-jd {
		margin: 60rpx 40rpx;
	}

	.od-jd-out {
		background: #ffffff;
		border: 5rpx solid #ffffff;
		height: 20rpx;
		line-height: 20rpx;
		border-radius: 50rpx;
		overflow: hidden;
		position: relative;
	}

	.od-jd-in {
		height: 20rpx;
		line-height: 20rpx;
		border-radius: 50rpx;
		overflow: hidden;
		width: 0%;
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAyAAAAABCAIAAACpCl0xAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHrSURBVHjadFVBcgMxCEP3Prtv6vfUrI1A2JvMtJPYGIQQgJ+/X0YgPh+uv/V1nTCI9ZORJthGaVyWrFehU9qX/cvP9d+d9Ieyf4uVqMxPRpf/jfm5SRs+vsxVzOd19Yq8gbmZrnaUJueJtrBjPHd+klJ3aNSRA8uAF0o8rnJg1ihOTizZ5tKeJttN7AHvKNYNu3jAWeJWyMVJKJ2T/9e4h+dR4vPJi4eLik2Rp4uhZOabjTNLK1IhreUzp8MFB8Mj06YaSwxU0Z8LsYQkVDfLmNWe1ZhWTHwcwcCYp0MNb9pbqt0pmkyWu4aBBdy0yLNXXorl6nbGfdqEpQydLz4oTm7N4xgFEXkUUhst68VhkpTw6YKpFnB+8CrLcZ6xNnMFuSLegU51Cm/pBkbOaLpVSND4FgbUcCihz5Igrh68dSL9LoaiNIxWqJ17W4XNjcLcspF2JbMYhLSQtvjwOmu6UZl9wtUEPX811zn1CGt1Sxv3KknFbZcZBTWqsqjDLHAkqx66V0mSUOqh2kmnsHL4oCHjy3iTWrLv1bYs1bF7xJpq20Snfw4T06EG+15qFJ3FftQIDMYlqeRjLC8czUWtbFiXsReJ+FVKYcSf67sHQl/5KGkaplpt/aiWyeK39WS2tJWL6CmUMv8XYABQPZBxCZSO0gAAAABJRU5ErkJggg==) repeat-y center;
		background-size: 100%;
	}

	.od-jd-text {
		text-align: center;
		padding-top: 30rpx;
	}

	.od-jd-text text {
		color: #ffffff;
		font-size: 26rpx;
		opacity: 0.7;
	}

	.od-jd-0 .od-jd-in {
		width: 12%;
	}

	.od-jd-0 .od-jd-st-0 {
		opacity: 1;
		font-weight: bold;
	}

	.od-jd-10 .od-jd-in {
		width: 37%;
	}

	.od-jd-10 .od-jd-st-10 {
		opacity: 1;
		font-weight: bold;
	}

	.od-jd-20 .od-jd-in {
		width: 64%;
	}

	.od-jd-20 .od-jd-st-20 {
		opacity: 1;
		font-weight: bold;
	}

	.od-jd-30 .od-jd-in {
		width: 100%;
	}

	.od-jd-30 .od-jd-st-30 {
		opacity: 1;
		font-weight: bold;
	}

	.od-jd-40 .od-jd-in {
		width: 100%;
		background: #999999;
	}

	.serv-icon {
		display: block;
		width: 50rpx;
		height: 50rpx;
		margin: 15rpx 15rpx 15rpx 0;
	}

	.serv-name {
		font-weight: bold;
	}

	.pub-box {
		margin: 20rpx;
		position: relative;
	}

	.pub-box-tt {
		height: 80rpx;
		line-height: 80rpx;
		position: relative;
		padding-left: 10rpx;
	}

	.pub-box-tt text {
		font-size: 24rpx;
	}

	.pub-box-ttl {
		padding-left: 10rpx;
	}

	.pub-box-ttl text {
		color: #888888;
	}

	.pub-box-ttr {
		position: absolute;
		right: 10rpx;
		top: 0;
		height: 80rpx;
		line-height: 80rpx;
	}

	.pub-box-ttr text {
		color: #576b95;
	}

	.pub-box-bd {
		border: 1rpx solid #eeeeee;
		border-radius: 10rpx;
		overflow: hidden;
		background: #ffffff;
		position: relative;
	}

	.pub-box-bd .weui-cell::before {
		left: 20rpx;
	}

	.xieyi {
		text-align: center;
		padding-bottom: 20rpx;
	}

	.xieyi text {
		font-size: 28rpx;
	}

	.xieyi navigator {
		font-size: 28rpx;
		display: inline-block;
		color: #0bb684;
	}

	.is_xieyi {
		display: inline-block;
		padding-left: 36rpx;
		background: url(data:image/png;base64,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) no-repeat left center;
		background-size: 30rpx;
	}

	.is_xieyi_on {
		background-image: url(data:image/png;base64,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);
	}
	.popup-content {
		width: 600rpx;
		height: 260rpx;
		padding: 20rpx;
	}
	.popup-content .group {
		margin: 20rpx;
		display: flex;
	}
	.popup-content .group input {
		padding-left: 10rpx;
		width: 100%;
		border-bottom: 2rpx solid #f5f5f5;
	}
	.popup-content .group .valid-text {
		width: 230rpx;
		text-align: center;
		line-height: 72rpx;
		font-size: 28rpx;
		color: #409eff;
	}
	.btns {
		display: flex;
		border-top:2rpx solid #f5f5f5;
	}
	.btns view{
		flex: 1;
		text-align: center;
		height: 80rpx;
		line-height: 80rpx;
	}
	.btns .cancal {
		border-right: 2rpx solid #f5f5f5;
	}
	.btns .ok{
		color: #ee0a24;
	}
	.uni-popup__wrapper {
		border-radius: 20rpx;
	}
	.text-center {
		text-align: center;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
	}
	.pay-box {
		padding: 40rpx;
	}
	.pay-box canvas {
		margin: 0 auto;
	}
</style>