import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { APIService } from '../services/api-service.service';
import { RouterOutlet } from '@angular/router';
import { SpotifyAuthService } from '../services/spotify-auth.service';
import { MusicComponent } from "../music/music.component";

@Component({
  selector: 'app-profile',
  imports: [RouterOutlet, MusicComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {


  constructor(private auth: AuthService, private api:APIService, private spotAuth: SpotifyAuthService) {}
  name:any = ""
  email:any = ""
  ngOnInit(): void {
    // Subscribe to the user observable to get user data once available
    this.auth.user$.subscribe({
      next: (user) => {
        this.name = user?.name
        this.email = user?.email

        


        

      },
      error: (err) => {
        console.error('Error getting user data:', err);
      },
    });
  }

  loginSpotify() {
    this.spotAuth.loginToSpotify()
   }
}
