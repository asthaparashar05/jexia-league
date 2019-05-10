import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { Token } from '../model/token';
import { User } from '../model/user';

import { signInPath, signUpPath } from '../utils';
import { consumptionMethod, consumptionKey, consumptionSecret } from '../back-end';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authSubject  =  new  BehaviorSubject(false);

  constructor(private httpClient: HttpClient) { }

  public getAuthToken(): Observable<Token> {
    const authParams = {
      method: consumptionMethod,
      key: consumptionKey,
      secret: consumptionSecret
    };

    return this.httpClient.post<Token>(`${signInPath}`, authParams ).pipe(
      tap((res: Token ) => {
        console.log(res);
        if (res.token) {
          localStorage.setItem('access_token', res.token);
        }
      })
    );
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem('auth_token') !== null;
  }

  public login(userInfo: User): Observable<Token> {
    const signinParams = {
      method: 'ums',
      email: userInfo.email,
      password: userInfo.password
    };

    return this.httpClient.post<Token>(`${signInPath}`, signinParams ).pipe(
      tap((res: Token ) => {
        console.log(res);
        localStorage.setItem('auth_token', res.token);
      })
    );
  }

  public logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('auth_token');
  }

  public signUp(userInfo: User): Observable<User> {
    const signupParams = {
      email: userInfo.email,
      password: userInfo.password
    };

    return this.httpClient.post<User>(`${signUpPath}`, signupParams ).pipe(
      tap((res: User ) => {
        console.log(res);
      })
    );
  }
}
