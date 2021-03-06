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
    saveUninitialized: true,
    resave: false,
    cookie: {},
  })
);
//get login page
app.get("/login", (req, res) => {
  res.render("index", { pageTitle: "login" });
});
//post email and password
app.post("/login", (req, res) => {
  const { email, password } = req.body
  const user = accountsData.find((account) => account.email === email);
  let message = "";
  if (user) {
    if (user.password === password) {
      //sign data in session to identify login or not
      req.session.name = user.firstName;
      return res.redirect("/user");
    } else {
      wrongMessage = "yes";
      message = "your password is wrong";
    }
  } else {
    wrongMessage = "yes";
    message = "account don't exist";
  }
  return res.render("index", { pageTitle: "login", email, message, wrongMessage });
});

app.get("/user", (req, res) => {
  //if req includes singed data , transfer to /name
  // console.log(req.session.name)
  const target = req.session.name;
  const user = accountsData.find( account => account.firstName = target);
  if (user ) {
    const name = user.firstName;
    res.render("user", { pageTitle: name, message: name });
  } else {
    //if not , back to login page
    res.redirect("/login");
  }
});
app.listen(port, () => {
  console.log(`operate http://localhost:${port}`);
});
app.get('/logout', (req ,res) =>{
  req.session.name = undefined;
  res.redirect('/login');
})