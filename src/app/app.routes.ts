import { Routes } from '@angular/router';
import { TopicsComponent } from './topics/topics.component';

export const ROUTES: Routes = [
  { path: '',	component: TopicsComponent },
  {	path: '**',	redirectTo: ''},
];
