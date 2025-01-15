import { HttpInterceptorFn } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular'; // Replace with your authentication service
import { switchMap } from 'rxjs/operators';
import {inject} from '@angular/core'

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService)
  if (req.headers.has('X-Use-Auth')) {
    const cleanReq = req.clone({ headers: req.headers.delete('X-Use-Auth') });
    return auth.getAccessTokenSilently().pipe(
      switchMap((token) => {
        if (token) {
          // Clone the request and add the Authorization header
          const authorizedReq = cleanReq.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          });
          return next(authorizedReq);
        }
        return next(cleanReq); // Proceed without token if unavailable
      })
    );
  }

  return next(req)
};
