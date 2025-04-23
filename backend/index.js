require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const User = require("./models/User")
const axios = require("axios")

const app = express();
const { auth } = require('express-oauth2-jwt-bearer');

const spotify_client_id = process.env.SPOTIFY_CLIENT_ID
const spotify_secret_id = process.env.SPOTIFY_SECRET_ID

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


app.post('/user_info', checkJwt, async (req, res) => {
  // this endpoint is triggered after a login
  // checks if user is in Mongo; if not, add them to the database
  // if user is in Mongo, send back all available user info in JSON

  const {name, email} = req.body
  if (!name || !email) {
    return res.status(400).json({message: "name and/or email are not valid"})
  }
  try {
    let user = await User.findOne({email})

    if (!user) {
      await User.create({name, email, watched_movies: {}, wishlist: []})
      return res.status(200).json({message: 'NEW_USER_CREATED_NO_DATA', user_info:{name, email, watched_movies: {}, wishlist: []}})
    }
    return res.status(200).json({message: "USER_EXISTS", user_info:user})
  } catch (error) {
    res.status(400).json({message:  `Server Error: ${error}`})
  }
})

// spotify/music endpoints

app.get('/spotify/login', (req, res) => {
  const scope = 'user-read-private user-read-email';
  const authUrl = 'https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: spotify_client_id,
      scope: scope,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    });
  res.redirect(authUrl);
});

app.get('/spotify/callback', async (req, res) => {
  const code = req.query.code || null;
  const tokenUrl = 'https://accounts.spotify.com/api/token';
  const authOptions = {
    method: 'post',
    url: tokenUrl,
    data: querystring.stringify({
      code: code,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
      grant_type: 'authorization_code',
    }),
    headers: {
      'Authorization': 'Basic ' + Buffer.from(spotify_client_id + ':' + spotify_secret_id).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  try {
    const response = await axios(authOptions);
    const access_token = response.data.access_token;
    const refresh_token = response.data.refresh_token;

    // Redirect to your Angular app with the tokens
    res.redirect(`http://localhost:4200/?access_token=${access_token}&refresh_token=${refresh_token}`);
  } catch (error) {
    res.send('Error during authentication');
  }
});


app.get("/spotify/refresh_token", async (req, res) => {
  const refresh_token = req.query.refresh_token;
  const tokenUrl = 'https://accounts.spotify.com/api/token';

  const authOptions = {
    method: 'post',
    url: tokenUrl,
    data: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token: refresh_token,
    }),
    headers: {
      'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  try {
    const response = await axios(authOptions);
    const access_token = response.data.access_token;
    res.json({ access_token: access_token });
  } catch (error) {
    res.send('Error refreshing token');
  }
})


// movie endpoints

app.post('/update_wishlist_movie', checkJwt, async (req, res) => {
  // add a movie to a user's wishlist
  const {email, movie, add_movie} = req.body

  if (email) {
    user = await User.findOne({email})

    if (add_movie) {
      user.wishlist.push(movie)
      await user.save()
      return res.status(200).json({message: "movie added to wishlist successfully", user_info:user})
    } else {
      user.wishlist = user.wishlist.filter((item) => movie != item)
      await user.save()
      return res.status(200).json({message: "movie removed from wishlist successfully", user_info:user})
    }


  }

  return res.status(400).json({message: 'email identifier null'})

})

app.post('/update_notes_movie', checkJwt, async (req, res) => {
  const {email, notes} = req.body

  if (email && notes) {

    const result = await User.findOneAndUpdate(
      { email: email }, // Filter by email
      { $set: { [`watched_movies.${movieTitle}.notes`]: notes } }, // Update notes for the specific movie
      { new: true } // Return the updated document
    )

    if (result) {
      return res.status(200).json({message:'success', user_info:user})
    }
    return res.status(400).json({message:'notes update failed'})

  }

  return res.status(400).json({message: 'email identifier null'})

})

app.post('/update_rating_movie', checkJwt, async (req, res) => {
  const {email, rating} = req.body

  try {
    const result = await User.findOneAndUpdate(
      { email: email }, // Filter to find the user by email
      { $set: { [`watched_movies.${movieTitle}.rating`]: rating } }, // Update the rating for the specific movie
      { new: true, runValidators: true } // Return the updated document and run schema validation
    );

    if (result) {
      res.status(200).json({message: 'success', user_info:user})
    } 
    res.status(400).json({message: 'update rating'})


  } catch (error) {
    res.status(400).json({message: error})
  }
})

app.post('/get_wishlist', checkJwt, async (req, res) => {

  const {email} = req.body
  const user = await User.findOne({email})
  if (!user) {
    return res.status(400).json({message: 'error with finding user'})
  }
  return res.status(200).json({message: 'success', wishlist:user.wishlist})

})

app.post('/get_watchedlist', checkJwt, async (req, res) => {

  const {email} = req.body
  const user = await User.findOne({email})
  if (!user) {
    return res.status(400).json({message: 'error with finding user'})
  }
  return res.status(200).json({message: 'success', wishlist:user.watched_movies})
})

// Server start
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

