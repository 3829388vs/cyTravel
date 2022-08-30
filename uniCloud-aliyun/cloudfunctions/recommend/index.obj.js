// 开发文档: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
module.exports = {
		async recommendLoad() {
			const db = uniCloud.database();
			// 获取 `user` 集合的引用
			const collection = await db.collection('recommend');
			let res = collection.get()
			return res
		}
}
