import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideAuth0 } from '@auth0/auth0-angular';

bootstrapApplication(AppComponent, {
  providers: [
    provideAuth0({
      domain: 'dev-iczqza1xd5wktvh5.us.auth0.com',
      clientId: 'imi9bWBgyt0oYIbgRLOr6YmfwHSA1fMs',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
  ]
})