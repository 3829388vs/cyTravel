'use strict';
exports.main = async (event, context) => {
	const db = uniCloud.database();
	// 获取 `user` 集合的引用
	const collection = await db.collection('user');
	const exQuery = {
			id:event.name,
			password:event.password,
		}
	let res = collection.where(exQuery).get()
	return res
};
