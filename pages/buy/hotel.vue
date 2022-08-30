<template>
	<view class="container">
		<view class="header">
			{{hotInfo.hotName}}
		</view>
		<view style="height: 150rpx;"></view>
		<view class="top">
			<swiper class="swiper" circular :indicator-dots="true" :autoplay="true" :interval="interval"
				:duration="duration">
				<swiper-item v-for="(item,index) in hotInfo.imgList" @click="preview(item)">
					<image :src="item" style="width: 100%;">
					</image>
				</swiper-item>
			</swiper>
		</view>
		<view class="info">
			<uni-section title="酒店地址" titleFontSize="32rpx" type="line" class="block">
				<view style="font-size: 30rpx;color: #7d7d7d;padding: 0rpx 50rpx;">{{hotInfo.address}}</view>
			</uni-section>
			<uni-section title="时间" titleFontSize="32rpx" type="line" class="block">
				<text style="font-size: 30rpx;color: #7d7d7d;padding-left: 50rpx;">{{hotInfo.openTime}}</text>
			</uni-section>
			<uni-section title="酒店介绍" titleFontSize="32rpx" type="line" class="block">
				<view style="font-size: 30rpx;color: #7d7d7d;padding: 0rpx 50rpx;">{{hotInfo.detail}}</view>
			</uni-section>
			<uni-section title="房型" titleFontSize="32rpx" type="line" class="block">
				<uni-collapse >
					<uni-collapse-item title="精选大床房" :show-animation="true">
						<view class="ticRow">
							<view class="ticRow-name">精选大床房</view>
							<view class="ticRow-price"><text style="color: #ff9807;font-size: 24rpx;padding-right: 6rpx;">¥</text>{{hotInfo.money}}</view>
							<view class="ticRow-buttom" @click="oneBuy(0)">立即预定</view>
						</view>
					</uni-collapse-item>
					<uni-collapse-item title="精选双床房" :show-animation="true">
						<view class="ticRow">
							<view class="ticRow-name">精选双床房</view>
							<view class="ticRow-price"><text style="color: #ff9807;font-size: 24rpx;padding-right: 6rpx;">¥</text>{{Math.floor(hotInfo.money*1.2)}}</view>
							<view class="ticRow-buttom" @click="oneBuy(3)">立即预定</view>
						</view>
					</uni-collapse-item>
					<uni-collapse-item title="豪华大床房" :show-animation="true">
						<view class="ticRow">
							<view class="ticRow-name">豪华大床房</view>
							<view class="ticRow-price"><text style="color: #ff9807;font-size: 24rpx;padding-right: 6rpx;">¥</text>{{Math.floor(hotInfo.money*1.3)}}</view>
							<view class="ticRow-buttom" @click="oneBuy(1)">立即预定</view>
						</view>
					</uni-collapse-item>
					<uni-collapse-item title="豪华双床房" :show-animation="true">
						<view class="ticRow">
							<view class="ticRow-name">豪华双床房</view>
							<view class="ticRow-price"><text style="color: #ff9807;font-size: 24rpx;padding-right: 6rpx;">¥</text>{{Math.floor(hotInfo.money*1.5)}}</view>
							<view class="ticRow-buttom" @click="oneBuy(2)">立即预定</view>
						</view>
					</uni-collapse-item>
					<uni-collapse-item title="商务豪华大床房" :show-animation="true">
						<view class="ticRow">
							<view class="ticRow-name">商务豪华大床房</view>
							<view class="ticRow-price"><text style="color: #ff9807;font-size: 24rpx;padding-right: 6rpx;">¥</text>{{Math.floor(hotInfo.money*1.65)}}</view>
							<view class="ticRow-buttom" @click="oneBuy(2)">立即预定</view>
						</view>
					</uni-collapse-item>
				</uni-collapse>
			</uni-section>
			<uni-section title="须知" titleFontSize="32rpx" type="line" class="block">
				<view style="font-size: 30rpx;color: #7d7d7d;padding: 0rpx 50rpx;">{{hotInfo.notice}}</view>
			</uni-section>
		</view>
		<view style="height: 90rpx;"></view>
		<view class="operate">
			<uni-goods-nav :fill="true" :options="options" :button-group="customButtonGroup" @click="onClick"
			@buttonClick="buttonClick"/>
		</view>
		<wyb-popup ref="popup" type="bottom" height="560" width="500" radius="20" :showCloseIcon="true">
		    <view class="popup-content">
				<view class="top-row">
					<view style="padding: 32rpx 0rpx;font-size: 28rpx;">房型</view>
					<radio-group @change="radioChange"  class="uni-list">
						<label class="radio" v-for="(item, index) in hotItems" :key="item.value">
							<view>
								<radio :value="item.value" :checked="index === current" />
							</view>
							<view>{{item.name}}</view>
						</label>
					</radio-group>
					<view style="padding: 32rpx 0rpx;font-size: 28rpx;">数量</view>
						<uni-number-box v-model="ticNum" @change="changeValue" />
					<view class="preBuy" @click="prebuy">立即预定(¥{{nowMoney*ticNum}})</view>
				</view>
		    </view>
		</wyb-popup>
		<wyb-popup ref="popup2" type="bottom" height="800" width="500" radius="20" :showCloseIcon="true">
			<view v-if="hotInfo.commend.length < 1" class="no-more">
				<text>还没有人评论哦</text>
			</view>
			<view class="command" v-if="hotInfo.commend">
				<view class="command-item" v-for="(item,index) in hotInfo.commend">
					<view class="command-info">
						<image :src="item.icon"></image>
						<view style="display:flex;flex-direction:column;">
							<view class="command-info-top">
								<view class="user">{{item.username}}</view>
								<view style="font-size: 26rpx;color:#aeaeae;">{{item.time}}</view>
							</view>
							<view class="command-content">{{item.content}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="sure" @click="addCommand">
				<uni-icons type="compose" size="22" color="#fff"></uni-icons>
				写评论
			</view>
		</wyb-popup>
		<passkeyborad ref="passkeyborad" :show="showPay" @payed="paySuccess" :money="nowMoney*ticNum" @close="close" :payInfo="payInfo"></passkeyborad>
	</view>
</template>

<script>
import wybPopup from '@/components/wyb-popup/wyb-popup.vue'
import passkeyborad from '@/components/yzc-paykeyboard/yzc-paykeyboard.vue'

export default {
	data() {
		return {
			hotInfo:{
				text: "",
				url: "",
				img: "",
				name: "",
				hotName: "",
				address: "",
				detail: "",
				imgList: [],
				commend:[],
				money: 0,
				notice: "",
				openTime: "",
				webUrl:""
			},
			payInfo:'程远旅游',
			showPay:false,
			command:{},
			nowMoney:0,
			ticNum:1,
			current:0,
			hotItems: [
					{
						value: 'cr',
						name: '精选大床房',
						checked: 'true'
					},
					{
						value: 'et',
						name: '精选双床房'
					},
					{
						value: 'lr',
						name: '豪华大床房'
					},
					{
						value: 'xs',
						name: '豪华双床房'
					},
					{
						value: 'xs2',
						name: '商务豪华大床房'
					}
				],
			interval: 5000,
			duration: 1500,
			tempList:[],
			nowDate:'',
			userInfo:{
				name:'',
				id:'',
				icon:'',
				money: 0,
				signature:'',
				password:'',
				collect:[]
			},
			options: [{
				icon: 'chat',
				text: '评论'
			}, {
				icon: 'phone',
				text: '网订'
			}],
			customButtonGroup: [{
				text: '立即预定',
				backgroundColor: 'linear-gradient(90deg, #fe7a39, #ef3538)',
				color: '#fff'
			}]
		}
	},
	components: {
		wybPopup,
		passkeyborad
	},
	onLoad(options){
		if(options != {}){
			this.userInfo = uni.getStorageSync('userInfo')
			this.hotInfo.hotName = options.name
			this.loadData()
		}
	},
	methods:{
		onClick(e) {
			if(e.index == 1){
				uni.navigateTo({
					url: '../../pages/spot/webView?url='+this.hotInfo.webUrl
				})
			}else{
				this.$refs.popup2.show()
			}
		},
		changeValue(){
			
		},
		oneBuy(type){
			this.current = type
			if(type == 0){
				this.nowMoney = this.hotInfo.money
			}
			if(type == 1){
				this.nowMoney = Math.floor(this.hotInfo.money*0.5)
			}
			if(type == 2){
				this.nowMoney = Math.floor(this.hotInfo.money*0.2)
			}
			if(type == 3){
				this.nowMoney = Math.floor(this.hotInfo.money*0.75)
			}
			this.$refs.popup.show()
		},
		prebuy(){
			if(this.nowMoney == this.hotInfo.money){
				this.payInfo = this.hotInfo.hotName + '——精选大床房'
			}
			if(this.nowMoney == Math.floor(this.hotInfo.money*1.2)){
				this.payInfo = this.hotInfo.hotName + '——精选双床房'
			}
			if(this.nowMoney == Math.floor(this.hotInfo.money*1.3)){
				this.payInfo = this.hotInfo.hotName + '——豪华大床房'
			}
			if(this.nowMoney == Math.floor(this.hotInfo.money*1.5)){
				this.payInfo = this.hotInfo.hotName + '——豪华双床房'
			}
			if(this.nowMoney == Math.floor(this.hotInfo.money*1.65)){
				this.payInfo = this.hotInfo.hotName + '——商务豪华大床房'
			}
			this.showPay = true
			this.$refs.passkeyborad.initLoad(0)
			this.$refs.popup.close()
		},
		close(){
			this.showPay = false
			this.$refs.passkeyborad.show = false
			this.$refs.passkeyborad.showPay = false
		},
		loadData(){
			const self = this
			uniCloud.callFunction({
			    name: 'hotel',
			  })
			  .then(res => {
				 self.tempList = res.result.data
				 self.tempList.map((item,index) => {
					 console.log(JSON.stringify(item))
					 if(item.hotName == self.hotInfo.hotName){
						 self.hotInfo = item
						 self.nowMoney = self.hotInfo.money
					 }
				 })
			  })
		},
		radioChange: function(evt) {
			for (let i = 0; i < this.hotItems.length; i++) {
				if (this.hotItems[i].value === evt.detail.value) {
					console.log(evt.detail.value)
					if(evt.detail.value == 'cr'){
						this.nowMoney = this.hotInfo.money
					}
					if(evt.detail.value == 'et'){
						this.nowMoney = Math.floor(this.hotInfo.money*1.2)
					}
					if(evt.detail.value == 'lr'){
						this.nowMoney = Math.floor(this.hotInfo.money*1.3)
					}
					if(evt.detail.value == 'xs'){
						this.nowMoney = Math.floor(this.hotInfo.money*1.5)
					}
					if(evt.detail.value == 'xs2'){
						this.nowMoney = Math.floor(this.hotInfo.money*1.65)
					}
				}
			}
		},
		paySuccess(){
			const self = this
			let money = self.nowMoney*self.ticNum
			if(parseInt(self.userInfo.money) - money < 0){
				uni.showToast({
					title: '余额不足',
					duration: 1500,
					icon:"error"
				});
				self.showPay = false
				self.$refs.passkeyborad.password = ''
				return
			}
			self.userInfo.money = parseInt(self.userInfo.money) - money
			uniCloud.callFunction({
			    name: 'userEdit',
			    data: {
					id: self.userInfo.id,
					money: self.userInfo.money,
				}
			  })
			  .then(res => {
					self.showPay = false
					self.$refs.passkeyborad.show = false
					self.$refs.passkeyborad.showPay = false
					self.$refs.passkeyborad.password = ''
					uni.navigateTo({
						url:'./SuccPay?type=hotel&money='+self.nowMoney+'&name='+self.hotInfo.hotName
					})
				  uni.setStorageSync('userInfo',self.userInfo)
				  console.log(JSON.stringify(res))
			  })

		},
		addCommand(){
			const self = this
			uni.showModal({
				title:'填写评论',
				editable:true,
				placeholderText:'请输入你的评论',
				success: function (res) {
					if (res.confirm) {
						var date = new Date()
						console.log('用户点击确定'+JSON.stringify(res));
						self.command.content = res.content
						self.command.time = date.getFullYear() + "-" + (date.getMonth()+ 1)  + "-" +  date.getDate() + " " + date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()
						self.command.username = self.userInfo.name
						self.command.icon = self.userInfo.icon
						console.log(JSON.stringify(self.command));
						self.hotInfo.commend.push(self.command)
						uniCloud.callFunction({
						    name: 'editTic',
						    data: {
								name: self.hotInfo.hotName,
								commend: self.hotInfo.commend
							}
						  })
						  .then(res => {
							  uni.showToast({
							  	title: '评论成功！',
							  	duration: 1200,
							  	icon:"success"
							  });
							  console.log(JSON.stringify(res))
						  })
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			})
		},
		preview(url){
			uni.previewImage({
				current: url,
				urls: this.hotInfo.imgList,
			});
		},
		buttonClick(e) {
			this.$refs.popup.show()
		}
	}
}			
</script>

<style lang="scss">
.container{
	width: 100%;
	.header{
		width: 100%;
		height: 150rpx;
		background-color: #00aeff;
		text-align: center;
		line-height: 210rpx;
		vertical-align: middle;
		color: #fff;
		position: fixed;
		top: 0;
		z-index: 999;
	}
	.info{
		padding: 20rpx 0rpx;
	}
	.ticRow{
		display: flex;
		justify-content: space-between;
		padding: 20rpx 40rpx;
		.ticRow-name{
			width: 400rpx;
		}
		.ticRow-price{
			font-size: 36rpx;
			font-weight: bold;
			color: #ff2d08;
			font-style: initial;
		}
		.ticRow-buttom{
			background-color: #ff6b02;
			height: 40rpx;
			padding: 8rpx 18rpx;
			font-size: 24rpx;
			border-radius: 6rpx;
			color: #fff;
		}
	}
	.block{
		margin-top: 12rpx;
	}
	.swiper {
		height: 460rpx;
		background-image: url("@/static/images/loading.gif");
		background-repeat: no-repeat;
		background-size: 100% 90%;
	}
	.top-row{
		padding: 50rpx 30rpx;
		.preBuy{
			width: 300rpx;
			padding: 10rpx 50rpx;
			color:#fff;
			text-align:center;
			border-radius: 50rpx;
			margin-left: 25%;
			margin-top: 80rpx;
			background-color: #0370ff;
		}
		.uni-list{
			width: 100%;
			height: 150rpx;
			display: flex;
			justify-content: space-around;
			flex-wrap: wrap;
			color: #6b6b6b;
			font-size: 28rpx;
			.radio{
				display: flex;
			}
		}
	}
	.command{
		width: 100%;
		height:820rpx;
		overflow-y: auto;
		padding:56rpx 44rpx;
	}
	.command-item{
		margin-bottom:28rpx;
	}
	.command-info{
		display:flex;
	}
	.command-info image{
		width: 86rpx;
		height: 86rpx;
		margin-right:18rpx
	}
	.command-info-top{
		width: 560rpx;
		display:flex;
		justify-content:space-between;
	}
	.command-content{
		color:#7f7f7f;
		width: 580rpx;
		font-size: 28rpx;
		padding:10rpx 10rpx;
	}
	.no-more{
		width: 95%;
		height: 80rpx;
		margin-top: 100rpx;
		text-align: center;
		font-size: 28rpx;
		color: #a1a1a1;
	}
	.sure{
		border-radius: 50rpx;
		width: 160rpx;
		height: 60rpx;
		position: absolute;
		bottom: 70rpx;
		left:44%;
		background-color: #0059ff;
		font-size: 26rpx;
		text-align: center;
		color: #fff;
		line-height: 56rpx;
		vertical-align: middle;
	}
	.operate{
		position: fixed;
		bottom: 0;
		width: 100%;
	}
}
</style>