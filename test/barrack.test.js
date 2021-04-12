const mongoose = require("mongoose")
const supertest = require("supertest")
const createServer = require("./server")
const Barrack = require("./models/Barrack") 

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
test("POST /barrack/barracks", async () => {
	const data = { barrackname: "BarrackUser" };
  
	await supertest(app).post("/barrack/barracks")
	  .send(data)
	  .expect(200)
	  .then(async (response) => {

		expect(response.body._id).toBeTruthy();
		expect(response.body.barrackname).toBe(data.barrackname);

		const post = await Barrack.findOne({ _id: response.body._id });
		expect(post).toBeTruthy();
		expect(post.barrackname).toBe(data.barrackname);
	  });
  });

  //detailmarket
  test("GET /barrack/barracks/:id", async () => {
	const post = await Barrack.create({ barrackname: "BarrackUser" });
	await supertest(app).get("/barrack/barracks/" + post.id)
	  .expect(200)
	  .then((response) => {
		expect(response.body._id).toBe(post.id);
		expect(response.body.barrackname).toBe(post.barrackname);
		
	  });
  });

  //updatemarket
  test("PATCH /barrack/barracks/:id", async () => {

	const post = await Barrack.create({  barrackname: "BarrackUser" });
	const data = {  barrackname: "New Barrack" };
  
	await supertest(app).patch("/barrack/barracks/" + post.id)
	  .send(data)
	  .expect(200)
	  .then(async (response) => {
		
		expect(response.body._id).toBe(post.id);
		expect(response.body.barrackname).toBe(data.barrackname);;
  
		const newPost = await Barrack.findOne({ _id: response.body._id });
		expect(newPost).toBeTruthy();
		expect(newPost.barrackname).toBe(data.barrackname);
	  });
  });

  //listmarket
  test("GET /barrack/barracks", async () => {
	const post = await Barrack.create({ barrackname: "BarrackUser" });
	await supertest(app).get("/barrack/barracks/")
	  .expect(200)
	  .then((response) => {
		expect(Array.isArray(response.body)).toBeTruthy();
		expect(response.body.length).toEqual(1);

		expect(response.body[0]._id).toBe(post.id);
		expect(response.body[0].barrackname).toBe(post.barrackname);
	  });
  });

//deletemarket
test("DELETE /barrack/barracks/:id", async () => {
	const post = await Barrack.create({
        barrackname: "BarrackUser"
	});
  
	await supertest(app)
	  .delete("/barrack/barracks/" + post.id)
	  .expect(200)
	  .then(async () => {
		expect(await Barrack.findOne({ _id: post.id })).toBeFalsy();
	  });
  });


  

