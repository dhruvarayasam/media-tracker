import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-user-profile',
  template: `
    <ul>
      <li>{{ name }}</li>
    </ul>`,
  standalone: true
})
export class UserProfileComponent {

  constructor(private auth: AuthService) {}
  name:any = ""

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
  }

}
