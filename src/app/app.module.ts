import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Http, HttpModule, RequestOptions} from '@angular/http';
import {RouterModule} from '@angular/router';

import {ROUTES} from './app.routes';

import {AuthConfig, AuthHttp} from 'angular2-jwt';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {TopicsComponent} from './topics/topics.component';

import {AuthService} from './services/auth-service/auth.service';
import {AuthGuardService} from './services/auth-service/auth-guard.service';
import {TopicsService} from './services/topics-service/topics.service';
import {SpinnerService} from './services/spinner-service/spinner.service';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MdInputModule,
  MdCheckboxModule,
  MdButtonModule,
  MdToolbarModule,
  MdTooltipModule,
  MdProgressBarModule,
  MdSnackBarModule,
  MdDialogModule,
  MdDatepickerModule,
  MdNativeDateModule,
  MdIconModule,
  MdSelectModule,
  MdMenuModule,
} from '@angular/material';
import 'hammerjs';

import { MdDataTableModule } from 'ng2-md-datatable';
import { UserComponent } from './user/user.component';
import { UserService } from './services/user-service/user.service';
import { UserDropdownComponent } from './user-dropdown/user-dropdown.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { TopicDeletePopupComponent } from './topic-delete-popup/topic-delete-popup.component';
import { TopicAddOrEditPopupComponent } from './topic-add-or-edit-popup/topic-add-or-edit-popup.component';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenGetter: (() => localStorage.getItem('access_token')),
    globalHeaders: [{'Content-Type': 'application/json'}],
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
  ],
  entryComponents: [
    TopicDeletePopupComponent,
    TopicAddOrEditPopupComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    BrowserAnimationsModule,
    MdIconModule,
    MdButtonModule,
    MdCheckboxModule,
    MdToolbarModule,
    MdTooltipModule,
    MdDataTableModule,
    MdProgressBarModule,
    MdSnackBarModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdInputModule,
    MdDialogModule,
    MdSelectModule,
    MdMenuModule,
  ],
  providers: [
    AuthService,
    AuthGuardService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions],
    },
    SpinnerService,
    TopicsService,
    UserService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
