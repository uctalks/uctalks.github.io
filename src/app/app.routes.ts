import { Routes } from '@angular/router';

import { TopicsPageComponent } from './topics/containers/topics-page';
import { AuthGuard } from './auth/services/auth-guard.service';
import { LoginPageComponent } from './auth/containers/login-page.component';

export const ROUTES: Routes = [
  { path: '', redirectTo: '/topics', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  {
    path: 'topics',
    component: TopicsPageComponent,
    canActivate: [AuthGuard],

    // TODO add lazyLoading once ng2-md-datatable is dropped:
    // loadChildren: './topics/topics.module#TopicsModule',
  },
];
