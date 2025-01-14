require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');

const app = express();
const { auth } = require('express-oauth2-jwt-bearer');

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: process.env.AUDIENCE,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
});

const port = process.env.PORT || 3000;

app.use(cors({ credentials: true, origin: process.env.CORS_URL }));
app.use(express.json());

mongoose.connect(process.env.CONNECTION_URI).then(() => {
    console.log("Sucessfully connected to Mongo.")
}).catch((error) => {
    console.log(error)
}) 

// BASE
app.get('/', (req, res) => {

    res.send("HELLO WORLD")

});

app.get('/api/public', function(req, res) {
    res.json({
      message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
    });
  });
  


// authenticated endpoints
app.get('/api/private', checkJwt, function(req, res) {
    
    res.json({
      message: 'Hello from a private endpoint! You need to be authenticated to see this.'
    });

    console.log('Success')
  });


app.post('/createUser', checkJwt, function (req, res) {
  console.log('CREATE USER HERE')
})

// Server start
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

