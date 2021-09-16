const express = require("express");
const path = require("path");
const router = require("./controllers/index");
const helpers = require("./utils/helpers");
const sequelize = require("./config/connection");

// Import express-session
const session = require("express-session");
// Import express-handlebars
const exphbs = require("express-handlebars");
// Initializes Sequelize with session store
const SequelizeStore = require("connect-session-sequelize")(session.Store);
// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

// Set up Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Sets up session and connect to our Sequelize db
const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  // Sets up session store
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// turn on routes
app.use(router);

// Force false so data doesn't get dropped on every sync
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening 🚀"));
});
