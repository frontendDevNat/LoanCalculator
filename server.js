// server.js
const jsonServer = require("json-server");
const cors = require("cors");
const server = jsonServer.create();

server.use(
  cors({
    origin: true,
    credentials: true,
    preflightContinue: false,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
  })
);
server.options("*", cors());

server.use(jsonServer.bodyParser);

server.post("/api/annuities", (req, res) => {
  const amount = req.body.amount;
  const duration = req.body.duration;
  let persent = 0.05;

  if (amount == 10000) {
    persent = 0.1;
  }

  if (amount == 100000) {
    persent = 0.01;
  }

  let monthlyInstallment =
    amount / (12 * duration) + (amount / (12 * duration)) * persent;

  req.body.monthlyInstallment = monthlyInstallment.toFixed(2);

  res.jsonp(req.body);
});

server.listen(3000, () => {
  console.log("JSON Server is running");
});
