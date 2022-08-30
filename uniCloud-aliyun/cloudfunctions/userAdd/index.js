'use strict';
exports.main = async (event, context) => {
	const db = uniCloud.database();
	// 获取 `user` 集合的引用
	const collection = await db.collection('user');
	const info = {
			id:event.id,
			password:event.password,
			name:event.name,
			icon:event.icon,
			money:event.money,
			signature:event.signature,
			collect:[]
		}
	let res = collection.add(info)
	return res
};
