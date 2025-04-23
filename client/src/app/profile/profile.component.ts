import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { APIService } from '../services/api-service.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [RouterOutlet],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {


  constructor(private auth: AuthService, private api:APIService) {}
  name:any = ""
  email:any = ""
  user_info:any = {}

  ngOnInit(): void {
    // Subscribe to the user observable to get user data once available
    this.auth.user$.subscribe({
      next: (user) => {
        this.name = user?.name
        this.email = user?.email
        // this.api.checkUserInfoAuth(this.name, this.email).subscribe({
        //   next: (res) => {
        //     this.user_info = res.user_info
        //     console.log(res)
        //   }
        // })






      },
      error: (err) => {
        console.error('Error getting user data:', err);
      },
    });


  
  }

}
