<template>
	<view class="content">
		<view class="user">
			<view class="left" @click="showDrawer('showLeft')">
				<image class="ce" src="../../static/images/ce.png"></image>
			</view>
			<view class="userLogin">
				<image class="my" :src="userInfo.icon"></image>
				<text style="color: #fff;font-size: 22rpx;">{{userInfo.name}}</text>
			</view>
		</view>
		<uni-drawer ref="showLeft" mode="left" :width="250" @change="change($event,'showLeft')">
			<view class="myInfo">
				<view class="myInfo-top">
					<view style="display: flex;">
						<view>
							<image class="my" style="width: 136rpx;height: 136rpx;" :src="userInfo.icon"></image>
							<view class="change-icon" @click="changeIcon">更换头像</view>
						</view>
						<view class="userName">
							<p class="userInfo-name">{{userInfo.name}}</p>
							<p class="userInfo-id">账号：{{userInfo.id}}</p>
						</view>
					</view>
					<view class="wallet">
						<uni-icons type="wallet" size="26" color="#fff"></uni-icons>
						<view class="money">
							<text style="font-size: 28rpx;padding-right: 6rpx;">¥</text>
							<text>{{userInfo.money}}</text>
						</view>
					</view>
				</view>
				<view class="myInfo-list">
					<uni-list>
						<uni-list-item :show-extra-icon="true" showArrow :extra-icon="icon[0]" @click="toUrl('../my/me')" title="个人中心" link></uni-list-item>
						<uni-list-item :show-extra-icon="true" showArrow :extra-icon="icon[1]" @click="toUrl('../my/myMoney')" title="我的钱包" link></uni-list-item>
						<uni-list-item :show-extra-icon="true" showArrow :extra-icon="icon[2]" @click="seeLike" title="我的收藏" link></uni-list-item>
						<uni-list-item :show-extra-icon="true" showArrow :extra-icon="icon[3]" title="设置"></uni-list-item>
						<uni-list-item :show-extra-icon="true" showArrow :extra-icon="icon[4]" @click="exit" title="切换账号" link></uni-list-item>
						<uni-list-item :show-extra-icon="true" showArrow :extra-icon="icon[5]" @click="exit" title="退出登录" link></uni-list-item>
					</uni-list>
				</view>
				<view class="version">
					<text>V&nbsp;{{version}}</text>
				</view>
			</view>
		</uni-drawer>
		<view style="height: 180rpx;"></view>
		<view class="uni-margin-wrap">
			<swiper class="swiper" circular :indicator-dots="true" :autoplay="true" :interval="interval"
				:duration="duration">
				<swiper-item @click="toUrl('../spot/spot?name=丹霞山')">
					<image src="../../static/images/2.jpg" style="width: 100%;">
					</image>
					<view class="img-text">丹霞山</view>
				</swiper-item>
				<swiper-item @click="toUrl('../spot/spot?name=鼓浪屿')">
					<image src="../../static/images/gly.jpeg" style="width: 100%;">
					</image>
					<view class="img-text">鼓浪屿</view>
				</swiper-item>
				<swiper-item @click="toUrl('../spot/spot?name=凤凰古城')">
					<image src="../../static/images/4.jpg" style="width: 100%;">
					</image>
					<view class="img-text">凤凰古城</view>
				</swiper-item>
				<swiper-item @click="toUrl('../spot/spot?name=杭州西湖')">
					<image src="../../static/images/5.jpeg" style="width: 100%;">
					</image>
					<view class="img-text">杭州西湖</view>
				</swiper-item>
				<swiper-item @click="toUrl('../spot/spot?name=漓江景区')">
					<image src="../../static/images/6.jpg" style="width: 100%;">
					</image>
					<view class="img-text">桂林漓江</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="menu">
			<view class="menu-row">
				<view class="menu-item" @click="toUrl('../spot/spotList')">
					<image class="menu-img" src="../../static/images/allspot.png"></image>
					<view class="item-text">景点</view>
				</view>
				<view class="menu-item" @click="toUrl('../buy/hotelList')">
					<image class="menu-img" src="../../static/images/jiudian.png"></image>
					<view class="item-text">酒店</view>
				</view>
				<view class="menu-item" @click="toUrl('../plan/index')">
					<image class="menu-img" src="../../static/images/book.png"></image>
					<view class="item-text">攻略</view>
				</view>
				<view class="menu-item" @click="toUrl('../plan/foods')">
					<image class="menu-img" src="../../static/images/rice.png"></image>
					<view class="item-text">美食</view>
				</view>
			</view>
			<view class="menu-row">
				<view class="menu-item" @click="toUrl('../buy/ticket')">
					<image class="menu-img" src="../../static/images/ticket.png"></image>
					<view class="item-text">门票</view>
				</view>
				<view class="menu-item" @click="noOpen">
					<image class="menu-img" src="../../static/images/airp.png"></image>
					<view class="item-text">机票</view>
				</view>
				<view class="menu-item" @click="noOpen">
					<image class="menu-img" src="../../static/images/team.png"></image>
					<view class="item-text">旅游团</view>
				</view>
				<view class="menu-item" @click="noOpen">
					<image class="menu-img" src="../../static/images/store.png"></image>
					<view class="item-text">必备品</view>
				</view>
			</view>
		</view>
		<view class="advertisment">
			<swiper style="height:250rpx" circular :indicator-dots="false" :autoplay="true" :interval="4000"
				:duration="1500">
				<swiper-item>
					<image class="advertisment-img" src="../../static/images/advertisment1.jpg"></image>
				</swiper-item>
				<swiper-item>
					<image class="advertisment-img" src="../../static/images/advertisment2.jpg"></image>
				</swiper-item>
				<swiper-item>
					<image class="advertisment-img" src="../../static/images/advertisment3.png"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="recom">
			<view class="recom-top">
				<view class="recom-text">推荐</view>
				<view class="more" @click="toUrl('../spot/spotList')">更多></view>
			</view>
			<ls-loading style="margin-top: 100rpx;" text="加载中..." :animation="animation" v-if="pageLoading"></ls-loading>
				<view class="list" v-for="(item,index) in spotList" @click="toUrl('../spot/spot?name='+item.info.name)">
					<recommend-list :imgUrl="item.img" :spotInfo="item.info"></recommend-list>
				</view>
			<view class="no-more">
				<text>没有更多数据了</text>
			</view>
		</view>
		<uni-popup ref="popup" type="center" style="z-index: 1002;" background-color="#fff">
			<view class="sel-icon">
				<radio-group @change="radioChange" style="display: flex;flex-wrap: wrap;">
					<label class="" v-for="(item, index) in userIcon" :key="index">
						<view class="item-icon"><image class="icon" :src="item"></image></view>
						<view>
							<radio :value="item" :checked="index === currentIcon" />
						</view>
					</label>
				</radio-group>
				<view class="sure-icon" @click="sureIcon">确定</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	const loadRec = uniCloud.importObject('recommend')
	import lsLoading from '@/uni_modules/ls-loading/components/ls-loading/ls-loading.vue';
	import recommendList from "../../components/recommend-list/recommend-list.vue"
	export default {
		data() {
			return {
				interval: 3300,
				duration: 1000,
				spotList:[],
				pageLoading: true,
				animation: 'rise',
				showRight: false,
				currentIcon:'',
				icon: [
					{
						color: '#00aeff',
						size: '23',
						type: 'person'
					},
					{
						color: '#00aeff',
						size: '23',
						type: 'wallet'
					},
					{
						color: '#00aeff',
						size: '23',
						type: 'heart'
					},
					{
						color: '#00aeff',
						size: '23',
						type: 'gear'
					},
					{
						color: '#00aeff',
						size: '23',
						type: 'staff'
					},
					{
						color: '#00aeff',
						size: '23',
						type: 'close'
					}
				],
				userIcon:['../../static/icon/girl1.png','../../static/icon/girl2.png','../../static/icon/man1.png','../../static/icon/man2.png','../../static/icon/zx.png'],
				userInfo:{
					name:'admin',
					id:'',
					icon:'',
					money: '',
					signature:'',
				},
				version:'1.0.0.1'
			}
		},
		components: {
			lsLoading
		},
		mounted(){
			if(this.userInfo.icon == ''){
				this.userInfo.icon = '../../static/images/my.png'
			}
		},
		onShow() {
			this.userInfo = uni.getStorageSync('userInfo')
		},
		onLoad() {
			this.userInfo = uni.getStorageSync('userInfo')
			this.getData();
		},
		methods: {
			async getData () {
				try {
					const res = await loadRec.recommendLoad();
					console.log(JSON.stringify(res))
					if(res.data.length > 0){
						this.pageLoading = false
						this.spotList = res.data
					}
				} catch (e) {
					
				}
			},
			showDrawer(e) {
				this.$refs.showLeft.open()
			},
			// 关闭窗口
			closeDrawer(e) {
				this.$refs.showLeft.close()
			},
			// 抽屉状态发生变化触发
			change(e, type) {
				this[type] = e
			},
			changeIcon(){
				this.$refs.popup.open()
			},
			radioChange(e){
				this.userInfo.icon = e.detail.value
			},
			noOpen(){
				uni.showToast({
					title:'该功能暂未开放'
				})
			},
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
			sureIcon(){
				const self = this
				if(self.userInfo.icon == '../../static/images/my.png'){
					this.$refs.popup.close()
					return
				}
				uniCloud.callFunction({
				    name: 'userEdit',
				    data: {
						name: self.userInfo.name,
						password: '',
						id: self.userInfo.id,
						icon: self.userInfo.icon,
						money: self.userInfo.money,
						signature: self.userInfo.signature,
					}
				  })
				  .then(res => {
					  uni.setStorageSync('userInfo',self.userInfo)
					  console.log(JSON.stringify(res))
				  })
				  this.$refs.popup.close()
			},
			seeLike(){
				this.toUrl("../my/collect")
			},
			toUrl(url){
				if(url == '../my/me' || url == '../plan/index'){
					uni.switchTab({
						url: url
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

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.img-text{
		width: 100%;
		height: 68rpx;
		color: #fff;
		font-size: 32rpx;
		padding-left: 26rpx;
		line-height: 64rpx;
		vertical-align: middle;
		background-color: rgba(0, 0, 0, 0.33);
		position: absolute;
		top:292rpx;
		left: 0rpx;
	}
	.recom{
		width: 98%;
		margin-top: 20rpx;
		padding: 0rpx 20rpx;
		.recom-top{
			padding: 20rpx 20rpx;
			display: flex;
			justify-content: space-between;
			.more{
				padding-top: 20rpx;
				color:#b8b8b8;
				font-size: 28rpx;
		}
		}
		.recom-text{
			width: 78rpx;
			font-size: 36rpx;
			font-weight: bold;
			padding: 8rpx 0rpx;
			border-bottom: 4rpx solid #0059ff;
		}
	}
	.menu{
		margin-top: 30rpx;
		width: 100%;
		padding: 50rpx 30rpx;
		.menu-row{
			display: flex;
			padding: 0rpx 80rpx;
			justify-content: space-between;
			.menu-item{
				width: 72rpx;
				height: 140rpx;
				.item-text{
					width: 80rpx;
					color: #0059ff;
					font-size: 26rpx;
					text-align: center;
				}
				.menu-img{
					width: 72rpx;
					height: 72rpx;
					border-radius: 100%;
					border: 4rpx solid #02c4ff;
				}
			}
			
		}
	}
	.list{
		margin-top: 30rpx;
	}
	.user{
		position: fixed;
		top: 0;
		background-color: #00aeff;
		height: 106rpx;
		width: 89%;
		display: flex;
		justify-content: space-between;
		padding: 20rpx 50rpx;
		padding-top: 56rpx !important;
		z-index: 999;
		.left{
			margin-top: 48rpx;
			margin-left: -20rpx;
			.ce{
				width: 58rpx;
				height: 58rpx;
				z-index: 1000;
			}
		}
		.my{
			width: 66rpx;
			height: 66rpx;
			z-index: 1000;
		}
		.userLogin{
			position: relative;
			top: 14rpx;
			display: flex;
			flex-direction: column;
		}
	}

	.advertisment{
		width: 100%;
	}
	.advertisment-img{
		width: 100%;
		height: 250rpx;
	}
		.uni-margin-wrap {
			width: 100%;
		}
		.swiper {
			height: 360rpx;
		}
		.swiper-item {
			display: block;
			height: 360rpx;
			line-height: 360rpx;
			text-align: center;
		}
		.myInfo{
			width: 100%;
			.myInfo-top{
				width: 100%;
				height: 400rpx;
				padding-top: 120rpx;
				padding-left: 50rpx;
				box-sizing: border-box;
				background-color: #00aeff;
				.userName{
					width: 250rpx;
					padding-left: 30rpx;
					padding-top: 26rpx;
					text-align: left;
					.userInfo-name{
						color: #fff;
						font-size: 38rpx;
						letter-spacing: 2rpx;
						font-weight: bold;
					}
					.userInfo-id{
						padding-top: 8rpx;
						font-size: 26rpx;
						color: #fff;
					}
				}
				.change-icon{
					color: #fff;
					font-size: 24rpx;
					margin-left: 24rpx;
					width: 100rpx;
				}
				.wallet{
					width: 100%;
					justify-content: center;
					display: flex;
					line-height: 30rpx;
					vertical-align: middle;
					position: relative;
					left: 16rpx;
					.money{
						padding-left: 8rpx;
						color: #fff;
						font-size: 30rpx;
					}
				}
			}
			.myInfo-list{
				margin-top: 30rpx;
			}
			.myInfo-list uni-list uni-list-item{
				height: 80rpx;
			}
			.version{
				width: 100%;
				margin-top: 420rpx;
				text-align: center;
				color: #a7a7a7;
				font-size: 26rpx;
			}
		}
		.sel-icon{
			padding: 30rpx 30rpx;
			.icon{
				width: 100rpx;
				height: 100rpx;
			}
			.item-icon{
				margin-right: 120rpx;
				margin-top: 30rpx;
			}
			.sure-icon{
				border-radius: 70rpx;
				width: 150rpx;
				margin-left: 42%;
				height: 60rpx;
				background-color: #0059ff;
				font-size: 32rpx;
				text-align: center;
				color: #fff;
				margin-top: 50rpx;
				line-height: 60rpx;
				vertical-align: middle;
			}
		}
		.no-more{
			width: 100%;
			height: 80rpx;
			margin-top: 70rpx;
			text-align: center;
			font-size: 28rpx;
			color: #a1a1a1;
		}
</style>
