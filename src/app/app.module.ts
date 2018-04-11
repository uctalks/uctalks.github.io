import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'; // TODO remove?
import { FormsModule } from '@angular/forms'; // TODO remove?
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';

import { environment } from '../environments/environment';

import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { MaterialModule } from 'app/material/material.module';
import { TopicsModule } from './topics/topics.module';
import { ROUTES } from './app.routes';
import { metaReducers, reducers } from './reducers';
import { CustomRouterStateSerializer } from './utils';
import { RootComponent } from './root-component/root.component';

@NgModule({
  imports: [
    AuthModule.forRoot(),
    BrowserModule,
    CoreModule.forRoot(),
    EffectsModule.forRoot([]),
    FormsModule,
    HttpModule, // TODO replace with HttpClientModule
    MaterialModule,
    RouterModule.forRoot(ROUTES),
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    StoreDevtoolsModule.instrument({
      name: 'UC Talks store',
      logOnly: environment.production,
    }),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    TopicsModule,
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
  ],
  bootstrap: [RootComponent],
})
export class AppModule {
}
