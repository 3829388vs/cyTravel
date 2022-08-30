<template>
	<view class="container">
		<view class="header">
			{{spotInfo.name}}
		</view>
		<view style="height: 150rpx;"></view>
		<view class="top">
			<swiper class="swiper" circular :indicator-dots="true" :autoplay="true" :interval="interval"
				:duration="duration">
				<swiper-item v-for="(item,index) in spotInfo.img" @click="preview(item)">
					<image :src="item" style="width: 100%;">
					</image>
				</swiper-item>
			</swiper>
		</view>
		<uni-segmented-control style="margin-top: 10rpx;" :current="current" :values="items" @clickItem="onClickItem" styleType="text" activeColor="#00aeff"></uni-segmented-control>
		<view v-show="current == 0">
			<uni-section title="景点介绍" titleFontSize="32rpx" type="line" class="block">
				<uni-card :is-shadow="false">
					<view class="uni-body">{{spotInfo.detail}}</view>
				</uni-card>
			</uni-section>
			<uni-section title="景点攻略" titleFontSize="32rpx" type="line" class="block">
				<view v-if="spotInfo.glurl.length < 1" class="no-more">
					<text>很抱歉，该景点还没有攻略哦</text>
				</view>
				<iframe style="height: 1500rpx;width: 100%;border: 0rpx;z-index: 99;" ref="iframe_id" :src="spotInfo.glurl"></iframe>
			</uni-section>
		</view>
		<view class="map" v-show="current == 1">
			<uni-section title="地图" titleFontSize="32rpx" type="line" class="block">
				<map style="width: 100%; height: 360px;margin-top: 26rpx;" scale="15" :latitude="spotInfo.latitude" :longitude="spotInfo.longitude" :markers="covers">
				</map>
			</uni-section>
		</view>
		<view class="command" v-show="current == 2">
			<view v-if="spotInfo.command">
				<view class="command-item" v-for="(item,index) in spotInfo.command">
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
			<view v-if="spotInfo.command.length < 1" class="no-more">
				<text>很抱歉，该景点还没有评论哦</text>
			</view>
			<view class="sure" @click="addCommand">
				<uni-icons type="compose" size="22" color="#fff"></uni-icons>
				写评论
			</view>
		</view>
		<uni-fab ref="fab" :pattern="pattern" :content="content" horizontal="right" vertical="bottom"
		direction="horizontal" @trigger="trigger"/>
	</view>
</template>

<script>
export default {
	data() {
		return {
			interval: 5000,
			duration: 1500,
			items: ['基本信息', '同城周边', '评论'],
			current: 0,
			isloaded:true,
			title:'',
			spotInfo:{
				name:'',
				img:[],
				detail:'',
				money:'',
				visit:'',
				city:'',
				allscreen:'',
				glurl:'',
				command:[],
				latitude: 0.0,
				longitude: 0.0,
			},
			command:{
	            icon: '',
	            username: '',
	            content: '',
	            time: '',
			},
			userInfo:{
				name:'',
				id:'',
				icon:'',
				money: 0,
				signature:'',
				password:'',
				collect:[]
			},
			covers: [{
				latitude: 0.0,
				longitude: 0.0,
				iconPath: '../../static/images/location.png'
			}],
			pattern: {
				color: '#7A7E83',
				backgroundColor: '#fff',
				selectedColor: '#007AFF',
				buttonColor: '#007AFF',
				iconColor: '#fff'
			},
			content: [{
					iconPath: '/static/images/good.png',
					selectedIconPath: '/static/images/good1.png',
					text: '点赞',
					active: false
				},
				{
					iconPath: '/static/images/collect.png',
					selectedIconPath: '/static/images/collect1.png',
					text: '收藏',
					active: false
				},
				{
					iconPath: '/static/images/camara.png',
					selectedIconPath: '/static/images/camara1.png',
					text: '全景',
					active: false
				}
			],
		}
	},
	onLoad(options){
		this.userInfo = uni.getStorageSync('userInfo')
		if(this.userInfo.icon == ''){
			this.userInfo.icon = '../../static/images/my.png'
		}
		if(options != {}){
			this.loadSpot(options.name)
		}
	},
	methods:{
		loadSpot(name){
			const self = this
			uniCloud.callFunction({
			    name: 'spot',
			    data: {
					name: name,
				}
			  })
			  .then(res => {
				  console.log(JSON.stringify(res))
				  if(res.success){
					  self.spotInfo = res.result.data[0]
					    //百度坐标转高德（传入经度、纬度）
					            let bd_lng = self.spotInfo.longitude;
					            let bd_lat = self.spotInfo.latitude;
					            function bd_decrypt(bd_lng, bd_lat) {
					              var X_PI = (Math.PI * 3000.0) / 180.0;
					              var x = bd_lng - 0.0065;
					              var y = bd_lat - 0.006;
					              var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI);
					              var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI);
					              var gg_lng = z * Math.cos(theta);
					              var gg_lat = z * Math.sin(theta);
					              return { lng: gg_lng, lat: gg_lat };
					            }
					            // 调用函数传入坐标点
					            let obj = bd_decrypt(bd_lng, bd_lat);
								self.spotInfo.latitude = obj.lat
								self.spotInfo.longitude = obj.lng
								self.covers.latitude = self.spotInfo.latitude
								self.covers.longitude = self.spotInfo.longitude
				  }else{
					  uni.showToast({
					  	title: '加载失败',
					  	duration: 1500,
					  	icon:"error"
					  });
				  }
			  })
		},
		onClickItem(e) {
		  if (this.current != e.currentIndex) {
			this.current = e.currentIndex;
		  }
		},
		preview(url){
			console.log(url)
			uni.previewImage({
				current: url,
				urls: this.spotInfo.img,
			});
		},
		trigger(e) {
			console.log(e)
			this.content[e.index].active = !e.item.active
			if(e.index == 0){
				uni.showToast({
					title: '点赞成功！',
					duration: 2000,
					icon:"none"
				});
			}
			if(e.index == 1){
				this.collect()
			}
			if(e.index == 2){
				if(this.spotInfo.allscreen == ""){
					uni.showToast({
						title: '该景点不支持全景',
						duration: 1500,
						icon:"none"
					});
					return
				}
				plus.runtime.openURL(this.spotInfo.allscreen, function(res) {
					console.log(res);
				 });
			}
		},
		collect(){
			const self = this
			if(!self.userInfo.collect.includes(self.spotInfo.name)){
			self.userInfo.collect.push(self.spotInfo.name)
			uniCloud.callFunction({
			    name: 'userEdit',
			    data: {
					collect: self.userInfo.collect,
					id: self.userInfo.id,
				}
			  })
			  .then(res => {
				  uni.showToast({
				  	title: '收藏成功！',
				  	duration: 2000,
				  	icon:"none"
				  });
			})
			}else{
				uni.showToast({
					title: '您已收藏！',
					duration: 1200,
					icon:"none"
				});
			}
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
						self.spotInfo.command.push(self.command)
						uniCloud.callFunction({
						    name: 'editSpot',
						    data: {
								name: self.spotInfo.name,
								command: self.spotInfo.command
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

		}
	},
}
</script>

<style lang="scss">
.container{
	width: 100%;
	.swiper {
		height: 460rpx;
		background-image: url("@/static/images/loading.gif");
		background-repeat: no-repeat;
		background-size: 100% 90%;
	}
	.swiper-item {
		display: block;
		height: 460rpx;
		line-height: 460rpx;
		text-align: center;
	}
	.map{
		padding: 20rpx 10rpx;
	}
	.block{
		margin-top: 12rpx;
	}
	.command{
		width: 100%;
		height:820rpx;
		overflow-y: auto;
		padding:42rpx 44rpx;
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
}
</style>