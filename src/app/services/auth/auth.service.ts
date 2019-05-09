import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject } from  'rxjs';

import { Ums } from  '../model/ums';
import { User } from  '../model/user';
import { Users } from  '../model/users';
import { Project } from  '../model/project';

import { projectURL, signInPath, signUpPath } from  '../utils';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authSubject  =  new  BehaviorSubject(false);

  constructor(private httpClient: HttpClient) { }

  public isLoggedIn(){
    // return localStorage.getItem('ACCESS_TOKEN') !== null;
    return  this.authSubject.asObservable();
  }

  public login(userInfo: User): Observable<Ums> {
    return this.httpClient.post(`${projectURL}/${signInPath}`, userInfo).pipe(
      tap(async (res: Ums ) => {
        if (res.id) {
          localStorage.setItem('ACCESS_TOKEN', "access_token");
          // localStorage.setItem("ACCESS_TOKEN", res.user.access_token);
          this.authSubject.next(true);
        }
      })
    );
  }

  public logout(){
    localStorage.removeItem('ACCESS_TOKEN');
    this.authSubject.next(false);
  }

  public register(userInfo: User): Observable<Ums> {
    return this.httpClient.post<Ums>(`${projectURL}/${signUpPath}`, userInfo).pipe(
      tap((res:  Ums ) => {
console.log(res);
        if (res.id) {
          // localStorage.setItem('ACCESS_TOKEN', "access_token");
          // localStorage.set("ACCESS_TOKEN", res.user.access_token);
          this.authSubject.next(true);
        }
      })
    );
  }
}