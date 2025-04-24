// server.js or routes/spotify.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = 'http://localhost:3000/callback'; // Update for prod

// Exchange code for access token
router.post('/spotify/token', async (req, res) => {
  const code = req.body.code;

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', null, {
      params: {
        grant_type: 'authorization_code',
        code,
        redirect_uri,
        client_id,
        client_secret,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    res.json(response.data); // { access_token, refresh_token, ... }
  } catch (error) {
    res.status(500).json({ error: 'Token exchange failed' });
  }
});

// Get user's top tracks
router.get('/spotify/top-tracks', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  try {
    const response = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    res.json(response.data); // Send Spotify data back to frontend
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch top tracks' });
  }
});

module.exports = router;
