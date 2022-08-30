<template>
	<view class="container">
		<uni-list>
			<uni-list-item v-for="(item,index) in list" :title="item.name" :note="item.detail.substr(0,17)+'...'" showArrow
				:thumb="item.img[0]" @click="toInfo(item.name)"
				thumb-size="lg" rightText="详情" link/>
		</uni-list>
		<view class="no-data" v-if="list.length < 1">暂无数据</view>
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
					password:'',
					collect:[]
				},
				spotList:[],
				collectList:[],
				list:[],
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
			}
		},
		onLoad(){
			this.userInfo = uni.getStorageSync('userInfo')
			this.loadAllSpot()
		},
		methods:{
			toInfo(name){
				uni.navigateTo({
					url:'../spot/spot?name=' + name
				})
			},
			loadAllSpot(){
				const self = this
				uniCloud.callFunction({
				    name: 'spot',
				    data: {
						name: 'all',
					}
				  })
				  .then(res => {
					if(res.success){
					  self.spotList = res.result.data
					  self.loadCollect()
					}else{
						  uni.showToast({
							title: '加载失败',
							duration: 1500,
							icon:"error"
						  });
					  }
				  })
			},
			loadCollect(){
				const self = this
				uni.showLoading({
					title: '加载中'
				});
				uniCloud.callFunction({
				    name: 'user',
					data: {
						name: self.userInfo.id,
						password: self.userInfo.password
					}
				  })
				  .then(res => {
					  // console.log(JSON.stringify(res))
					  if(res.success){
						  self.collectList = res.result.data[0].collect
							self.spotList.map((item,index) => {
								  self.collectList.map((itm,idx) => {
									  if(itm == item.name){
										self.list.push(item)
									  }
								  })
							  })
						  uni.hideLoading()
					  }else{
						  uni.showToast({
						  	title: '加载失败',
						  	duration: 1500,
						  	icon:"error"
						  });
					  }
				  })
			},
			
		}
}
</script>

<style lang="scss">
	.container{
		width: 100%;
	}
	.no-data{
		text-align: center;
		margin-top: 50rpx;
		color: #8e8e8e;
	}

</style>