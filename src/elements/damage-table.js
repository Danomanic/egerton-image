const buildDamageTable = (matchData) => {
	let table = `<table class="table table-borderless table-sm shots-table">
    <thead>
      <tr class="text-white text-center">
        <th style="text-align:left">Damage</th>
        <th>Dealt</th>
        <th>Taken</th>
      </tr>
    </thead>
    <tbody>`;

	matchData.players.sort((a, b) => b.stats.core.damage.dealt - a.stats.core.damage.dealt);
	matchData.players.forEach((player) => {
		table += `<tr class="text-white text-center ${player.team.name}">
        <td style="text-align:left">${player.gamertag}</td>
        <td>${player.stats.core.damage.dealt}</td>
        <td>${player.stats.core.damage.taken}</td>
      </tr>`;
	});

	table += '</tbody></table>';

	return table;
};

module.exports = { buildDamageTable };