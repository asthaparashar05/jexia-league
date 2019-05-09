import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { shareReplay, tap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { projectURL, signInPath, signUpPath, User } from './';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
  ) { }

  public signup(email, password: string): Observable<User>{
    return this.http.post<User>(projectURL + signUpPath, { email, password });
  }

  public login(email, password: string): Observable<any> {
    var request = { 'method': 'ums', email, password }
    return this.http.post(projectURL + signInPath, request)
      .pipe(tap(tokens => this.storeTokens(tokens)));
  }

  /**
   * Stores login tokens locally
   *
   * @param tokens {Object} Success login tokens
   */
  private storeTokens(tokens) {
    localStorage.setItem('currentUser', tokens.access_token);
  }

  /**
   * Logs out user
   */
  public logout() {
    localStorage.removeItem('currentUser');
  }

}
