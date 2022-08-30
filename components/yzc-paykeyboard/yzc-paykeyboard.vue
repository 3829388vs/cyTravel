<template>
	<view>
		<!-- mask层 -->
		<view :class="['mask', showPay ? '' : 'visible']"></view>
		<!-- 微信支付 -->
		<view :class="['wechatPay', show ? '' : 'visible']">
			<icon type="success" size="34" class="success" color="#fff"/>
			<view class="wechat-text">微信支付</view>
			<view class="dot">
				<uni-icons style="margin-right: 8rpx;" type="smallcircle-filled" size="7" color="#919191" v-if="dot1"></uni-icons>
				<uni-icons style="margin-right: 8rpx;" type="smallcircle-filled" size="7" color="#f9f9f9" v-else></uni-icons>
				<uni-icons style="margin-right: 8rpx;" type="smallcircle-filled" size="7" color="#919191" v-if="dot2"></uni-icons>
				<uni-icons style="margin-right: 8rpx;" type="smallcircle-filled" size="7" color="#f9f9f9" v-else></uni-icons>
				<uni-icons type="smallcircle-filled" size="7" color="#919191" v-if="dot3"></uni-icons>
				<uni-icons type="smallcircle-filled" size="7" color="#f9f9f9" v-else></uni-icons>
				
			</view>
		</view>
		<!-- 金额 -->
		<view :class="['content', showPay ? '' : 'contenthide']">
			<view class="title">
				<view class="close" @click="close()"><image src="../../static/close.png" /></view>
				<view class="center">请输入支付密码</view>
				<view class="close"></view>
			</view>
			<view class="pay-money">
				<view>{{payInfo}}</view>
				<view class="money">￥ <text>{{money}}.00</text></view>
			</view>
			<view class="pay-way">
				<view>支付方式</view>
				<view class="pay-img"><image src="../../static/yue.png"/>余额</view>
			</view>
			<view :class="['code', showPay ? '' : 'visible']">
				<view class="code-box">
					<block v-for="(item, index) in 6" :key="index">
						<view class="code-box-item">{{ (password[index] && '●') || '' }}</view>
					</block>
				</view>
				<input type="number" v-model="password" />
			</view>			
		</view>
		<!-- 键盘 -->
		<view :class="['keyboard', showPay ? '' : 'active', isIphoneX ? 'isIphone' : '']">
			<block v-for="(item, index) in 9" :key="index">
				<view class="keyboard-item" @tap="key(index + 1)">{{index + 1}}</view>
			</block>
			<view class="keyboard-item hide"></view>
			<view class="keyboard-item" @tap="key(0)"><text>0</text></view>
			<view class="keyboard-item delte" @tap="del()"><image class="img" src="../../static/del.png" mode="aspectFill" :lazy-load="true"></image></view>
		</view>
		
	</view>
</template>

<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: false 
			},
			money: {
				type: Number,
				default: 10 
			},
			payInfo:{
				type: String,
				default: '程远旅游'
			},
			isIphoneX: {
				type: Boolean,
				default: false 
			},
		},
		data() {
			return {
				password: '',
				trantision: false,
				showPay:false,
				dot1:true,
				dot2:true,
				dot3:true,
				turn:0
			};
		},
		onShow(){
			this.password = ""
			this.money = 10
		},
		methods: {
			key(key) {
				if (this.password.length < 6) {
					this.password += key;
					if (this.password.length == 6) {
						this.$emit("payed")
					}
				}
			},
			dotLight(index){
				console.log("------"+index)
				if(index == 0){
					this.dot1 = false
					this.dot2 = true
					this.dot3 = true
				}
				if(index == 1){
					this.dot1 = true
					this.dot2 = false
					this.dot3 = true
				}
				if(index == 2){
					this.dot1 = true
					this.dot2 = true
					this.dot3 = false
				}
			},
			initLoad(index){
				const self = this
				var indx = index
				var time = setInterval(function(){
					console.log("------s")
					self.turn++
					if(self.turn > 5){
						self.showPay = true
						self.show = false
						clearInterval(time)
						return
					}
					self.dotLight(indx)
					indx++
					if(indx > 2){
						self.initLoad(0)
					}
				},200)
			},
			clear() {
				this.password = '';
			},
			close() {
				const self = this
				self.password = '';
				self.trantision = false;
				self.showPay = false
				self.show = false
				self.$emit('close', false);
			},
			del() {
				if (this.password.length > 0) {
					this.password = this.password.substring(0, this.password.length - 1);
				}
			}
		}
	}
</script>

<style lang="scss">
	input {
		display: none;
	}
	.mask {
		position: fixed;
		width: 100vw;
		height: 100vh;
		left: 0;
		top: 0;
		transition: all 0.3s ease;
		background: rgba(67, 67, 67, 0.7);
		opacity: 1;
		z-index: 2;
		visibility: visible;
	}
	.content {
		width: 588rpx;
		height: 570rpx;
		border-radius: 25rpx;
		position: fixed;
		left: 50%;
		top:35%;
		margin-left: -294rpx;
		margin-top: -285rpx;
		background: #fff;
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		justify-content: center;
		z-index: 2;
		opacity: 1;
		visibility: visible;
		transition: all 0.3s ease;
	}
	.contenthide {
		margin-left: -350rpx;
		margin-top: -340rpx;
		width: 700rpx;
		height: 680rpx;
		opacity: 0;
		z-index: 0;
		visibility: hidden;
	}
	.visible {
		opacity: 0;
		z-index: 2;
		visibility: hidden;
	}
	.title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100rpx;
		width: 560rpx;
		padding: 20rpx 30rpx;
		font-size: 32rpx;
	}
	.center {
		color: #333;
		font-size: 28rpx;
		font-weight: 700;
	}
	.close {
		width: 50rpx;
		height: 50rpx;	
	}
	image {
		width: 100%;
		height: 100%;
	}
	.pay-money {
		width: 525rpx;
		height: 240rpx;
		margin-top: -20rpx;
		border-bottom: 1rpx solid #EBEBEB;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}
	.pay-money view {
		width: 100%;
		height: 80rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.pay-way {
		width: 520rpx;
		height: 85rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #8A8A8A;
		font-size: 28rpx;
	}
	.success{
		display: flex;
		margin-top: 20rpx;
		justify-content: center;
	}
	.wechatPay{
		border-radius: 25rpx;
		width: 190rpx;
		height: 190rpx;
		padding: 30rpx 30rpx;
		position: absolute;
		top: 45%;
		left: 36%;
		background-color: rgba(39, 39, 39, 0.75);
	}
	.money {
		font-size: 46rpx;
		font-weight: bold;
		letter-spacing: 4rpx;
		margin-bottom: 36rpx;
	}
	.money text {
		font-size: 60rpx;
		margin-left: 10rpx;
	}
	.pay-img {
		color: #333333;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.pay-img image {
		width: 35rpx;
		height: 35rpx;
		margin-right: 10rpx;
	}
	.code {
		width: 100%;
		height: 180rpx;
		background: #fff;
		display: flex;
		justify-content: center;
		border-radius: 25rpx;
		align-items: center;
		box-sizing: border-box;
	}
	.code-box {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	.code-box-item {
		width: 72rpx;
		height: 72rpx;
		background: #ebebeb;
		border-radius: 12rpx;
		font-size: 22rpx;
		margin-right: 14rpx;
		line-height: 72rpx;
		text-align: center;
	}
	// .code-box-item:not(:last-child) {
	// 	border-right: 1px solid #d0d0d0;
	// }
	.keyboard {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background: #EBEBEB;
		display: flex;
		justify-content: center;
		z-index: 2;
		flex-wrap: wrap;
		transition:all 0.2s ease-in 0.2s;
	}
	.active {
		bottom: -400rpx;
	}
	.keyboard-item:active {
		background: #d9d9d9;
	}
	.keyboard-item {
		box-sizing: border-box;
		width: 250rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: #fff;
		font-size: 48rpx;
		font-weight: 600;
		color: #333;
		height: 99rpx;
		border: 1rpx solid #f5f5f5;
		border-top:none;
		border-left:none;
	}
	.hide {
		opacity: 0;
	}
	.wechat-text{
		text-align: center;
		margin-top: 20rpx;
		color: #fff;
	}
	.dot{
		display: flex;
		justify-content: center;
		margin-top: 26rpx;
	}
	.delte {
		background: none;
		box-shadow: none;
	}
	.delte image {
		width: 60rpx;
		height: 60rpx;
	}
	.isIphone {
		padding-bottom: 68rpx !important;
	}
</style>
