import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { MessageService } from './services/message.service';

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

  constructor(private auth: AuthService, public messageService:MessageService) {}
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


    this.messageService.getProtectedResource().subscribe((response) => {
      const { data, error } = response;

      if (data) {
        this.message = JSON.stringify(data, null, 2);
      }

      if (error) {
        this.message = JSON.stringify(error, null, 2);
      }
    });
  
  }

}
