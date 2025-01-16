import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideAuth0 } from '@auth0/auth0-angular';
import { environment } from './environments/environment';
import { withInterceptors, provideHttpClient } from '@angular/common/http';
import { authInterceptor } from './app/auth.interceptor';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig)

// {
//   providers: [
//     provideAuth0({
//       domain: environment.auth0.domain,
//       clientId: environment.auth0.clientId,
//       authorizationParams: {
//         redirect_uri: environment.auth0.redirectUri,
//         audience: environment.auth0.audience
//       }
//     }),provideHttpClient(withInterceptors([authInterceptor])), provideRouter(appRoutes)
//   ]
// }