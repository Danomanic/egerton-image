const express = require('express');
const fs = require('fs');
const nodeHtmlToImage = require('node-html-to-image');
const S3 = require('./aws/s3');
const Halo = require('./lib/halo');
const { buildPlayerTable } = require('./elements/player-table');
const { buildShotsTable } = require('./elements/shots-table');
const { buildKillsTable } = require('./elements/kills-table');
const config = require('./config');

const app = express();
const port = config.PORT || 3000;

const buffer = fs.readFileSync(`${__dirname}/html/match.html`);

app.get('/generate/match/:Id', async (req, res) => {
	try {
		const matchData = await Halo.getMatchData(req.params.Id);

		const image = await nodeHtmlToImage({
			html: buffer.toString(),
			quality: 100,
			content: { teamName: req.params.Id, playerTable: await buildPlayerTable(matchData), shotsTable: await buildShotsTable(matchData), killsTable: await buildKillsTable(matchData) },
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
			await S3.uploadFile(image, `match/${req.params.Id}`);
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify({ status: 'generated' }));
		}
	}
	catch (e) {
		console.log(e);
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify({ status: 'error' }));
	}
});

app.listen(port, () => {
	console.log(`Egerton Image generator listening at ${port}`);
});
