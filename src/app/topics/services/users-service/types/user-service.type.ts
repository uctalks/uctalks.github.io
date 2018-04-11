import { InjectionToken } from '@angular/core';
import { IUserService } from './user-service.interface';

export const USER_SERVICE = new InjectionToken<IUserService>('UserService');
