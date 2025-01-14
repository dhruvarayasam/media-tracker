import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { MessageService } from './services/message.service';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  template: `
    <ul>
      <li>{{ name }}</li>
      <li>{{message}}</li>
    </ul>`,
  standalone: true
})
export class UserProfileComponent {

  constructor(private auth: AuthService, public messageService:MessageService, private http:HttpClient) {}
  name:any = ""
  message = ''

  ngOnInit(): void {
    // Subscribe to the user observable to get user data once available
    this.auth.user$.subscribe({
      next: (user) => {
        this.name = user?.name; // Assign user data when available
      },
      error: (err) => {
        console.error('Error getting user data:', err);
      },
    });

    this.auth.getAccessTokenSilently().subscribe((token) => {

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      });

      this.http.get(`${environment.api.serverUrl}/api/private`, { headers }).subscribe((res:any) => {
        console.log(res)
        this.message = res.message
      })
    })
  
  }

}
