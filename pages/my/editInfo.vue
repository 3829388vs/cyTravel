<template>
	<view class="container">
		<view class="editInfo">
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
				<view class="buttom">
					<view class="sure" @click="sureEdit">修改</view>
					<view class="sure" @click="back">返回</view>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			userInfo:{
				name:'',
				id:'',
				icon:'',
				money: 0,
				signature:'',
				password:''
			},
			surepassword:'',
			exist:false,
		}
	},
	onLoad(){
		this.userInfo = uni.getStorageSync("userInfo")
	},
	methods:{
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
					  if(res.result.data[0].id != self.userInfo.id){
						  self.exist = true
					  }
				  }else{
					  self.exist = false
				  }
			  })
		},
		back(){
			uni.navigateBack({
				delta:1
			})
		},
		sureEdit(){
			const self = this
			if(self.surepassword != self.userInfo.password){
				uni.showToast({
					title: '密码不一致',
					duration: 1500,
					icon:"error"
				});
				return
			}
			uniCloud.callFunction({
			    name: 'userEdit',
			    data: {
					name: self.userInfo.name,
					password: self.userInfo.password,
					id: self.userInfo.id,
					signature: self.userInfo.signature,
				}
			  })
			  .then(res => {
				  uni.showToast({
				  	title: '修改成功',
				  	duration: 1500,
				  	icon:"success"
				  });
				  uni.setStorageSync('userInfo',self.userInfo)
				  console.log(JSON.stringify(res))
			  })
		}
	}
}
</script>

<style lang="scss">
		.sure{
			border-radius: 78rpx;
			width: 220rpx;
			height: 70rpx;
			background-color: #0059ff;
			font-size: 32rpx;
			text-align: center;
			color: #fff;
			margin-top: 50rpx;
			line-height: 70rpx;
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
		.editInfo{
			padding: 150rpx 0rpx;
			padding-left: 160rpx !important;
		}
		.buttom{
			position: absolute;
			left: 0;
			bottom: 80rpx;
			width: 87%;
			padding: 0rpx 50rpx;
			justify-content: space-between;
			display: flex;
		}
		.editInfo text{
			border-bottom: 2rpx solid #f4f4f4;
			font-size: 28rpx;
		}
</style>