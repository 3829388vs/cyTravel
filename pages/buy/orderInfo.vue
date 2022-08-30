<template>
	<view class="container">
		<view class="header">
			<view class="ticket" :style="{'background-image' : `url(${ticket.img})`}">
				<image class="code" src="../../static/images/ticketCode.png"></image>
				<view class="codeText">{{code}}</view>
			</view>
		</view>
		<view class="info">
			<view class="row">
				<text>编号：{{code}}</text>
			</view>
			<view class="row">
				<text>名称：{{ticketInfo.name}}门票</text>
			</view>
			<view class="row">
				<view style="display: flex;">
					<text>地址：</text>
					<view style="width: 500rpx;">{{ticketInfo.adress}}</view>
				</view>
			</view>
			<view class="row">
				<text>单价：{{ticketInfo.money}}&nbsp;元</text>
			</view>
			<view class="row">
				<text>数量：{{ticketInfo.num}}&nbsp;张</text>
			</view>
			<view class="row">
				<text>购票时间：{{ticketInfo.date}}</text>
			</view>
			<view class="row">
				<text>有效期：长期有效</text>
			</view>
			<view class="row">
				<text>开放时间：{{ticketInfo.openDate}}</text>
			</view>
			<view class="row">
				<text>注意事项：</text>
				<view class="notice">{{ticketInfo.notice}}</view>
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
			}
		}
	},
	onLoad(options) {
		this.createCode()
		if(options != {}){
			this.ticket = JSON.parse(options.item)
			this.ticketInfo.name = this.ticket.ticketName
			this.ticketInfo.money = this.ticket.money
			this.ticketInfo.num = options.num
			this.ticketInfo.notice = this.ticket.notice
			this.ticketInfo.date = options.date
			this.ticketInfo.openDate = this.ticket.openTime
			this.ticketInfo.adress = this.ticket.address
		}
		uni.getScreenBrightness({
			success: function (res) {
				this.light = res.value
			},
			fail: function (err) {
				
			}
		});
		uni.setScreenBrightness({
			value: 0.6,
			success: function () {
				
			}
		});
	},
	onUnload(){
		uni.setScreenBrightness({
			value: this.light,
			success: function () {
				
			}
		});
	},
	methods:{
		createCode(){
			var date = new Date()
			var year = date.getFullYear()
			var month = date.getMonth() + 1
			var day = date.getDate()
			var num = Math.floor(Math.random() * 9999 + 1000);
			var num2 = Math.floor(Math.random() * 5 + 1);
			var code = ['X','Y','Z','C','A','X']
			var endCode = code[num2]
			this.code = "CY-" + year + month + day + num +endCode
		}
	}
}
</script>

<style lang="scss">
.container{
	width: 100%;
	padding: 150rpx 0rpx;
	background-color: #f1f1f1;
	.header{
		width: 100%;
		height: 400rpx;
		padding: 0rpx 60rpx;
		.ticket{
			width: 82%;
			height: 350rpx;
			border-radius: 26rpx;
			box-shadow: 4rpx 4rpx 8rpx 8rpx #8f8f8f;
			background-size: cover;
			background-repeat: no-repeat;
			position: relative;
			.code{
				width: 150rpx;
				height: 150rpx;
				position: absolute;
				bottom: 72rpx;
				right: 56rpx
			}
			.codeText{
				color: #fff;
				position: absolute;
				font-size: 26rpx;
				bottom: 30rpx;
				right: 30rpx
			}
		}
	}
	.info{
		width: 100%;
		text-align: left;
		padding-left: 100rpx;
		.row{
			margin-top: 14rpx;
			.notice{
				color: #9c9c9c;
				font-size: 28rpx;
				width: 72%;
				padding: 20rpx 40rpx;
			}
		}
	}
}
</style>