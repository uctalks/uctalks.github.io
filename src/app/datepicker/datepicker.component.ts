import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-datepicker',
  template: `
    <md-input-container>
      <input
        title="Date-picker"
        mdInput
        [mdDatepicker]="picker"
        [min]="minDate"
        [placeholder]="!selectedDate && 'Choose a date'"
        [disabled]="disabled"
        [value]="date"
        (blur)="emitChangeEvent($event)">
      <button mdSuffix [mdDatepickerToggle]="picker" [disabled]="disabled"></button>
    </md-input-container>
    <md-datepicker #picker (selectedChanged)="emitChangeEvent($event)"></md-datepicker>
  `,
})
export class DatepickerComponent implements OnInit {
  @Input() disabled: boolean;
  @Input() minDate: Date;
  @Input() selectedDate: string;

  @Output() dateChanged: EventEmitter<Date>;

  public date: any;

  constructor() {
    this.dateChanged = new EventEmitter();
  }

  ngOnInit() {
    const selectedDate = new Date(this.selectedDate);

    // if selectedDate is provided, assign to 'date' (default input value)
    if (selectedDate) {
      this.date = selectedDate;
    }
  }

  public emitChangeEvent(userInput: Date): void {
    // if userInput is proper date, emit dateChanged event
    userInput instanceof Date && this.dateChanged.emit(userInput);
  }
}
