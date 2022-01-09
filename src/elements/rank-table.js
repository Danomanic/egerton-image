const buildRankTable = (matchData) => {
	let table = `<table class="table table-borderless">
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
				<td>${player.progression.csr.pre_match.tier} ${player.progression.csr.pre_match.sub_tier + 1}</td>
      </tr>`;
	});

	table += '</tbody></table>';

	return table;
};

const getCSRDifference = (before, after) => {
	const difference = after - before;

	return (difference <= 0 ? '<span class="minus">' : '<span class="plus">+') + difference + '</span>';
};


module.exports = { buildRankTable };