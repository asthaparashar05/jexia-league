import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Player, Token, PlayerWithGames } from './model';
import { consumptionMethod, consumptionKey, consumptionSecret, signInPath } from './utils';

const playerDataset = '/ds/player';
const fooballDataset = '/ds/foosball';
const carRacingDataset = '/ds/car_racing';
const tableTennisDataset = '/ds/table_tennis';
const teamDataset = '/ds/team';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

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

  addAuthHeader(headers: HttpHeaders): HttpHeaders {
    if ( localStorage.getItem('access_token') === null ) {
      this.getAuthToken();
    }
    headers.append('Authorization', localStorage.getItem('access_token'));
    return headers;
  }

  createPlayer(player: PlayerWithGames): Observable<PlayerWithGames> {
    const headers = new HttpHeaders();
    this.addAuthHeader(headers);
    return this.httpClient.post<PlayerWithGames>(`${playerDataset}`, player, { headers }).pipe(
      tap((res: PlayerWithGames ) => {
        console.log(res);
      })
    );
  }

  getPlayer(id: string): Observable<PlayerWithGames> {
    const headers = new HttpHeaders();
    this.addAuthHeader(headers);
    return this.httpClient.get<PlayerWithGames>(`${playerDataset}` + `?cond=[{"field":"id"},"=",`
    + id + `]&outputs=["foosball","table_tennis","car_racing"]`, { headers }).pipe(
      tap((res: PlayerWithGames ) => {
        console.log(res);
      })
    );
  }

  updatePlayer(player: Player): Observable<Player> {
    const headers = new HttpHeaders();
    this.addAuthHeader(headers);
    return this.httpClient.put<Player>(`${playerDataset}`, player, { headers } ).pipe(
      tap((res: Player ) => {
        console.log(res);
      })
    );
  }

}
