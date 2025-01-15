import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  authHeaders = { 'X-Use-Auth': 'true' }
  unAuthHeaders = {'X-Use-Auth': 'false'}
  base_api_url = environment.api.serverUrl

  constructor(private http: HttpClient) { }

  checkUserInfoAuth(name:string, email:string): Observable<any> {
    const headers = this.authHeaders
    
    return this.http.post( `${this.base_api_url}/user_info`, {name: name, email: email}, {headers})

  }
}
