// services/spotify-auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })


export class SpotifyAuthService {
  private clientId = environment.spotify_details.clientId; 
  private redirectUri = environment.spotify_details.redirectUri;
  private scope = 'user-top-read';
  private serverUrl = environment.api.serverUrl;
  private accessTokenSubject = new BehaviorSubject<string | null>(null);
  private refreshTokenSubject = new BehaviorSubject<string | null>(null);

  accessToken$ = this.accessTokenSubject.asObservable();
  refreshToken$ = this.refreshTokenSubject.asObservable();

  setTokens(access: string, refresh: string) {
    this.accessTokenSubject.next(access);
    this.refreshTokenSubject.next(refresh);
  }

  constructor(private http: HttpClient) {}

  async loginToSpotify() {

    const scope = 'user-read-private user-read-email';
    const authUrl = new URL("https://accounts.spotify.com/authorize")

    const generateRandomString = (length:any) => {
      const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const values = crypto.getRandomValues(new Uint8Array(length));
      return values.reduce((acc, x) => acc + possible[x % possible.length], "");
    }
    
    const codeVerifier  = generateRandomString(64);

    const sha256 = async (plain:any) => {
      const encoder = new TextEncoder()
      const data = encoder.encode(plain)
    
      return window.crypto.subtle.digest('SHA-256', data)
    }

    const base64encode = (a:any) => {
      return btoa(String.fromCharCode(...new Uint8Array(a)))
        .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

    }

    const hashed = await sha256(codeVerifier) // maybe include await here
    const codeChallenge = base64encode(hashed);


    // generated in the previous step
    window.localStorage.setItem('code_verifier', codeVerifier);

    const params =  {
      response_type: 'code',
      client_id: this.clientId,
      scope,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      redirect_uri: this.redirectUri,
    }

    authUrl.search = new URLSearchParams(params).toString();
    console.log(authUrl.toString())
    window.location.href = authUrl.toString();

  }

  async getToken (code: string | null) {
    if (!code) {
      console.error('No code provided');
      return;
    }
    const codeVerifier = localStorage.getItem('code_verifier');
    const url = 'https://accounts.spotify.com/api/token';
  
    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: this.clientId,
        grant_type: 'authorization_code',
        code,
        redirect_uri: this.redirectUri,
        code_verifier: codeVerifier || '', // fallback in case null
      }),
    };
  
    const body = await fetch(url, payload);
    const response = await body.json();

    console.log(body.status)

    // localStorage.setItem('access_token', response.access_token);
    if (body.status === 200) {
      console.log('yippee')
      this.setTokens(response.access_token, response.refresh_token);
    }
    return response
  };

  }
  
