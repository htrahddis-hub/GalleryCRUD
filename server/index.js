const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});
app.use(express.static("public"));
app.set('view engine', 'ejs');
// app.use(cors({origin:'https://gracious-northcutt-5ad87a.netlify.app',credentials: true}));
const routes = require('./routes/routes');
app.use('/', routes);

// app.get('/',(req,res)=>{
//   res.send("Hello to CRUD");
// })


const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));