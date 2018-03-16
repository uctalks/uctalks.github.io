import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule, RequestOptions } from '@angular/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';

import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../environments/environment';
import { TopicsEffects } from './effects/topics';
import { UsersEffects } from './effects/users';

import { reducers } from './reducers';

import { AuthConfig, AuthHttp } from 'angular2-jwt';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { TopicsComponent } from './components/topics/topics.component';

import { AuthService } from './services/auth-service/auth.service';
import { AuthGuardService } from './services/auth-service/auth-guard.service';
import { TopicsService } from './services/topics-service/topics.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import 'hammerjs';

import { UserComponent } from './components/user/user.component';
import { UserService } from './services/user-service/user.service';
import { UserDropdownComponent } from './components/user-dropdown/user-dropdown.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { TopicDeletePopupComponent } from './components/topic-delete-popup/topic-delete-popup.component';
import { TopicAddOrEditPopupComponent } from './components/topic-add-or-edit-popup/topic-add-or-edit-popup.component';
import { TopicsPageComponent } from './containers/topics-page';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatSelectModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import { MatDataTableModule } from 'ng2-md-datatable';
import { CurrentUserIdEffects } from './effects/currentUserId';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenGetter: (() => localStorage.getItem('access_token')),
    globalHeaders: [{ 'Content-Type': 'application/json' }],
  }), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TopicsComponent,
    TopicDeletePopupComponent,
    TopicAddOrEditPopupComponent,
    UserComponent,
    UserDropdownComponent,
    DatepickerComponent,
    TopicsPageComponent,
  ],
  entryComponents: [
    TopicDeletePopupComponent,
    TopicAddOrEditPopupComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 50 }) : [],
    EffectsModule.forRoot([
      TopicsEffects,
      UsersEffects,
      CurrentUserIdEffects,
    ]),
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatTooltipModule,
    MatDataTableModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatMenuModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    AuthService,
    AuthGuardService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions],
    },
    TopicsService,
    UserService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
