<template>
	<view>
		<view class="cell-box" v-for="(item, index) in clients" :key="index">
			<view class="weui-cell" @click="onClientSelected" :data-index="index">
				<view class="weui-cell__bd">
					<view>
						<text style="font-weight: bold">{{ item.name }}</text>
					</view>
					<view>
						<text :class="'sext' + item.sex">{{ item.sex == 1 ? '男' : '女' }}</text>
						<text style="margin-left: 10rpx">{{ item.age }}周岁</text>
						<text style="margin-left: 10rpx">{{ item.mobile }}</text>
					</view>
				</view>
				<view class="weui-cell__ft">
					<text v-if="act == 'select'" style="
		                display: inline-block;
		                padding: 15rpx 30rpx;
		                border: 1rpx solid #0bb584;
		                color: #0bb584;
		                font-weight: bold;
		                border-radius: 10rpx;
		                font-size: 28rpx;
		                overflow: hidden;
		            ">
						选择
					</text>
					<text v-else @click="removeClient" :data-id="item.id" style="
		                display: inline-block;
		                padding: 15rpx 30rpx;
		                border: 1rpx solid #eeeeee;
		                color: #f13e6d;
		                border-radius: 10rpx;
		                font-size: 28rpx;
		                overflow: hidden;
		            ">
						移除
					</text>
				</view>
			</view>
		</view>
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
	const app = getApp()

	// 获取传过来的页面参数
	const act = ref('')
	// 就诊人信息
	const clients = ref([])

	onLoad((options) => {
		// console.log(options);
		act.value = options.act
		// 判断传过来的参数是什么，若是select就修改标题为请选择服务对象，否则标题就是服务对象管理
		if (options.act == 'select') {
			// 修改页面标题
			uni.setNavigationBarTitle({
				title: '请选择服务对象'
			})
		} else {
			uni.setNavigationBarTitle({
				title: '服务对象管理'
			})
		}

		// 获取服务对象信息（请求接口）
		app.globalData.utils.request({
			url: '/User/clients',
			success: (res) => {
				console.log(res);
				clients.value = res.data.clients
			}
		})

	})
	// 点击选择就诊人
	const onClientSelected=(e)=>{
		// 先判断act是否携带参数，如果不携带，就不用显示就诊人信息
		if(act=='') return
		// 获取选中就诊人的索引
		const index = e.currentTarget.dataset.index
		// 获取当前就诊人的信息
		const clientData = clients.value[index]
		// 触发全局自定义事件
		uni.$emit('clientChange',toRaw(clientData))
		// 返回上一个页面
		uni.navigateBack()
		
	}
	// 点击移除就诊人
	const removeClient=()=>{
		
	}
</script>

<style>
	page {
		background: #f4f4f4;
	}

	.weui-cells {
		margin: 0;
	}

	.weui-cell {
		padding: 20rpx 30rpx;
	}

	.weui-cell view {
		font-size: 30rpx;
	}

	.weui-cell text {
		font-size: 30rpx;
	}

	.cell-box {
		margin: 20rpx;
		position: relative;
		border-radius: 10rpx;
		background: #ffffff;
		overflow: hidden;
	}

	.sext1 {
		color: #4881df;
	}

	.sext2 {
		color: #df4872;
	}

	.sex {
		padding: 15rpx 30rpx;
		display: inline-block;
		border: 1rpx solid #eeeeee;
	}

	.sex1 {
		border-right: 0 none;
		border-radius: 8rpx 0 0 8rpx;
	}

	.sex2 {
		border-radius: 0 8rpx 8rpx 0;
	}

	.sex1on {
		background: #4881df;
		border-color: #3b77dc;
		color: #ffffff;
	}

	.sex2on {
		background: #df4872;
		border-color: #df4872;
		color: #ffffff;
	}
</style>