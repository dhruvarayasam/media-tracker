import { Injectable } from '@angular/core';
import { mergeMap, Observable, of } from 'rxjs';
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
      url: `${env.api.serverUrl}/api/messages/public`,
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

    this.auth.getAccessTokenSilently().subscribe((token) => {
      this.bearer_token = token
    })

    const config: RequestConfigModel = {
      url: `${env.api.serverUrl}/api/protected`,
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${this.bearer_token}`
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
