const buildKillsTable = (matchData) => {
	let table = `<table class="table table-striped kills-table">
    <thead>
      <tr>
        <th><u>Kills</u></th>
        <th>H/S</th>
        <th>Melee</th>
				<th>Nades</th>
        <th>P/Ws</th>
      </tr>
    </thead>
    <tbody>`;

	matchData.players.sort((a, b) => b.stats.core.breakdowns.kills.headshots - a.stats.core.breakdowns.kills.headshots);
	matchData.players.forEach((player) => {
		table += `<tr>
        <td>${player.gamertag}</td>
        <td style="text-align:center">${player.stats.core.breakdowns.kills.headshots}</td>
        <td style="text-align:center">${player.stats.core.breakdowns.kills.melee}</td>
				<td style="text-align:center">${player.stats.core.breakdowns.kills.grenades}</td>
        <td style="text-align:center">${player.stats.core.breakdowns.kills.power_weapons}</td>
      </tr>`;
	});

	table += '</tbody></table>';

	return table;
};

module.exports = { buildKillsTable };