const buildMedalsTable = (matchData) => {
	try {
		let table = `<div class="col">
      <table class="table table-borderless table-sm">
			<thead>
				<tr class="text-white text-center">
					<th style="min-width:150px; text-align:left">Medals</th>
          <th>Total</th>
					<th>P</th>
          <th>D</th>
          <th>T</th>
          <th>O/K</th>
				</tr>
			</thead>
			<tbody>`;

		matchData.players.sort((a, b) => b.stats.core.summary.medals - a.stats.core.summary.medals);
		matchData.players.forEach((player) => {
			table += `<tr class="text-white text-center ${player.team.name}">
					<td style="text-align:left">${player.gamertag}</td>
          <td>${player.stats.core.summary.medals}</td>
				  <td>${getMedalCount(player, 1512363953)}</td>
          <td>${getMedalCount(player, 622331684)}</td>
          <td>${getMedalCount(player, 2063152177)}</td>
          <td>${getMedalCount(player, 835814121)}</td>
				</tr>`;
		});

		table += '</tbody></table></div>';
		return table;
	}
	catch (error) {
		return '';
	}
};


const getMedalCount = (player, medalId) => {
	return player.stats.core.breakdowns.medals.filter((medal) => medal.id === medalId).length;
};

module.exports = { buildMedalsTable };