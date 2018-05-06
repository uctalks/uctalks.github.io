import { Observable } from 'rxjs/Observable';
import { IUser } from '../../../models';

export interface IUserService {
  getAllUsers(): Observable<Array<IUser>>
}
