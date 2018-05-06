import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { restPrefix } from '../../../core/rest-prefix';
import { IUser } from '../../models';
import { IUserService } from './types';

@Injectable()
export class UserService implements IUserService  {
  constructor(private readonly http: HttpClient) {
  }

  public getAllUsers(): Observable<Array<IUser>> {
    return this.http.get<Array<IUser>>(`${restPrefix}/users`);
  }
}
