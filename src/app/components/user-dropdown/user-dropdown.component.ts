import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MdSelectChange } from '@angular/material';
import User from '../user/user.interface';

@Component({
  selector: 'app-user-dropdown',
  template: `
    <md-select
      name="user"
      placeholder="Speaker"
      [floatPlaceholder]="floatPlaceholder || 'never'"
      [disabled]="disabled"
      [(ngModel)]="selectedSpeakerId"
      [required]="required"
      (change)="emitSpeakerSelectEvent($event)">
      <md-option *ngFor="let user of users" [value]="user._id">
        {{user.name}}
      </md-option>
    </md-select>
  `,
})
export class UserDropdownComponent {
  @Input() users: User[];
  @Input() selectedSpeakerId: string;
  @Input() disabled: boolean;
  @Input() floatPlaceholder: 'always' | 'auto' | 'never';
  @Input() required: true | undefined;
  @Output() speakerSelected: EventEmitter<string>;

  constructor() {
    this.speakerSelected = new EventEmitter();
  }

  public emitSpeakerSelectEvent(event: MdSelectChange): void {
    this.speakerSelected.emit(event.value);
  }
}
