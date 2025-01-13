import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { Router } from '@angular/router'
import { AuthService } from '@auth0/auth0-angular';
import { LoginButtonComponent } from "./login";
import { LogoutButtonComponent } from "./logout";
import { UserProfileComponent } from "./profile";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginButtonComponent, LogoutButtonComponent, UserProfileComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  auth_status:boolean = false
  constructor(public auth:AuthService) {}

  ngOnInit(): void {
      
  }

}
