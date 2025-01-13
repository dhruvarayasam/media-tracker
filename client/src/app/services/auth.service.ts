

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root' // Ensures this service is a singleton
})
export class AuthService {
  // Global state variable to track authentication
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {}

  // Method to set authentication state
  setAuthState(state: boolean): void {
    this.isAuthenticatedSubject.next(state);
  }

  // Optional: Synchronous getter for quick checks
  getAuthState(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
