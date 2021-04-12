const express = require("express");
const Market = require("../models/Market");
const router = express.Router();


//createbarrack
router.post("/markets", async (req, res) => {
  const market = new Market({
    marketname: req.body.marketname
  });
  await market.save();
  res.send(market);
});

//detail market
router.get("/markets/:id", async (req, res) => {
  try {
    const market = await Market.findOne({ _id: req.params.id });
    res.send(market);
  } catch {
    res.status(404);
    res.send({ error: "market not found" });
  }
});

//updatemarket
router.patch("/markets/:id", async (req, res) => {
  try {
    const market = await Market.findOne({ _id: req.params.id });

    if (req.body.marketname) {
      market.marketname = req.body.marketname;
    }

    await market.save();
    res.send(market);
  } catch {
    res.status(404);
    res.send({ error: "Market not found" });
  }
});

//listmarket
router.get("/markets", async (req, res) => {
  const market = await Market.find();
  res.send(market);
});

//deletemarket
router.delete("/markets/:id", async (req, res) => {
  try {
    await Market.deleteOne({ _id: req.params.id });
    res.status(200).send();
  } catch {
    res.status(404);
    res.send({ error: "Market not found" });
  }
});

module.exports = router;