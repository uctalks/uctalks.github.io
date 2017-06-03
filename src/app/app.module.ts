import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Http, HttpModule, RequestOptions} from '@angular/http';
import {RouterModule} from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// import { DBModule } from '@ngrx/db';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { TopicsEffects } from './effects/topics';

import { reducer } from './reducers';
// import { schema } from './db'; // @TODO find out how to user DB

import {ROUTES} from './app.routes';

import {AuthConfig, AuthHttp} from 'angular2-jwt';

import {AppComponent} from './components/app.component';
import {HeaderComponent} from './components/header/header.component';
import {TopicsComponent} from './components/topics/topics.component';
import {TopicAddPopupComponent} from './components/topic-add-popup/topic-add-popup.component';

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
} from '@angular/material';
import 'hammerjs';

import { MdDataTableModule } from 'ng2-md-datatable';
import { UserComponent } from './components/user/user.component';
import { UserService } from './services/user-service/user.service';
import { UserDropdownComponent } from './components/user-dropdown/user-dropdown.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { TopicDeletePopupComponent } from './components/topic-delete-popup/topic-delete-popup.component';
import { TopicEditPopupComponent } from './components/topic-edit-popup/topic-edit-popup.component';
import { TopicsPageComponent } from './containers/topics-page';

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
    TopicAddPopupComponent,
    TopicDeletePopupComponent,
    TopicEditPopupComponent,
    UserComponent,
    UserDropdownComponent,
    DatepickerComponent,
    TopicsPageComponent,
  ],
  entryComponents: [
    TopicAddPopupComponent,
    TopicDeletePopupComponent,
    TopicEditPopupComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    BrowserAnimationsModule,
    StoreModule.provideStore(reducer),
    RouterStoreModule.connectRouter(),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    EffectsModule.run(TopicsEffects),
    // DBModule.provideDB(schema), // @TODO get back to DB
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
