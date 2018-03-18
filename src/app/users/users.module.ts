import { NgModule } from '@angular/core';
import { USER_SERVICE } from './user-service/types';
import { UserService } from './user-service/user.service';

@NgModule({
  providers: [
    {
      provide: USER_SERVICE,
      useClass: UserService
    },
  ]
})
export class UsersModule { }
