import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import IUser from '../../models/user';
import restPrefix from '../../rest-prefix';
import { IUserService } from './types';

@Injectable()
export class UserService implements IUserService  {
  constructor(protected http: Http) { }

  public setUser(userProps: any): Observable<IUser> {
    return this.http.post(`${restPrefix}/users/`, { userProps }).map(res => res.json())
  }

  public getAllUsers(): Observable<ReadonlyArray<IUser>> {
    return this.http.get(`${restPrefix}/users/all/`).map(res => res.json())
  }
}
