let fetchOptionalRoleName = function (client, collector) {
	let find = client.matchableRoles.find(r => {
		return r.emoji === collector.first().emoji.name
	});

	return find.name

}

module.exports = fetchOptionalRoleName;