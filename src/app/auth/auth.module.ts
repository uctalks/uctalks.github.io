import { ModuleWithProviders, NgModule } from '@angular/core';
import { AuthService } from './services/auth.service';
import { MaterialModule } from '../material/material.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './effects/auth';
import { reducers } from './reducers';

@NgModule({
  imports: [
    MaterialModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthEffects]),
  ]
})
export class AuthModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [AuthService],
    };
  }
}
