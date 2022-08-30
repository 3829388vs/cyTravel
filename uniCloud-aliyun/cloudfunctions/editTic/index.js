'use strict';
exports.main = async (event, context) => {
	const db = uniCloud.database();
	// 获取 `user` 集合的引用
	const collection = await db.collection('ticket');
	const exQuery = {
			ticketName:event.name,
		}
	let editInfo = {
		commend:event.commend
	}
	let res = collection.where(exQuery).update(editInfo)
	return res
};
