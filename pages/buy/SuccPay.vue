<template>
	<view class="container">
		<view class="header">
			<icon type="success" size="23" class="success" color="#02cd5d"/>
			<view class="wechat-text">支付成功</view>
		</view>
		<view class="main">
			<view class="text" v-if="type != 'hotel'">{{ticketInfo.name}}门票</view>
			<view class="text" v-else>{{ticketInfo.name}}</view>
			<view class="pay-money">
				<view class="money"><text style="font-size: 44rpx;">￥</text> <text>{{ticketInfo.money}}.00</text></view>
			</view>
		</view>
		<view class="bottom">
			<view class="success" @click="sure">
				完成
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			code:'',
			light:0.1,
			ticket:{},
			ticketInfo:{
				name:'',
				money:0,
				num:0,
				notice:'',
				date:'',
				openDate:'',
				adress:''
			},
			type:'',
		}
	},
	onLoad(options) {
		if(options != {}){
			if(options.type == 'hotel'){
				this.type = 'hotel'
				this.ticketInfo.money = options.money
				this.ticketInfo.name = options.name
				return
			}
			this.ticket = JSON.parse(options.item)
			this.ticketInfo.name = this.ticket.ticketName
			this.ticketInfo.money = this.ticket.money
			this.ticketInfo.num = options.num
			this.ticketInfo.notice = this.ticket.notice
			this.ticketInfo.date = options.date
			this.ticketInfo.openDate = this.ticket.openTime
			this.ticketInfo.adress = this.ticket.address
		}
	},
	methods:{
		sure(){
			const self = this
			if(self.type == 'hotel'){
				uni.navigateBack({
					delta:1
				})
				return
			}
			uni.navigateTo({
				url:'./orderInfo?item='+JSON.stringify(self.ticket)+"&num="+self.ticketInfo.num+"&date="+ self.ticketInfo.date
			})
		}
	}
}
</script>

<style lang="scss">
.container{
	width: 100%;
	height: 100%;
	.header{
		display: flex;
		justify-content: center;
		width: 100%;
		margin-top: 110rpx;
		position: relative;
		left: 20rpx;
		.wechat-text{
			color:#02cd5d;
			font-weight: bold;
			font-size: 34rpx;
			margin-left: 12rpx;
		}
	}
	.main{
		margin-top: 220rpx;
		text-align: center;
		.text{
			font-size: 36rpx;
			letter-spacing: 2rpx;
		}
	}
	.pay-money {
		width: 100%;
		height: 240rpx;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		margin-top: 22rpx;
	}
	.money {
		font-size: 64rpx;
		font-weight: bolder;
		letter-spacing: 4rpx;
		margin-bottom: 36rpx;
	}
	.bottom{
		width: 100%;
		position: absolute;
		bottom: 200rpx;
		display: flex;
		border: 0rpx;
		justify-content: center;
		.success{
			width: 320rpx;
			height: 82rpx;
			background-color: #F2F2F2;
			border-radius: 10rpx;
			font-size: 28rpx;
			font-weight: bold;
			letter-spacing: 2rpx;
			text-align: center;
			line-height: 82rpx;
			vertical-align: middle;
			color: #01b753;
		}
	}
}
.money text {
	font-size: 74rpx;
	margin-left: 2rpx;
	font-weight: bolder;
}
.pay-money view {
	width: 100%;
	height: 80rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
