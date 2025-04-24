export const environment = {
    production: true,
    api: {
      serverUrl: 'https://media-tracker-cyan.vercel.app',
    },
    BASE_URL: 'https://media-tracker-frontend.vercel.app',
    auth0: {
      domain: 'dev-iczqza1xd5wktvh5.us.auth0.com',
      clientId: 'imi9bWBgyt0oYIbgRLOr6YmfwHSA1fMs',
      redirectUri: 'https://media-tracker-frontend.vercel.app',
      audience: 'https://dev-iczqza1xd5wktvh5.us.auth0.com/api/v2/'
    },
    spotify_details: {
      clientId: '4ac9faa941464ffba0c0d182057c994a',
      redirectUri: 'http://https://media-tracker-frontend.vercel.app/profile',
      tokenURL: 'https://accounts.spotify.com/api/token',
  }
  };
  