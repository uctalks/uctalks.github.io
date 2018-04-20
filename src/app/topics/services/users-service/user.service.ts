import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { restPrefix } from '../../../core/rest-prefix';
import { IUser } from '../../models';
import { IUserService } from './types';
import { tap } from 'rxjs/operators';

@Injectable()
export class UserService implements IUserService  {
  constructor(private readonly http: HttpClient) {
  }

  public getAllUsers(): Observable<ReadonlyArray<IUser>> {
    return this.http.get<ReadonlyArray<IUser>>(`${restPrefix}/users/all/`);
  }

  public setUser(userProps: any): Observable<IUser> {
    return this.http.post<IUser>(`${restPrefix}/users/`, { userProps }).pipe(
      tap(v => {
        console.log(v);
        this.http.get('https://stativka.eu.auth0.com/api/v2/users').subscribe(v => console.log(v));
      })
    );
  }
}
