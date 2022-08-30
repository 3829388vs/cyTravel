<template>
	<view class="container">
		<view class="logo">
			<image src="../../static/images/logo.png"></image>
			<text class="name">程远旅行</text>
		</view>
		<view class="login">
			<view class="row">
				<input class="username" v-model="userName" maxlength="16" type="text" placeholder="请输入账号" placeholder-style="color:#c4c4c4"/>
			</view>
			<view class="row">
				<input class="username" v-model="password" maxlength="16" :password="true" placeholder="请输入密码" placeholder-style="color:#c4c4c4"/>
			</view>
			<view class="login-buttom">
				<button type="primary" @click="login" :loading="isLoad">{{loginText}}</button>
			</view>
		</view>
		<view class="register" @click="register">
			<text>我要注册</text>
		</view>
		<view class="version">V&nbsp;{{version}}</view>
		<uni-popup ref="popup" type="center" background-color="#fff">
			<view class="registerInfo">
				<form>
					<view class="info-row">
						<view class="title"><text style="color: red;">*</text>账号</view>
						<input class="input" maxlength="15" v-model="userInfo.id" @blur="isExist" placeholder="请输入账号" />
						<text style="font-size: 26rpx;color: red;" v-if="exist">该用户名已被注册</text>
					</view>
					<view class="info-row">
						<view class="title"><text style="color: red;">*</text>昵称</view>
						<input class="input" maxlength="8" v-model="userInfo.name" placeholder="请输入昵称" />
					</view>
					<view class="info-row">
						<view class="title">个性签名</view>
						<input class="input" maxlength="30" v-model="userInfo.signature" placeholder="请输入个性签名" />
					</view>
					<view class="info-row">
						<view class="title"><text style="color: red;">*</text>密码</view>
						<input class="input" maxlength="16" v-model="userInfo.password" password placeholder="请输入密码" />
					</view>
					<view class="info-row">
						<view class="title"><text style="color: red;">*</text>确认密码</view>
						<input class="input" maxlength="16" v-model="surepassword" password placeholder="请输入密码" />
					</view>
						<view class="sure" @click="registerInfo">注册</view>
				</form>
			</view>
		</uni-popup>
	</view>
</template>

<script>
export default {
	data() {
		return {
			version:'1.0.0.1',
			isLoad:false,
			loginText:'登录',
			userName: uni.getStorageSync('userInfo').id,
			password: uni.getStorageSync('userInfo').password,
			surepassword:'',
			exist:false,
			userInfo:{
				name:'',
				id:'',
				icon:'',
				money: 0,
				signature:'',
				password:'',
				collect:[]
			}
		}
	},
	methods:{
		login(){
			const self = this
			if(!self.userName|| !self.password){
				  uni.showToast({
					title: '请输入账号密码',
					duration: 2000,
					icon:"error"
				  });
				  return
			}
			self.loginText = '登录中'
			self.isLoad = true
			uniCloud.callFunction({
			    name: 'user',
			    data: {
					name: self.userName,
					password: self.password,
				}
			  })
			  .then(res => {
				  console.log(JSON.stringify(res))
				  if(res.result.data.length < 1){
					  uni.showToast({
					  	title: '账号或密码错误',
					  	duration: 2000,
						icon:"error"
					  });
					  self.loginText = '登录'
					  self.isLoad = false
					  return
				  }else{
					  uni.setStorageSync('userInfo',res.result.data[0])
					  uni.reLaunch({
					  	url: '/pages/index/index'
					  })
				  }
			  });
		},
		isExist(){
			const self = this
			if(self.userInfo.id == ""){
				return
			}
			uniCloud.callFunction({
			    name: 'user',
			    data: {
					name: self.userInfo.id
				}
			  })
			  .then(res => {
				  if(res.result.data[0]){
					  self.exist = true
				  }else{
					  self.exist = false
				  }
			  })
		},
		register(){
			this.$refs.popup.open()
		},
		registerInfo(){
			const self = this
			if(!self.userInfo.id || !self.userInfo.password || !self.userInfo.name
			|| !self.surepassword){
				uni.showToast({
					title: '必填项未填',
					duration: 1500,
					icon:"error"
				});
				return
			}
			if(self.surepassword != self.userInfo.password){
				uni.showToast({
					title: '密码不一致',
					duration: 1500,
					icon:"error"
				});
				return
			}
			uniCloud.callFunction({
			    name: 'userAdd',
			    data: {
					id:self.userInfo.id,
					password:self.userInfo.password,
					name:self.userInfo.name,
					icon:self.userInfo.icon,
					money:self.userInfo.money,
					signature:self.userInfo.signature,
				}
			  })
			  .then(res => {
				  console.log(JSON.stringify(res))
				  uni.showToast({
				  	title: '注册成功',
				  	duration: 2000,
				  	icon:"success"
				  });
			  })
			  this.$refs.popup.close()
		}
	}
}
</script>

<style lang="scss">
.container{
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	background-image: url("../../static/images/bgImg.jpg");
	background-repeat: no-repeat;
	background-size: 100% 100%;
	.cover{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 999;
		background-color: rgba(0, 85, 255, 0.3);
	}
	.logo{
		position: relative;
		top: 300rpx;
		left: 120rpx;
		z-index: 3;
	}
	.login{		
		width: 100%;
		height: 500rpx;
		z-index: 3;
		display: flex;
		flex-direction: column;
		margin-top: 52%;
		margin-left: 10%;
		.row{
			display: flex;
			line-height: 72rpx;
			vertical-align: middle;
			padding: 16rpx 10rpx;
		}
		.username, .password{
			width: 70%;
			height: 62rpx;
			color: #efefef;
			margin-left: 16rpx;
			padding: 12rpx 14rpx;
			border: 0rpx;
			border-bottom: 2rpx solid rgba(219, 219, 219, 0.6) !important;
			background-color: rgba(0, 0, 0, 0);
		}
		.login-buttom{
			margin-top: 60rpx;
		}

	}
	.logo image{
		width: 150rpx;
		height: 150rpx;
		z-index: 3;
	}
	.version{
		width: 100%;
		text-align: center;
		height: 50rpx;
		position: absolute;
		bottom: 20rpx;
		color: #d3d3d3;
		font-size: 28rpx;
	}
	.name{
		letter-spacing: 4rpx;
		color: #f9f9f9;
		font-size: 50rpx;
		position: relative;
		top: -60rpx;
		left: 50rpx;
	}
	.register{
		width: 85%;
		position: relative;
		text-align: right;
		top: -90rpx;
		color: #f4f4f4;
	}
	.sure{
		border-radius: 70rpx;
		width: 150rpx;
		margin-left: 36%;
		height: 60rpx;
		background-color: #0059ff;
		font-size: 32rpx;
		text-align: center;
		color: #fff;
		margin-top: 50rpx;
		line-height: 60rpx;
		vertical-align: middle;
	}
	.info-row{
		padding: 16rpx 10rpx;
	}
	.input{
		width: 400rpx;
		height: 60rpx;
		border: 2rpx solid #cacaca;
		padding: 2rpx 6rpx;
		border-radius: 6rpx;
		margin-top: 10rpx;
	}
	.registerInfo{
		padding: 30rpx 50rpx;
	}
}
	.register text{
		border-bottom: 2rpx solid #f4f4f4;
		font-size: 28rpx;
	}
.login-buttom button{
	width: 70%;
	position: relative;
	left: -10%;
}

</style>