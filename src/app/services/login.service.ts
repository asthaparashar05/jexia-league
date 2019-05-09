import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { shareReplay, tap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { projectURL, signInPath, signUpPath} from './utils';
import { User } from './model/user'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
  ) { }

  public register(user: User): Observable<User>{
    return this.http.post<User>(projectURL + signUpPath, { 'email': user.email, 'password': user.password });
  }

  public login(user: User): Observable<any> {
    var request = { 'method': 'ums', 'email': user.email, 'password': user.password }
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
