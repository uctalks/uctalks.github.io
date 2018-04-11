import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from '../material/material.module';
import { RootComponent } from '../root-component/root.component';
import { RouterModule } from '@angular/router';

const COMPONENTS = [
  DatepickerComponent,
  HeaderComponent,
  RootComponent,
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class CoreModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
    };
  }
}
