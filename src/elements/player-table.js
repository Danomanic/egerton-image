const buildPlayerTable = (matchData) => {
	let table = `<table class="table table-borderless table-sm">
    <thead>
      <tr class="text-white text-center">
        <th style="min-width:150px"></th>
        <th>Score</th>
        <th>${getMode(matchData)}</th>
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
		table += `<tr class="text-white text-center ${player.team.name}">
        <td style="text-align:left">${player.gamertag}</td>
        <td>${player.stats.core.score}</td>
        <td>${getModeScore(player)}</td>
        <td>${player.stats.core.kdr.toFixed(2)}</td>
        <td>${player.stats.core.summary.kills}</td>
        <td>${player.stats.core.summary.deaths}</td>
        <td>${player.stats.core.summary.assists}</td>
      </tr>`;
	});

	table += '</tbody></table>';

	return table;
};

const getMode = (matchData) => {
	if (matchData.players[0].stats.mode != null) {
		if ('oddballs' in matchData.players[0].stats.mode) {
			return 'Ball';
		}
		if ('flags' in matchData.players[0].stats.mode) {
			return 'Flags';
		}
		if ('zones' in matchData.players[0].stats.mode) {
			return 'Holds';
		}
	}
	return '';
};

const getModeScore = (player) => {
	if (player.stats.mode != null) {
		if ('oddballs' in player.stats.mode) {
			return player.stats.mode.oddballs.possession.durations.total.human.replace('00h', '').replace('m ', ':').replace('s', '');
		}
		if ('flags' in player.stats.mode) {
			return player.stats.mode.flags.captures.total;
		}
		if ('zones' in player.stats.mode) {
			return player.stats.mode.zones.captured;
		}
	}
	return '';
};


module.exports = { buildPlayerTable };