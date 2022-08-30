<template>
	<view class="container">
		<infoList :list="glList"></infoList>
	</view>
</template>

<script>
import infoList from '../../components/info-list/infoList.vue'
export default {
	data() {
		return {
			glInfo:{
				name: '',
				text: '',
				url: '',
				img:''
			},
			glList:[]
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
			uniCloud.callFunction({
			    name: 'gl',
			  })
			  .then(res => {
				  console.log(JSON.stringify(res))
				  this.glList = res.result.data
			  })
		}
	}
}
</script>

<style lang="scss">
	.container{
		width: 100%;
		padding: 50rpx 36rpx;
		display: flex;
		flex-direction: column;
	}
</style>