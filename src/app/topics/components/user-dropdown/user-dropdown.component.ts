import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material';
import { IUser } from '../../models/user';

@Component({
  selector: 'app-user-dropdown',
  template: `
    <mat-select
      name="user"
      placeholder="Speaker"
      [disabled]="disabled"
      [(ngModel)]="selectedSpeakerId"
      [required]="required"
      (change)="emitSpeakerSelectEvent($event)">
      <mat-option *ngFor="let user of users" [value]="user._id">
        {{user.name}}
      </mat-option>
    </mat-select>
  `,
})
export class UserDropdownComponent {
  @Input() users: ReadonlyArray<IUser>;
  @Input() selectedSpeakerId: string;
  @Input() disabled: boolean;
  @Input() required: true | undefined;
  @Output() speakerSelected: EventEmitter<string>;

  constructor() {
    this.speakerSelected = new EventEmitter();
  }

  public emitSpeakerSelectEvent(event: MatSelectChange): void {
    this.speakerSelected.emit(event.value);
  }
}
