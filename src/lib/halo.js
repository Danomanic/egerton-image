const config = require('../config');
const lib = require('lib')({ token: config.STDLIB_SECRET_TOKEN });

const HaloAPI = lib.halo.infinite['@0.3.3'];

const getMatchData = async (matchId) => {
	const result = await HaloAPI.stats.matches.retrieve({
		id: matchId,
	});

	return result.data;
};

module.exports = { getMatchData };
