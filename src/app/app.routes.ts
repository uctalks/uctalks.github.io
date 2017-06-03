import { Routes } from '@angular/router';
import {TopicsPageComponent} from './containers/topics-page';
import { UserComponent } from './components/user/user.component';

export const ROUTES: Routes = [
  { path: 'topics',	component: TopicsPageComponent },
  { path: 'user',	component: UserComponent },

  { path: '', redirectTo: '/topics', pathMatch: 'prefix' },
];
