import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-topic-delete-popup',
  templateUrl: './topic-delete-popup.component.html',
  styleUrls: ['./topic-delete-popup.component.scss'],
})
export class TopicDeletePopupComponent {

  constructor(public dialogRef: MdDialogRef<TopicDeletePopupComponent>) { }

  close(toBeDeleted: boolean) {
    this.dialogRef.close(toBeDeleted);
  }
}
