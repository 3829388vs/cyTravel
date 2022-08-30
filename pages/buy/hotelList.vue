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
			<infoList :list="ticList" :isWebView="false"></infoList>
		</view>
	</view>
</template>

<script>
import infoList from '../../components/info-list/infoList.vue'
export default {
	data() {
		return {
			ticInfo:{
				name: '',
				text: '',
				url: '',
				img:''
			},
			value: null,
			range: [],
			ticList:[],
			allTic:[],
			tempticList:[]
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
			uniCloud.callFunction({
			    name: 'hotel',
			  })
			  .then(res => {
				  console.log(JSON.stringify(res))
				  self.ticList = res.result.data
				  self.allTic = self.ticList
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
			  })
		},
		change(e){
			console.log(e)
			const self = this
			console.log(JSON.stringify(this.range))
			if(e == ''){
				self.ticList = self.allTic
				return
			}
			this.range.forEach(item => {
				if(item.value == e){
					self.ticList = self.allTic
					self.tempticList = []
					self.ticList.forEach(itm =>{
						if(item.text == itm.name){
							self.tempticList.push(itm)
							console.log(itm)
						}
					})
				}
			})
			self.ticList = []
			self.ticList = self.tempticList
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