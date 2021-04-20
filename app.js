const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");

const accountsData = require("./accounts.json");

const app = express();

// console.log(accountsData);

app.use(bodyParser.urlencoded({ extended: true }));
app.engine("hbs", exphbs({ defaultLayout: "main", extname: "hbs" }));
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("index", { pageTitle: "login" });
});

app.post("/login", (req, res) => {
  const email = req.body.account;
  const password = req.body.password;
  const user = accountsData.find((account) => account.email === email);
  // console.log(user.password);
  let message = "";
  // let status = "false"
  if (!req.body.account || !req.body.password) {
    let filled = "NO";
    return res.render("index", { pageTitle: "login", filled });
  }
  if (user) {
    if (user.password === password) {
      status = "successful";
      message = `Welcome back, ${user.firstName}`;
    } else {
      message = "password wrong";
    }
  } else {
    message = "no account";
  }
  res.render("login", { pageTitle: "login", message });
});

const port = 3000;

app.listen(port, () => {
  console.log(`operate http://localhost:${port}`);
});
