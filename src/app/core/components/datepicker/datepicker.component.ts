import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-datepicker',
  template: `
    <mat-input-container>
      <input
        title="Date-picker"
        matInput
        [matDatepicker]="picker"
        [min]="minDate"
        [placeholder]="(alwaysShowPlaceholder || !selectedDate) && 'Choose a date'"
        [disabled]="disabled"
        [value]="date"
        [required]="required"
        (blur)="emitChangeEvent($event)">
      <mat-datepicker-toggle [for]="picker" [disabled]="disabled"></mat-datepicker-toggle>
    </mat-input-container>
    <mat-datepicker #picker (selectedChanged)="emitChangeEvent($event)"></mat-datepicker>
  `,
})
export class DatepickerComponent implements OnInit {
  @Input() disabled: boolean;
  @Input() minDate: Date;
  @Input() selectedDate: string;
  @Input() alwaysShowPlaceholder: true;
  @Input() required: true | undefined;

  @Output() dateChanged: EventEmitter<Date>;

  public date: any;

  constructor() {
    this.dateChanged = new EventEmitter();
  }

  ngOnInit() {
    const selectedDate: false | Date = !!this.selectedDate && new Date(this.selectedDate);

    // if selectedDate is provided, assign to 'date' (default input value)
    this.date = selectedDate ? selectedDate : null;
  }

  public emitChangeEvent(userInput: Date | FocusEvent): void {
    if (userInput instanceof FocusEvent) {
      // if userInput is FocusEvent (user typed the date by hand), prepare the date
      const date = new Date((userInput.target as HTMLInputElement).value);

      // if date is correctly initialized, emit dateChanged event
      date.toString() !== 'Invalid Date' && this.dateChanged.emit(date);
    } else if (userInput instanceof Date) {
      // if userInput is proper Date (clicked date in the datepicker), emit dateChanged event with userInput itself
      this.dateChanged.emit(userInput);
    }
  }
}
