require('./config/config');

var express = require('express');
var cors = require('cors');

var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');

var app = express();
app.use(cors());
const port =  3001;
app.use(bodyParser.json());
app.use((req,res,next) => {
	res.header("Access-Control-Expose-Headers", "authorization");
	next();
});
require('./routes')(app);
require('./routes/api')(app);



app.listen(port, () => {
	console.log('Started on port '+port);
});
module.exports = {app};