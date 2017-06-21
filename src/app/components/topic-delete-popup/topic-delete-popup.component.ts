import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-topic-delete-popup',
  template: `
    <h1 md-dialog-title>Are you sure you want to completely remove the topic?</h1>
    <form>
      <md-dialog-actions>
        <button md-button (click)="close(true)">Yes</button>
        <button md-button (click)="close(false)">No</button>
      </md-dialog-actions>
    </form>
  `,
  styleUrls: ['./topic-delete-popup.component.scss'],
})
export class TopicDeletePopupComponent {

  constructor(public dialogRef: MdDialogRef<TopicDeletePopupComponent>) { }

  close(toBeDeleted: boolean) {
    this.dialogRef.close(toBeDeleted);
  }
}
