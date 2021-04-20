const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const session = require("express-session");

const accountsData = require("./accounts.json");

const app = express();

const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.engine("hbs", exphbs({ defaultLayout: "main", extname: "hbs" }));
app.set("view engine", "hbs");
//set session and cookie
app.use(
  session({
    secret: "keyboard cat",
    cookie: {},
  })
);
//get login page
app.get("/login", (req, res) => {
  res.render("index", { pageTitle: "login" });
});
//post email and password
app.post("/login", (req, res) => {
  const email = req.body.account;
  const password = req.body.password;
  const user = accountsData.find((account) => account.email === email);
  let message = "";

  if (!req.body.account || !req.body.password) {
    message = "Please enter your email and password";
    wrongMessage = "yes";
  }
  if (user) {
    if (user.password === password) {
      //sign data in session to identify login or not
      req.session.name = user.firstName;
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
  //if req includes singed data , transfer to /name
  if (req.session.name) {
    res.render("login", { pageTitle: name, message: name });
  } else {
    //if not , back to login page
    res.redirect("/login");
  }
});
app.listen(port, () => {
  console.log(`operate http://localhost:${port}`);
});
