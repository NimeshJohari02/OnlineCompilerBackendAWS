const express = require('express');
const bodyParser = require('body-parser');
const {
  getCodeObject
} = require("./createObjFromJson");
const cors = require("cors");

const app = express();
const port = 8080;
const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
}

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors(corsOptions))
app.get("/", (req, res) => {
  res.send("Hello From The API").status(200);
})
app.post('/', async (req, res) => {
  const run_var = getCodeObject(req.body);
  await run_var.run_file();
  res.status(201).json({
    "error": run_var.error,
    "output": run_var.output
  });
});

app.listen(port, () => {
  console.log(`APP listening at http://localhost:${port}`)
})