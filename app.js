const express = require("express");
const {graphqlHTTP} = require('express-graphql');
const { default: mongoose } = require("mongoose");
const schema = require('./schema/schema');
const app = express();
const cors = require('cors')

// Reaading environment variables
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT|| 4000

// allow cross-origin request
app.use(cors());

mongoose.connect(process.env.MONGODB_URL);
mongoose.connection.once('open',()=>{
        console.log("connected successfully to mongo");
})
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql:true // this will show graphiql interface on /graphql path
}));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static( 'client/build' ));
  
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); // relative path
    });
  }
  
  

app.listen(port, ()=>{
    console.log("listening on port: " + port);
})