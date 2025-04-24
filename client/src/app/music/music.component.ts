import { Component } from '@angular/core';
import { SpotifyAuthService } from '../services/spotify-auth.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-music',
  imports: [],
  templateUrl: './music.component.html',
  styleUrl: './music.component.css'
})
export class MusicComponent {

  isSpotifyAuthed: boolean = false;

  constructor(private spotAuth: SpotifyAuthService) {}

  ngOnInit(): void {
    // first search URL params to get access token; if there is none, check in memory (below steps)
    // check for valid access token from spotAuthService
    // if not present, use in memory refresh token to get valid access token
    // if that fails, do nothing and keep bool false
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code');
    this.spotAuth.getToken(code)
    this.spotAuth.accessToken$.subscribe(token => {
      // make a test request here to see if token is valid (implement in service)
      // if not, get a new token by using refresh token (implement in service)
      // if nothing works, leave as is
    });
  }


  

  loginSpotify() {
    this.spotAuth.loginToSpotify()
  }

}
