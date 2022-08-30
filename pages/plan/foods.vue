<template>
	<view class="container">
		<view class="header">
			<view class="sel">
				  <uni-data-select
					v-model="value"
					:localdata="range"
					@change="change"
					placeholder="请选择城市"
				></uni-data-select>
			</view>
		</view>
		<view style="margin-top: 100rpx;">
			<infoList :list="foodList"></infoList>
		</view>
	</view>
</template>

<script>
import infoList from '../../components/info-list/infoList.vue'
export default {
	data() {
		return {
			foodInfo:{
				name: '',
				text: '',
				url: '',
				img:''
			},
			value: null,
			range: [],
			foodList:[],
			allFoods:[],
			tempFoodList:[]
		}
	},
	components:{
		infoList
	},
	onLoad(){
		this.loadData()
	},
	methods:{
		loadData(){
			const self = this
			uni.showLoading({
				title: '加载中'
			});
			uniCloud.callFunction({
			    name: 'foods',
			  })
			  .then(res => {
				  console.log(JSON.stringify(res))
				  if(res.success){
					uni.hideLoading()
				  self.foodList = res.result.data
				  self.allFoods = self.foodList
				  let temp = []
				  res.result.data.forEach((item,index) => {
					  if(item.name.indexOf('市') != -1){
						  if(!temp.includes(item.name)){
							  self.range.push({
								  value: (index + 1),
								  text: item.name
							  })
							  temp.push(item.name)
						  }
					  }
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
		change(e){
			console.log(e)
			const self = this
			console.log(JSON.stringify(this.range))
			if(e == ''){
				self.foodList = self.allFoods
				return
			}
			this.range.forEach(item => {
				if(item.value == e){
					self.foodList = self.allFoods
					self.tempFoodList = []
					self.foodList.forEach(itm =>{
						if(item.text == itm.name){
							self.tempFoodList.push(itm)
							console.log(itm)
						}
					})
				}
			})
			self.foodList = []
			self.foodList = self.tempFoodList
		}
	}
}
</script>

<style lang="scss">
	.container{
		width: 100%;
		padding: 20rpx 36rpx;
		display: flex;
		flex-direction: column;
		.header{
			position: fixed;
			top: 0;
			width: 100%;
			z-index: 99;
			background-color: #fff;
		}
		.sel{
			width: 90%;
			margin-top: 10rpx;
		}
	}
</style>