const buildKillsTable = (matchData) => {
	let table = `<table class="table table-borderless table-sm kills-table">
    <thead>
      <tr class="text-white text-center">
        <th style="text-align:left">Kills</th>
        <th>H/S</th>
        <th>BR</th>
        <th>Melee</th>
				<th>Nades</th>
        <th>P/Ws</th>
      </tr>
    </thead>
    <tbody>`;

	matchData.players.sort((a, b) => b.stats.core.breakdowns.kills.headshots - a.stats.core.breakdowns.kills.headshots);
	matchData.players.forEach((player) => {
		table += `<tr class="text-white text-center ${player.team.name}">
        <td style="text-align:left">${player.gamertag}</td>
        <td>${player.stats.core.breakdowns.kills.headshots}</td>
        <td>${getBRKils(player.stats.core.summary.kills, player.stats.core.breakdowns.kills)}</td>
        <td>${player.stats.core.breakdowns.kills.melee}</td>
				<td>${player.stats.core.breakdowns.kills.grenades}</td>
        <td>${player.stats.core.breakdowns.kills.power_weapons}</td>
      </tr>`;
	});

	table += '</tbody></table>';

	return table;
};

const getBRKils = (kills, breakdowns) => {
	return kills - (breakdowns.melee + breakdowns.grenades + breakdowns.power_weapons);
};

module.exports = { buildKillsTable };