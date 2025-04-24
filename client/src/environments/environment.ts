export const environment = {
    production: false,
    api: {
      serverUrl: 'http://localhost:3000',
    },
    BASE_URL: 'http://localhost:4200',
    auth0: {
      domain: 'dev-iczqza1xd5wktvh5.us.auth0.com',
      clientId: 'imi9bWBgyt0oYIbgRLOr6YmfwHSA1fMs',
      redirectUri: 'http://localhost:4200',
      audience:'https://dev-iczqza1xd5wktvh5.us.auth0.com/api/v2/'
    },
    spotify_details: {
      clientId: '4ac9faa941464ffba0c0d182057c994a',
      redirectUri: 'http://localhost:4200/profile',
      tokenURL: 'https://accounts.spotify.com/api/token',
  }
}