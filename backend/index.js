require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');


const port = process.env.PORT || 3000;

const app = express();
app.use(cors({ credentials: true, origin: process.env.CORS_URL }));
app.use(express.json());

mongoose.connect(process.env.CONNECTION_URI).then(() => {
    console.log("Sucessfully connected to Mongo.")
}).catch((error) => {
    console.log(error)
}) 

const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET_STR,
  baseURL: process.env.BASE_AUTH_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL
};
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// BASE
app.get('/', (req, res) => {
    // CHECKS FOR AUTH STATUS --> frontend will check response and serve page accordingly
    const authStatus = req.oidc.isAuthenticated()
    res.redirect(process.env.REDIRECT_HOME_URL + `?isAuthenticated=${authStatus}`)
    // res.send(JSON.stringify({home:true}))

});



// authenticated URLS
app.get('/profile', requiresAuth(), (req, res) => {
    // gather data from mongo
    res.send(JSON.stringify(req.oidc.user));
});

// Server start
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

