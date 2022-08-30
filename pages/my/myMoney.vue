<template>
	<view class="container">
		<view class="header">
			<view class="text"><text>我的钱包</text></view>
			<view class="wallet">
				<uni-icons type="wallet" size="30" color="#fff"></uni-icons>
				<view class="money">
					<text style="font-size: 35rpx;padding-right: 8rpx;">¥</text>
					<text>{{userInfo.money}}</text>
				</view>
			</view>
		</view>
		<view class="button">
			<button class="recharge" type="primary" @click="recharge">充值</button>
			<button class="cash" type="primary" plain="true"  @click="cash">提现</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			userInfo:{
				name:'',
				id:'',
				icon:'',
				money: 0,
				signature:'',
				password:'',
				collect:[]
			},
		}
	},
	onShow(){
		this.userInfo = uni.getStorageSync("userInfo")
	},
	onLoad(){
		this.userInfo = uni.getStorageSync("userInfo")
	},
	methods:{
		recharge(){
			const self = this
			uni.showModal({
				title:'账户充值',
				editable:true,
				placeholderText:'请输入充值金额',
				success: function (res) {
					if (res.confirm) {
						if(typeof parseInt(res.content) != 'number' || isNaN(parseInt(res.content))){
							console.log(parseInt(res.content))
							uni.showToast({
								title: '请输入数字',
								duration: 1500,
								icon:"error"
							});
							return
						}
						self.userInfo.money += parseInt(res.content)
						uniCloud.callFunction({
						    name: 'userEdit',
						    data: {
								id: self.userInfo.id,
								money: self.userInfo.money,
							}
						  })
						  .then(res => {
								uni.showToast({
									title: '充值成功',
									duration: 1500,
									icon:"success"
								});
							  uni.setStorageSync('userInfo',self.userInfo)
							  console.log(JSON.stringify(res))
						  })
					}
				},
			})
		},
		cash(){
			const self = this
			uni.showModal({
				title:'账户提现',
				editable:true,
				placeholderText:'请输入提现金额',
				success: function (res) {
					if (res.confirm) {
						if(typeof parseInt(res.content) != 'number' || isNaN(parseInt(res.content))){
							console.log(parseInt(res.content))
							uni.showToast({
								title: '请输入数字',
								duration: 1500,
								icon:"error"
							});
							return
						}
						if(parseInt(res.content) > self.userInfo.money){
							uni.showToast({
								title: '余额不足',
								duration: 1500,
								icon:"error"
							});
							return
						}
						self.userInfo.money -= parseInt(res.content)
						uniCloud.callFunction({
						    name: 'userEdit',
						    data: {
								id: self.userInfo.id,
								money: self.userInfo.money,
							}
						  })
						  .then(res => {
								uni.showToast({
									title: '提现成功',
									duration: 1500,
									icon:"success"
								});
							  uni.setStorageSync('userInfo',self.userInfo)
							  console.log(JSON.stringify(res))
						  })
					}
				},
			})
		},
	}
}
</script>

<style lang="scss">
	.container{
		width: 100%;
		height: 100%;
		.header{
			width: 100%;
			height: 330rpx;
			padding: 100rpx;
			background-color: #00aeff;
			.text{
				width: 82%;
				font-weight: bold;
				font-size: 42rpx;
				text-align: center;
				margin-top: 60rpx;
				color: #fff;
			}
			.icon{
				width: 160rpx;
				height: 160rpx;
			}
			.name{
				font-size: 34rpx;
				color: #fff;
				font-weight: bold;
				padding: 0rpx 10rpx;
			}
		}
		.wallet{
			width: calc(100% - 120rpx);
			display: flex;
			line-height: 100rpx;
			vertical-align: middle;
			position: relative;
			justify-content: center;
			margin-top: 50rpx;
			.money{
				padding-left: 18rpx;
				color: #fff;
				font-size: 56rpx;
			}
		}
		.button{
			margin-top: 200rpx;
			.recharge{
				width: 500rpx;
			}
			.cash{
				width: 500rpx;
				margin-top: 20rpx;
			}
		}
	}
</style>