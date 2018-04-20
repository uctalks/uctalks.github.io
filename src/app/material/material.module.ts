import { NgModule } from '@angular/core';
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
import { CommonModule } from '@angular/common';

const publicModules = [
  MatIconModule,
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatTooltipModule,
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
    ...publicModules,
    CommonModule,
  ],
  exports: publicModules,
})
export class MaterialModule {
}
