const express = require("express")
const mongoose = require("mongoose")
const createServer = require("../server") // new

mongoose
	.connect(process.env.DBHOST, { useNewUrlParser: true })
	.then(() => {
		const app = createServer() // new
		app.listen(1000, () => {
			console.log("Server has started!")
		})
})