import { InjectionToken } from '@angular/core';
import { IAuthService } from './auth-service.interface';

export const AUTH_SERVICE = new InjectionToken<IAuthService>('AuthService');
