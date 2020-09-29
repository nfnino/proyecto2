const express = require("express");
const dotenv = require("dotenv")
dotenv.config()
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const passport = require("passport");
const path = require('path');

const cron = require('node-cron');
const modu = require("./util/cron-tasks");

const users = require("./routes/api/users");
const assets = require("./routes/api/assets");
const tasks = require("./routes/api/tasks");
const baths = require("./routes/api/routines/baths");
const fachadas = require("./routes/api/routines/fachadas");
const locales = require("./routes/api/routines/locales");
const pantallas = require("./routes/api/routines/pantallas");
const parkings = require("./routes/api/routines/parkings");
const rcis = require("./routes/api/routines/rcis");
const silleterias = require("./routes/api/routines/silleterias");
const vips = require("./routes/api/routines/vips");
const venues = require("./routes/api/venues");
const assetaudits = require("./routes/api/audits/assetAudits");
const taskaudits = require("./routes/api/audits/taskAudits");
const useraudits = require("./routes/api/audits/userAudits");


const app = express();
// DB Config
const uri = `mongodb://NicolasNino:233E169D@cluster0-shard-00-02-arsqt.mongodb.net:27017:27017,cluster0-shard-00-01-arsqt.mongodb.net:27017,cluster0-shard-00-00-arsqt.mongodb.net:27017/MERN?ssl=true&authSource=admin&retryWrites=true`;
// Connect to MongoDB
mongoose.connect(
    uri, 
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}
)
.then(() => console.log("MongoDB successfully connected"))
.catch(err => console.log(err));

// Bodyparser middleware
app.use(
    express.urlencoded({
      extended: false
    })
);
app.use(express.json());

app.use(fileUpload())

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/assets", assets);
app.use("/api/tasks", tasks);
app.use("/api/routines/baths", baths);
app.use("/api/routines/fachadas", fachadas);
app.use("/api/routines/locales", locales);
app.use("/api/routines/pantallas", pantallas);
app.use("/api/routines/parkings", parkings);
app.use("/api/routines/rcis", rcis);
app.use("/api/routines/silleterias", silleterias);
app.use("/api/routines/vips", vips);
app.use("/api/venues", venues);
app.use("/api/audits/assets", assetaudits);
app.use("/api/audits/tasks", taskaudits);
app.use("/api/audits/users", useraudits);

//CRON
cron.schedule('0 0 * * *', () => {
  console.log("CRON")
  // if tarea.estado == 'Creada' and tarea.fecha_inicio >= Hoy Then tarea.estado='Por ejecutar'
  modu.function1();
  // if tarea.estado != 'Cerrada' and tarea.fecha_fin <= Hoy Then tarea.estado='Vencida'
  modu.function2();
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on  http://localhost:${port} !`));