import { Routes } from '@angular/router';
import { TopicsComponent } from './topics/topics.component';
import { UserComponent } from './user/user.component';

export const ROUTES: Routes = [
  { path: '',	component: TopicsComponent },
  { path: 'user',	component: UserComponent },
  {	path: '**',	redirectTo: ''},
];
