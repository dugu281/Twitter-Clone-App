const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');   // importing mongoose
const app = express();

require('dotenv').config();

const PORT = 8080;          // listening on port number 8080

const DB = process.env.MONGO_DB_URL            // database to connect to

// add global variable to get or path
global.__basedir = __dirname;            // __basedir - will hold the path of the base(backend) folder 

// connecting to MONGODB database
mongoose.connect(DB);  // connect to database

// checking connection
mongoose.connection.on('connected', () => {
    console.log('Connection established to MongoDB');
})
// if error in connection
mongoose.connection.on('error', (error) => {
    console.log('connection error: ' + error);
})

// using cors (middleware)
// app.use(cors());
app.use(cors(
    {
        origin: ["http://localhost:3000"],
        methods: ["POST", "GET", "PUT", "DELETE"],
        credentials: true
    }
));


// middleware for formating json responses
app.use(express.json());


// importing UserModel Schema
require('./models/user_model');

// importing TweetsModel Schema
require('./models/tweet_model');

app.use(require('./routes/user_route'));   // from routes/user_route.js   ( /signup and /login )

app.use(require('./routes/tweet_route'));   // from routes/tweet_route.js   ( tweet management routes )

app.use(require('./routes/file_route'));   // from routes/file_route.js    ( for uploading files - here images only )


app.listen(PORT, (req, res) => {
    console.log(`Server Started on port ${PORT}`);
})






/*


PORT = 8080

Database name - TwitterCloneApp

MONGO_URL - 'mongodb://127.0.0.1:27017/TwitterCloneApp'

- no need to create .env file


*/



































// app.get("/welcome", (req, res) => {
//     res.status(200).json({"msg": "Hey, Brother!"});
// })
