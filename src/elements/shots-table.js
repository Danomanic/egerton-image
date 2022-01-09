const buildShotsTable = (matchData) => {
	let table = `<table class="table table-borderless table-sm shots-table">
    <thead>
      <tr class="text-white text-center">
        <th style="text-align:left">Shots</th>
        <th>Fired</th>
        <th>Missed</th>
        <th>Accuracy</th>
      </tr>
    </thead>
    <tbody>`;

	matchData.players.sort((a, b) => b.stats.core.shots.fired - a.stats.core.shots.fired);
	matchData.players.forEach((player) => {
		table += `<tr class="text-white text-center ${player.team.name}">
        <td style="text-align:left">${player.gamertag}</td>
        <td>${player.stats.core.shots.fired}</td>
        <td>${player.stats.core.shots.missed}</td>
        <td>${player.stats.core.shots.accuracy.toFixed(2)} %</td>
      </tr>`;
	});

	table += '</tbody></table>';

	return table;
};

module.exports = { buildShotsTable };