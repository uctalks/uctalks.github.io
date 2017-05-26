import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import restPrefix from '../rest-prefix';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  public addOrUpdateUser(userProps: any): Observable<any> {
    return this.http.post(`${restPrefix}/users/`, { userProps }).map(res => res.json())
  }
}
