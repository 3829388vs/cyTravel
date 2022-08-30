'use strict';
exports.main = async (event, context) => {
	const db = uniCloud.database();
	// 获取 `user` 集合的引用
	const collection = await db.collection('spots');
	const exQuery = {
			name:event.name,
		}
	let res = collection.where(exQuery).get()
	if(event.name == "all"){
		res = collection.get()
	}
	return res
};
