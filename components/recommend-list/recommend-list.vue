<template>
	<view>
		<uni-card :cover="imgUrl" :title="spotInfo.name">
			<text class="uni-body">{{spotInfo.detail}}</text>
			<view class="bottom">
				<view class="visited">
					<p>{{spotInfo.visit}}</p>
					<p>&nbsp;人去过</p>
				</view>
				<view class="money">
					<p>预估价：</p>
					<p style="font-size: 38rpx;color: rgb(245, 184, 0);font-weight: bold;margin-right: 10rpx;">¥</p>
					<p style="font-size: 54rpx;color: rgb(255, 43, 1);font-weight: bold;font-style: italic;">{{spotInfo.money}}</p>
				</view>
			</view>
		</uni-card>
	</view>
</template>

<script>
	export default {
		props:{
			imgUrl: String,
			spotInfo: {
				type: Object,
				default: () => {
					return {};
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.money{
		display: flex;
	}
	.visited{
		display: flex;
	}
	.bottom{
		width: 94%;
		padding: 20rpx 10rpx;
		color: rgb(170, 170, 170);
		font-size: 30rpx;
		display: flex;
		justify-content: space-between;
	}
</style>