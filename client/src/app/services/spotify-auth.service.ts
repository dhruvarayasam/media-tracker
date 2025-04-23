import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpotifyAuthService {

  private baseUrl = 'http://localhost:3000/spotify'
  private accessToken: string | null = null
  private refreshToken: string | null = null

  constructor(private http: HttpClient) { }

  loginWithSpotify(): void {
    this.http.get(this.baseUrl+'/login')
  }
  

  getAccessToken(): void {

  }
}
