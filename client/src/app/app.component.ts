import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  baseURL = environment.BASE_URL;
  isAuthenticated:boolean = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Capture the 'isAuthenticated' query parameter
    this.route.queryParams.subscribe(params => {
      const isAuthenticatedParam = params['isAuthenticated'];
      this.isAuthenticated = isAuthenticatedParam === 'true'; // Convert to boolean
      
      console.log(this.isAuthenticated)

    });
  }



}
