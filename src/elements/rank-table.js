const buildRankTable = (matchData) => {
	try {
		let table = `<div class="col-4">
      <table class="table table-borderless table-sm">
			<thead>
				<tr class="text-white text-center">
					<th style="min-width:30px"></th>
					<th style="min-width:150px"></th>
					<th>Rank</th>
					<th>+/-</th>
					<th>Tier</th>
				</tr>
			</thead>
			<tbody>`;

		matchData.players.sort((a, b) => b.progression.csr.pre_match.value - a.progression.csr.post_match.value);
		matchData.players.forEach((player) => {
			table += `<tr class="text-white text-center ${player.team.name}">
					<td><img class="img-rank" src="${player.progression.csr.pre_match.tier_image_url}"></td>
					<td style="text-align:left">${player.gamertag}</td>
					<td>${player.progression.csr.post_match.value}</td>
					<td>${getCSRDifference(player.progression.csr.pre_match.value, player.progression.csr.post_match.value)}</td>
					<td>${player.progression.csr.post_match.tier} ${player.progression.csr.post_match.sub_tier + 1}</td>
				</tr>`;
		});

		table += '</tbody></table></div>';
		return table;
	}
	catch (error) {
		return '<div class="col-4"><div class="broke alert alert-danger">Sadly there was a problem with this match data. This happens when something goes wrong on 343 Servers. Players and data may be missing or incorrect.</div></div>';
	}
};

const getCSRDifference = (before, after) => {
	const difference = after - before;

	return (difference <= 0 ? '<span class="minus">' : '<span class="plus">+') + difference + '</span>';
};


module.exports = { buildRankTable };