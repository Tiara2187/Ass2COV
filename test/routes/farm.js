const express = require("express");
const Farm = require("../models/Farm");
const router = express.Router();


//createfarm
router.post("/farms", async (req, res) => {
  const farm = new Farm({
    farmname: req.body.farmname
  });
  await farm.save();
  res.send(farm);
});

//detailfarm
router.get("/farms/:id", async (req, res) => {
  try {
    const post = await Farm.findOne({ _id: req.params.id });
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "farm not found" });
  }
});

//updatefarm
router.patch("/farms/:id", async (req, res) => {
  try {
    const farm = await Farm.findOne({ _id: req.params.id });

    if (req.body.farmname) {
      farm.farmname = req.body.farmname;
    }

    await farm.save();
    res.send(farm);
  } catch {
    res.status(404);
    res.send({ error: "farm not found" });
  }
});

//listfarm
router.get("/farms", async (req, res) => {
  const farm = await Farm.find();
  res.send(farm);
});

//deletefarm
router.delete("/farms/:id", async (req, res) => {
  try {
    await Farm.deleteOne({ _id: req.params.id });
    res.status(200).send();
  } catch {
    res.status(404);
    res.send({ error: "farm not found" });
  }
});

module.exports = router;