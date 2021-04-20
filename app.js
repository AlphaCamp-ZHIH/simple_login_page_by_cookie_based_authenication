const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");

const accountsData = require("./accounts.json");

const app = express();

const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.engine("hbs", exphbs({ defaultLayout: "main", extname: "hbs" }));
app.set("view engine", "hbs");

app.get("/login", (req, res) => {
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
    message = "Please enter your email and password";
    wrongMessage = "yes";
  }
  if (user) {
    if (user.password === password) {
      return res.redirect(`/${user.firstName}`);
    } else if (!req.body.password) {
      wrongMessage = "yes";
      message = "Please enter your  password";
    } else {
      wrongMessage = "yes";
      message = "your password is wrong";
    }
  } else {
    wrongMessage = "yes";
    message = "no account exits";
  }
  return res.render("index", { pageTitle: "login", message, wrongMessage });
});

app.get("/:name", (req, res) => {
  const name = req.params.name;
  console.log(name)
  res.render("login", { pageTitle: name, message: name });
});
app.listen(port, () => {
  console.log(`operate http://localhost:${port}`);
});
