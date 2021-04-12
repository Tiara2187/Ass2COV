const express = require('express');
const bodyParser = require('body-parser');
const mongooseConnect = require('./config/connect');
const routes = require('./routes');

const app = express();
const port = 8080;

mongooseConnect();

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`App runs on http://localhost:${port}`);
});

