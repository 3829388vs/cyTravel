<template>
	<view class="container">
		<view class="header">
			<uni-search-bar @confirm="input(searchValue)" @clear="change('')" v-model="searchValue" @input="input(searchValue)" placeholder="请输入景点名称">
			</uni-search-bar>
			<view class="sel">
				  <uni-data-select
					v-model="value"
					:localdata="range"
					@change="change"
					placeholder="请选择城市"
				></uni-data-select>
			</view>
		</view>
		<uni-list style="margin-top: 200rpx;">
			<uni-list-item v-for="(item,index) in spotList" :title="item.name" :note="item.detail.substr(0,17)+'...'" showArrow
				:thumb="item.img[0]" @click="toInfo(item.name)"
				thumb-size="lg" rightText="详情" link/>
		</uni-list>
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
				allSpots:[],
				tempSpotList:[],
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
				value: null,
				range: [],
				searchValue:''
			}
		},
		onLoad(){
			this.loadSpot()
		},
		methods:{
			input(search){
				if(search == ''){
					this.change('')
				}
				const self = this
				self.spotList = self.allSpots
				self.tempSpotList = []
				self.spotList.forEach(itm =>{
					if(itm.name.indexOf(search) !== -1){
						self.tempSpotList.push(itm)
						console.log(itm)
					}
				})
				self.spotList = []
				self.spotList = self.tempSpotList
			},
			change(e){
				console.log(e)
				const self = this
				console.log(JSON.stringify(this.range))
				if(e == ''){
					self.spotList = self.allSpots
					return
				}
				this.range.forEach(item => {
					if(item.value == e){
						self.spotList = self.allSpots
						self.tempSpotList = []
						self.spotList.forEach(itm =>{
							if(item.text == itm.city.substr(0,3)){
								self.tempSpotList.push(itm)
								console.log(itm)
							}
							if(item.text == '国外' && itm.city.indexOf('省') == -1){
								self.tempSpotList.push(itm)
								console.log(itm)
							}
						})
					}
				})
				self.spotList = []
				self.spotList = self.tempSpotList
			},
			toInfo(name){
				uni.navigateTo({
					url:'spot?name=' + name
				})
			},
			loadSpot(){
				const self = this
				uniCloud.callFunction({
				    name: 'spot',
				    data: {
						name: 'all',
					}
				  })
				  .then(res => {
					  console.log(JSON.stringify(res))
					  if(res.success){
						  self.spotList = res.result.data
						  self.allSpots = self.spotList
						  let tempCity = []
						  res.result.data.forEach((item,index) => {
							  if(item.city.indexOf('省') != -1){
								  if(!tempCity.includes(item.city.substr(0,3))){
									  self.range.push({
										  value: (index + 1),
										  text: item.city.substr(0,3)
									  })
									  tempCity.push(item.city.substr(0,3))
								  }
							  }

						  })
						  self.range.push({
							  value: (self.allSpots.length + 1),
							  text: '国外'
						  })
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
		.header{
			position: fixed;
			top: 0;
			width: 100%;
			height: 200rpx;
			z-index: 99;
			background-color: #fff;
		}
		.sel{
			width: 100%;
			height: 120rpx;
		}
	}

</style>