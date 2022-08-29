// index.JS file which is the centre of our whole project , where we have requires various frameworks , constants.

const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://urajrishu:aUHDB96UyJaq9SB@cluster0.1wief.mongodb.net/sarthak-db", {    // connection with our mongoDB database    
    useNewUrlParser: true        
})
.then( () => console.log("MongoDb is connected"))           // result when the connection is done
.catch ( err => console.log(err) )                          // error displayed while connecting with our database.



app.use('/', route);


app.listen(process.env.PORT || 4000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 4000))
});
