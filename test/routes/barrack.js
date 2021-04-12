const express = require("express");
const Barrack = require("../models/Barrack");
const router = express.Router();


//createbarrack
router.post("/barracks", async (req, res) => {
  const barrack = new Barrack({
    barrackname: req.body.barrackname
  });
  await barrack.save();
  res.send(barrack);
});

//detail barrack
router.get("/barracks/:id", async (req, res) => {
  try {
    const post = await Barrack.findOne({ _id: req.params.id });
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "barrack not found" });
  }
});

//updatebarrack
router.patch("/barracks/:id", async (req, res) => {
  try {
    const barrack = await Barrack.findOne({ _id: req.params.id });

    if (req.body.barrackname) {
      barrack.barrackname = req.body.barrackname;
    }

    await barrack.save();
    res.send(barrack);
  } catch {
    res.status(404);
    res.send({ error: "Barrack not found" });
  }
});

//listbarrack
router.get("/barracks", async (req, res) => {
  const barrack = await Barrack.find();
  res.send(barrack);
});

//deletebarrack
router.delete("/barracks/:id", async (req, res) => {
  try {
    await Barrack.deleteOne({ _id: req.params.id });
    res.status(200).send();
  } catch {
    res.status(404);
    res.send({ error: "Barrack not found" });
  }
});

module.exports = router;