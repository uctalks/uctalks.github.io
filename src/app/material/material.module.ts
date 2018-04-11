import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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

const publicModules = [
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
];

@NgModule({
  imports: [
    BrowserAnimationsModule,
    ...publicModules
  ],
  exports: publicModules,
})
export class MaterialModule {
}
