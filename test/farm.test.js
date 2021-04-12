const mongoose = require("mongoose")
const supertest = require("supertest")
const createServer = require("./server")
const Farm = require("./models/Farm") 

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
test("POST /farm/farms", async () => {
	const data = { farmname: "farmUser" };
  
	await supertest(app).post("/farm/farms")
	  .send(data)
	  .expect(200)
	  .then(async (response) => {

		expect(response.body._id).toBeTruthy();
		expect(response.body.farmname).toBe(data.farmname);

		const post = await Farm.findOne({ _id: response.body._id });
		expect(post).toBeTruthy();
		expect(post.farmname).toBe(data.farmname);
	  });
  });

  //detailmarket
  test("GET /farm/farms/:id", async () => {
	const post = await Farm.create({ farmname: "farmUser" });
	await supertest(app).get("/farm/farms/" + post.id)
	  .expect(200)
	  .then((response) => {
		expect(response.body._id).toBe(post.id);
		expect(response.body.farmname).toBe(post.farmname);
		
	  });
  });

  //updatemarket
  test("PATCH /farm/farms/:id", async () => {

	const post = await Farm.create({  farmname: "farmUser" });
	const data = {  farmname: "New farm" };
  
	await supertest(app).patch("/farm/farms/" + post.id)
	  .send(data)
	  .expect(200)
	  .then(async (response) => {
		
		expect(response.body._id).toBe(post.id);
		expect(response.body.farmname).toBe(data.farmname);;
  
		const newPost = await Farm.findOne({ _id: response.body._id });
		expect(newPost).toBeTruthy();
		expect(newPost.farmname).toBe(data.farmname);
	  });
  });

  //listmarket
  test("GET /farm/farms", async () => {
	const post = await Farm.create({ farmname: "farmUser" });
	await supertest(app).get("/farm/farms/")
	  .expect(200)
	  .then((response) => {
		expect(Array.isArray(response.body)).toBeTruthy();
		expect(response.body.length).toEqual(1);

		expect(response.body[0]._id).toBe(post.id);
		expect(response.body[0].farmname).toBe(post.farmname);
	  });
  });

//deletemarket
test("DELETE /farm/farms/:id", async () => {
	const post = await Farm.create({
        farmname: "farmUser"
	});
  
	await supertest(app)
	  .delete("/farm/farms/" + post.id)
	  .expect(200)
	  .then(async () => {
		expect(await Farm.findOne({ _id: post.id })).toBeFalsy();
	  });
  });


  

