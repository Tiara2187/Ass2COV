const mongoose = require("mongoose")
const supertest = require("supertest")
const createServer = require("./server")
const Market = require("./models/Market") 

beforeEach((done) => {
    mongoose.connect(process.env.DBHOST,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => done());
  });
  
  afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(() => done())
    });
  });

const app = createServer()

//create market
test("POST /market/markets", async () => {
	const data = { marketname: "MarketUser" };
  
	await supertest(app).post("/market/markets")
	  .send(data)
	  .expect(200)
	  .then(async (response) => {

		expect(response.body._id).toBeTruthy();
		expect(response.body.marketname).toBe(data.marketname);

		const market = await Market.findOne({ _id: response.body._id });
		expect(market).toBeTruthy();
		expect(market.marketname).toBe(data.marketname);
	  });
  });

  //detailmarket
  test("GET /market/markets/:id", async () => {
	const market = await Market.create({ marketname: "MarketUser" });
	await supertest(app).get("/market/markets/" + market.id)
	  .expect(200)
	  .then((response) => {
		expect(response.body._id).toBe(market.id);
		expect(response.body.marketname).toBe(market.marketname);
		
	  });
  });

  //updatemarket
  test("PATCH /market/markets/:id", async () => {

	const market = await Market.create({  marketname: "MarketUser" });

	const data = {  marketname: "New Market" };
  
	await supertest(app).patch("/market/markets/" + market.id)
	  .send(data)
	  .expect(200)
	  .then(async (response) => {
		
		expect(response.body._id).toBe(market.id);
		expect(response.body.marketname).toBe(data.marketname);;
  
		const newmarket = await Market.findOne({ _id: response.body._id });
		expect(newmarket).toBeTruthy();
		expect(newmarket.marketname).toBe(data.marketname);
	  });
  });

  //listmarket
  test("GET /market/markets", async () => {
	const market = await Market.create({ marketname: "MarketUser" });
  
	await supertest(app).get("/market/markets/")
	  .expect(200)
	  .then((response) => {
		expect(Array.isArray(response.body)).toBeTruthy();
		expect(response.body.length).toEqual(1);

		expect(response.body[0]._id).toBe(market.id);
		expect(response.body[0].marketname).toBe(market.marketname);
	  });
  });

//deletemarket
test("DELETE /market/markets/:id", async () => {
	const market = await Market.create({
	  marketname: "MarketUser"
	});
  
	await supertest(app)
	  .delete("/market/markets/" + market.id)
	  .expect(200)
	  .then(async () => {
		expect(await Market.findOne({ _id: market.id })).toBeFalsy();
	  });
  });

