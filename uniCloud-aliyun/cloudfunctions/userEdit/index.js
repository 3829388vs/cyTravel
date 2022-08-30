'use strict';
exports.main = async (event, context) => {
	const db = uniCloud.database();
	// 获取 `user` 集合的引用
	const collection = await db.collection('user');
	const exQuery = {
			id:event.id,
		}
	let editInfo = {
		id:event.id,
		password:event.password,
		name:event.name,
		icon:event.icon,
		money:event.money,
		signature:event.signature,
		collect:event.collect
	}
	if(event.password == ''){
		editInfo = {
			id:event.id,
			name:event.name,
			icon:event.icon,
			money:event.money,
			signature:event.signature,
			collect:event.collect
		}
	}
	let res = collection.where(exQuery).update(editInfo)
	return res
};
