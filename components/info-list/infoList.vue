<template>
	<view>
		<view class="block" :style="{ backgroundImage: `url(${item.img})` }" v-for="(item,index) in list" :key="index" @click="toUrl(item.url)">
			<view class="text">{{item.text}}</view>
			<view class="info">点击进入详情>></view>
		</view>
	</view>
</template>

<!-- 
@ img  列表背景图片
@ text  列表标题
@ url  点击列表跳转链接 
@ isWebView  是否是网页
-->

<script>
	export default {
		name:"infoList",
		props:{
			list: {
				type: Array,
				default: () => {
					return [];
				}
			},
			isWebView:{
				type: Boolean,
				default: () => {
					return true;
				}
			},
		},
		methods:{
			toUrl(url){
				if(this.isWebView){
					uni.navigateTo({
						url: '../../pages/spot/webView?url='+url
					})
				}else{
					uni.navigateTo({
						url: url
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.block{
		width: 89%;
		height: 300rpx;
		border-radius: 12rpx;
		margin-bottom: 36rpx;
		position: relative;
		background-size: cover;
		background-repeat: no-repeat;
		box-shadow: 4rpx 4rpx 6rpx 6rpx #c4c4c4;
		.text{
			color:#fff;
			padding: 8rpx 20rpx;
			border-radius: 6rpx;
			background-color: rgba(63, 63, 63, 0.3);
		}
		.info{
			position: absolute;
			bottom:10rpx;
			right:10rpx;
			text-align: right;
			color:#fff;
			font-size: 28rpx;
			margin-right: 16rpx;
		}
	}
</style>