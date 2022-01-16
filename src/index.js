const express = require('express');
const fs = require('fs');
const nodeHtmlToImage = require('node-html-to-image');
const S3 = require('./aws/s3');
const Halo = require('./lib/halo');
const { buildRankTable } = require('./elements/rank-table');
const { buildPlayerTable } = require('./elements/player-table');
const { buildShotsTable } = require('./elements/shots-table');
const { buildKillsTable } = require('./elements/kills-table');
const { buildDamageTable } = require('./elements/damage-table');
const { buildMedalsTable } = require('./elements/medals-table');
const config = require('./config');

const app = express();
const port = config.PORT || 3000;

app.get('/generate/match/:Id', async (req, res) => {
	try {
		const buffer = fs.readFileSync(`${__dirname}/html/match.html`);
		const matchData = await Halo.getMatchData(req.params.Id);
		if (matchData.details.playlist.properties.ranked === 'false') {
			throw new Error('Match was not ranked.');
		}

		const image = await nodeHtmlToImage({
			html: buffer.toString(),
			quality: 100,
			content: {
				teamName: req.params.Id,
				rankTable: buildRankTable(matchData),
				playerTable: buildPlayerTable(matchData),
				medalsTable: buildMedalsTable(matchData),
				shotsTable: buildShotsTable(matchData),
				killsTable: buildKillsTable(matchData),
				damageTable: buildDamageTable(matchData) },
			puppeteerArgs: {
				headless: true,
				args: [
					'--no-sandbox',
					'--disable-setuid-sandbox',
					'--headless',
					'--disable-gpu',
					'--disable-dev-shm-usage',
				],
			},
		});

		if (config.IS_LOCAL) {
			res.writeHead(200, { 'Content-Type': 'image/png' });
			res.end(image, 'binary');
		}
		else {
			S3.uploadFile(image, `match/${req.params.Id}`);
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify({ status: 'generated' }));
		}
	}
	catch (e) {
		console.log(e);
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify({ status: 'error', message: e.message }));
	}
});

app.get('/generate/gamertag/:gamerTag/:Id', async (req, res) => {
	try {
		const buffer = fs.readFileSync(`${__dirname}/html/gamertag.html`);
		const playerStats = await Halo.getPlayerStats(req.params.gamerTag);
		if (playerStats.length === 0) {
			throw new Error('Gamer tag not found');
		}
		const gamerTagAppearance = await Halo.getGamerTagAppearance(req.params.gamerTag);

		const image = await nodeHtmlToImage({
			html: buffer.toString(),
			quality: 100,
			content: {
				gamerTag: req.params.gamerTag,
				gamerTagAppearance,
				stats: playerStats,
				accuracy: playerStats.core.shots.accuracy.toFixed(2) + '%',
				kda: playerStats.core.kda.toFixed(2),
				kdr: playerStats.core.kdr.toFixed(2),
			},
			puppeteerArgs: {
				headless: true,
				args: [
					'--no-sandbox',
					'--disable-setuid-sandbox',
					'--headless',
					'--disable-gpu',
					'--disable-dev-shm-usage',
				],
			},
		});

		if (config.IS_LOCAL) {
			res.writeHead(200, { 'Content-Type': 'image/png' });
			res.end(image, 'binary');
		}
		else {
			S3.uploadFile(image, `gamertag/${req.params.Id}`);
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify({ status: 'generated' }));
		}
	}
	catch (e) {
		console.log(e);
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify({ status: 'error', message: e.message }));
	}
});

app.listen(port, () => {
	console.log(`Egerton Image generator listening at ${port}`);
});
