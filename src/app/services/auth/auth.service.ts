import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject } from  'rxjs';

import { Project } from  '../model/project';
import { Token } from  '../model/token';
import { Ums } from  '../model/ums';
import { User } from  '../model/user';
import { Users } from  '../model/users';
import { Record } from  '../model/record';

import { projectDataset, signInPath, signUpPath, usersDataset } from  '../utils';
import { consumptionMethod, consumptionKey, consumptionSecret } from  '../back-end';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authToken;
  public projectId;
  public userId;

  authSubject  =  new  BehaviorSubject(false);

  constructor(private httpClient: HttpClient) { }

  public addProject(projectName): Observable<Record> {
    var projectParams = {
      name: projectName
    };

    return this.httpClient.post<Record>(`${projectDataset}`, projectParams, {
      headers: {'Authorization':this.authToken} }
    ).pipe(
      tap((res:  Record ) => {
console.log(res);
        if (res.id) {
          this.projectId = res.id;
        };
      })
    );
  }

  public addUser(userInfo): Observable<Record> {
    var userParams = {
      id_project: this.projectId,
      name: userInfo.name,
      email: userInfo.email
    }

    return this.httpClient.post<Record>(`${usersDataset}`, userParams, {
      headers: {'Authorization':this.authToken} }
    ).pipe(
      tap((res:  Record ) => {
console.log(res);
        if (res.id) {
          this.userId = res.id;
        };
      })
    );
  }

  public getAuthToken(): Observable<Token> {
    var authParams = {
      method: consumptionMethod,
      key: consumptionKey,
      secret: consumptionSecret
    };

    return this.httpClient.post<Token>(`${signInPath}`, authParams ).pipe(
      tap((res:  Token ) => {
console.log(res);
        if (res.token) {
          this.authToken = res.token;
        }
      })
    );
  }

  public isLoggedIn(){
    // return localStorage.getItem('ACCESS_TOKEN') !== null;
    return  this.authSubject.asObservable();
  }

  public login(userInfo: User): Observable<Ums> {
    return this.httpClient.post(`${signInPath}`, userInfo).pipe(
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

  public signUp(userInfo: User): Observable<Ums> {
    var signupParams = {
      email: userInfo.email,
      password: userInfo.password
    };

    return this.httpClient.post<Ums>(`${signUpPath}`, signupParams ).pipe(
      tap((res:  Ums ) => {
console.log(res);
        if (res.id) {
          this.userId = res.id;
        };
      })
    );
  }
}