const mongoose = require("mongoose")
const supertest = require("supertest")
const createServer = require("./server")
const User = require("./models/User") 
const mongooseConnect = require("./db/index")

const app = createServer()

//register
test("POST /api/posts", async () => {
	const data = { username: "Admin", email: "admin@gmail.com", password: "root123" };
  
	await supertest(app).post("/api/posts")
	  .send(data)
	  .expect(200)
	  .then(async (response) => {

		expect(response.body._id).toBeTruthy();
		expect(response.body.username).toBe(data.username);
		expect(response.body.email).toBe(data.email);
		expect(response.body.password).toBe(data.password);
  
		// Check data in the database
		const post = await User.findOne({ _id: response.body._id });
		expect(post).toBeTruthy();
		expect(post.username).toBe(data.username);
		expect(post.email).toBe(data.email);
		expect(post.password).toBe(data.password);
	  });
  });

  test("PATCH /api/posts/:id", async () => {

	const post = await User.create({ username: "Admin", townhall: "Classname" });

	const data = { username: "New username", townhall: "New Townhall" };
  
	await supertest(app).patch("/api/posts/" + post.id)
	  .send(data)
	  .expect(200)
	  .then(async (response) => {
		
		expect(response.body._id).toBe(post.id);
		expect(response.body.username).toBe(data.username);
		expect(response.body.townhall).toBe(data.townhall);
  
		const newPost = await User.findOne({ _id: response.body._id });
		expect(newPost).toBeTruthy();
		expect(newPost.username).toBe(data.username);
		expect(newPost.townhall).toBe(data.townhall);
	  });
  });

  




