import { Observable } from 'rxjs/Observable';

export interface IUserService {
  setUser(userProps: any): Observable<any>

  getAllUsers(): Observable<any>
}
