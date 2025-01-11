import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  baseURL = environment.BASE_URL;
  isAuthenticated:boolean = false;

  constructor(private route: ActivatedRoute, private auth: AuthService) {}

  ngOnInit() {
    // Capture the 'isAuthenticated' query parameter
    // this.route.queryParams.subscribe(params => {
    //   const isAuthenticatedParam = params['isAuthenticated'];
    //   this.isAuthenticated = isAuthenticatedParam === 'true'; // Convert to boolean
      
    //   console.log(this.isAuthenticated)

    // });

    this.auth.handleRedirectCallback().subscribe({
      next: () => {
        console.log('Redirect callback handled');
      },
      error: (err) => {
        console.error('Error handling redirect callback:', err);
      },
    });

    // Subscribe to the isAuthenticated observable
    this.auth.isAuthenticated$.subscribe((isAuth) => {
      this.isAuthenticated = isAuth;
      console.log('Authentication Status:', this.isAuthenticated);
    });

    // this.auth.isAuthenticated$.subscribe((isAuth) => {
    //   this.isAuthenticated = isAuth;
    //   console.log(this.isAuthenticated)
    // });
  }
}
