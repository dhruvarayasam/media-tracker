import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APIService } from './services/api-service.service';

@Component({
  selector: 'app-user-profile',
  template: `
    <ul>
      <li>{{ user_info.name }}</li>
      <li>{{user_info.email}}</li>
    </ul>`,
  standalone: true
})
export class UserProfileComponent {

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
        this.api.checkUserInfoAuth(this.name, this.email).subscribe({
          next: (res) => {
            this.user_info = res.user_info
            console.log(res)
          }
        })






      },
      error: (err) => {
        console.error('Error getting user data:', err);
      },
    });

    // this.auth.getAccessTokenSilently().subscribe((token) => {

    //   authenticated API request example

    //   const headers = new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`,
    //   });

    //   this.http.get(`${environment.api.serverUrl}/api/private`, { headers }).subscribe((res:any) => {
    //     console.log(res)
    //     this.message = res.message
    //   })
    // })


  
  }

}
