<template>
	<view class="container">
		<view class="header">
			<view class="set"><uni-icons type="gear-filled" color="#fff" size="26"></uni-icons></view>
			<view class="circle">
				<image class="icon" :src="userInfo.icon"></image>
				<view class="name">{{userInfo.name}}</view>
			</view>
			<view class="wallet">
				<uni-icons type="wallet" size="26" color="#fff"></uni-icons>
				<view class="money">
					<text style="font-size: 28rpx;padding-right: 6rpx;">¥</text>
					<text>{{userInfo.money}}</text>
				</view>
			</view>
			<view class="signatrue">
				<uni-icons type="paperplane" size="20" color="#fff"></uni-icons>
				<text>{{userInfo.signature}}</text>
			</view>
		</view>
		<view class="my-list">
			<uni-list>
				<uni-list-item :show-extra-icon="true" showArrow :extra-icon="icon[0]" title="修改信息" @click="edit" link></uni-list-item>
				<uni-list-item :show-extra-icon="true" showArrow :extra-icon="icon[1]" @click="toWallet" title="我的钱包" link></uni-list-item>
				<uni-list-item :show-extra-icon="true" showArrow :extra-icon="icon[2]" @click="seeLike" title="我的收藏" link></uni-list-item>
				<uni-list-item :show-extra-icon="true" showArrow :extra-icon="icon[4]" @click="exit" title="切换账号" link></uni-list-item>
				<uni-list-item :show-extra-icon="true" showArrow :extra-icon="icon[5]" @click="exit" title="退出登录" link></uni-list-item>
			</uni-list>
		</view>
		<view class="version">
			<text>V&nbsp;{{version}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				version:'1.0.0.1',
				icon:'',
				userInfo:{
					name:'',
					id:'',
					icon:'',
					money: 0,
					signature:'',
					password:'',
					collect:[]
				},
				icon: [
					{
						color: '#00aeff',
						size: '25',
						type: 'compose'
					},
					{
						color: '#00aeff',
						size: '25',
						type: 'wallet'
					},
					{
						color: '#00aeff',
						size: '25',
						type: 'heart'
					},
					{
						color: '#00aeff',
						size: '25',
						type: 'gear'
					},
					{
						color: '#00aeff',
						size: '25',
						type: 'staff'
					},
					{
						color: '#00aeff',
						size: '25',
						type: 'close'
					}
				],
			}
		},
		onShow(){
			this.userInfo = uni.getStorageSync("userInfo")
		},
		onLoad(){
			this.userInfo = uni.getStorageSync("userInfo")
			if(this.userInfo.icon == ''){
				this.userInfo.icon = '../../static/images/my.png'
			}
		},
		methods:{
			exit(){
				uni.showModal({
					title: '提示',
					content: '确定要退出登录状态吗？',
					success: function (res) {
						if (res.confirm) {
							uni.reLaunch({
								url: '/pages/login/login'
							})
						} else if (res.cancel) {
							
						}
					}
				});
			},
			toWallet(){
				uni.navigateTo({
					url: '../my/myMoney'
				})
			},
			seeLike(){
				uni.navigateTo({
					url: '../my/collect'
				})
			},
			edit(){
				uni.navigateTo({
					url: 'editInfo'
				})
			}
		},
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
		.set{
			width: 70rpx;
			height: 70rpx;
			position: absolute;
			top: 70rpx;
			right: 30rpx;
		}
		.circle{
			margin-top: 5%;
			margin-left: 30%;
		}
		.icon{
			width: 130rpx;
			height: 130rpx;
		}
		.name{
			font-size: 34rpx;
			color: #fff;
			font-weight: bold;
			padding: 0rpx 10rpx;
		}
	}
	.wallet{
		width: 100%;
		display: flex;
		line-height: 100rpx;
		margin-left: 30%;
		vertical-align: middle;
		position: relative;
		.money{
			padding-left: 8rpx;
			color: #fff;
			font-size: 30rpx;
		}
	}
	.signatrue{
		width: calc(100% - 170rpx);
		color: #fff;
		text-align: center;
	}
	.version{
		width: 100%;
		position: absolute;
		bottom:20rpx;
		text-align: center;
		color: #a7a7a7;
		font-size: 26rpx;
	}
	.my-list{
		width: 100%;
		margin-top: 50rpx;
	}
}
</style>