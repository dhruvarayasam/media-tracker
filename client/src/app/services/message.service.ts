import { Injectable } from '@angular/core';
import { mergeMap, Observable, of, from, map } from 'rxjs';
import { environment as env } from '../../environments/environment';
import { ApiResponseModel, MessageModel, RequestConfigModel } from '../models';
import { ExternalApiService } from './external-api.service';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(public externalApiService: ExternalApiService, private auth:AuthService) {}
  bearer_token = ''

  getPublicResource = (): Observable<ApiResponseModel> => {
    const config: RequestConfigModel = {
      url: `${env.api.serverUrl}/api/public`,
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    };

    return this.externalApiService.callExternalApi(config).pipe(
      mergeMap((response) => {
        const { data, error } = response;

        return of({
          data: data ? (data as MessageModel) : null,
          error,
        });
      })
    );
  };
  getProtectedResource = (): Observable<ApiResponseModel> => {
    // Use from() to convert the promise to an observable
    return from(this.auth.getAccessTokenSilently()).pipe(
      // Set the bearer token and then proceed
      mergeMap((token) => {
        this.bearer_token = token;
  
        const config: RequestConfigModel = {
          url: `${env.api.serverUrl}/api/private`,
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${this.bearer_token}`,
          },
        };
        console.log(this.bearer_token)
        // Call the external API
        return this.externalApiService.callExternalApi(config);
      }),
      // Process the response
      map((response) => {
        const { data, error } = response;
  
        return {
          data: data ? (data as MessageModel) : null,
          error,
        };
      })
    );
  };
  

  getAdminResource = (): Observable<ApiResponseModel> => {
    const config: RequestConfigModel = {
      url: `${env.api.serverUrl}/api/admin`,
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    };

    return this.externalApiService.callExternalApi(config).pipe(
      mergeMap((response) => {
        const { data, error } = response;

        return of({
          data: data ? (data as MessageModel) : null,
          error,
        });
      })
    );
  };
}
