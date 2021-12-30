require('dotenv').config();

module.exports = Object.freeze({
	PORT: process.env.PORT,
	STDLIB_SECRET_TOKEN: process.env.STDLIB_SECRET_TOKEN,
	BUCKET_NAME: process.env.BUCKET_NAME,
	AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
	AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
	IS_LOCAL: process.env.IS_LOCAL,
});
