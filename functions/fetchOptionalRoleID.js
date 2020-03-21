let fetchOptionalRoleID = function (client, collector) {
	let find = client.matchableRoles.find(r => {
		return r.emoji === collector.first().emoji.name
	});

	return find.roleToAdd

}

module.exports = fetchOptionalRoleID;