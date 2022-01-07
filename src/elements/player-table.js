const buildPlayerTable = (matchData) => {
	let table = `<table class="table table-striped">
    <thead>
      <tr>
        <th style="min-width:150px"></th>
        <th>Rating</th>
				<th></th>
        <th>Score</th>
        <th>Dealt</th>
        <th>Taken</th>
        <th>KDR</th>
        <th>K</th>
        <th>D</th>
        <th>A</th>
      </tr>
    </thead>
    <tbody>`;

	matchData.players.sort((a, b) => b.stats.core.score - a.stats.core.score);
	matchData.players.sort((a, b) => b.team.id - a.team.id);
	matchData.players.forEach((player) => {
		table += `<tr class="${player.team.name}">
        <td>${player.gamertag}</td>
        <td style="text-align:center">${player.progression.csr.post_match.value}</td>
				<td style="text-align:center">${getCSRDifference(player.progression.csr.pre_match.value, player.progression.csr.post_match.value)}</td>
        <td style="text-align:center">${player.stats.core.score}</td>
        <td style="text-align:center">${player.stats.core.damage.dealt}</td>
        <td style="text-align:center">${player.stats.core.damage.taken}</td>
        <td style="text-align:center">${player.stats.core.kdr.toFixed(2)}</td>
        <td style="text-align:center">${player.stats.core.summary.kills}</td>
        <td style="text-align:center">${player.stats.core.summary.deaths}</td>
        <td style="text-align:center">${player.stats.core.summary.assists}</td>
      </tr>`;
	});

	table += '</tbody></table>';

	return table;
};

const getCSRDifference = (before, after) => {
	const difference = after - before;

	return (difference <= 0 ? '<span class="minus">' : '<span class="plus">+') + difference + '</span>';
};

module.exports = { buildPlayerTable };