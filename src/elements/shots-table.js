const buildShotsTable = (matchData) => {
	let table = `<table class="table table-striped shots-table">
    <thead>
      <tr>
        <th><u>Shots</u></th>
        <th>Fired</th>
				<th>Land</th>
        <th>Miss</th>
        <th>Accuracy</th>
      </tr>
    </thead>
    <tbody>`;

	matchData.players.sort((a, b) => b.stats.core.shots.fired - a.stats.core.shots.fired);
	matchData.players.forEach((player) => {
		table += `<tr>
        <td>${player.gamertag}</td>
        <td style="text-align:center">${player.stats.core.shots.fired}</td>
				<td style="text-align:center">${player.stats.core.shots.landed}</td>
        <td style="text-align:center">${player.stats.core.shots.missed}</td>
        <td style="text-align:center">${player.stats.core.shots.accuracy.toFixed(2)} %</td>
      </tr>`;
	});

	table += '</tbody></table>';

	return table;
};

module.exports = { buildShotsTable };