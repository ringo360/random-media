const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

//!=======[SETTINGS]=======

const port = 3000;

//!=======[SETTINGS]=======

// get random img
function getRandomImage() {
	const mediaDirectory = path.join(__dirname, 'media');
	const files = fs.readdirSync(mediaDirectory);
	const randomIndex = Math.floor(Math.random() * files.length);
	const randomImage = files[randomIndex];
	return path.join(mediaDirectory, randomImage);
}

app.use((req, res, next) => {
	const now = new Date();
	const clientIP = req.ip; // クライアントのIPを取得
	const requestInfo = `${req.method} ${decodeURIComponent(req.originalUrl)}`; // リクエストのメソッドとURL
	const userAgent = req.headers['user-agent'];
	console.log(`[${now.toLocaleString()}] - Client IP: ${clientIP}, Request: ${requestInfo}, UA: ${userAgent}`);
	let logPath = path.join(__dirname, "access.log");
	if (!fs.existsSync(logPath))
		fs.writeFileSync(logPath, "RandomMedia Access log\n");
	fs.appendFileSync(logPath, `[${now.toLocaleString()}] - Client IP: ${clientIP}, Request: ${requestInfo}, UA: ${userAgent}\n`)

    next();
});
app.get('/', (req, res) => {
	const img = getRandomImage();
	res.sendFile(img);
})

app.listen(port, () => {
	console.log(`Listening port ${port}...`)
})