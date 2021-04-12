const express = require("express")
const routes = require("./routes/user")
const markets = require("./routes/market")
const barracks = require("./routes/barrack")
const farms = require("./routes/farm")

function createServer() {
	const app = express()
	app.use(express.json())
	app.use("/api", routes)
	app.use("/market", markets)
	app.use("/barrack", barracks)
	app.use("/farm", farms)
	return app
}

module.exports = createServer