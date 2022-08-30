<template>
	<view>
		<web-view style="height: 200rpx;height: 500rpx;" :src="url">
		</web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				url: ''
			}
		},
		methods: {},

		onLoad(e) {
			console.log('onLoad ' + e.title)
			console.log('onLoad ' + e.url)

			const self = this

			this.title = e.title
			this.url = e.url
		},
		onShow() {
			//页面显示时切换为重力感应方向配置
			// #ifdef APP-PLUS
			plus.screen.lockOrientation('default');
			// #endif
			uni.setNavigationBarTitle({
				title: this.title
			})
		},
		//
		onReady() {
			var wv;
			var currentWebview = this.$mp.page.$getAppWebview();
			setTimeout(function() {
				wv = currentWebview.children()[0]
				console.log(wv.getStyle());
				wv.setStyle({
					scalable: true
				})
			}, 1000);
		}
	}
</script>

<style>
</style>
