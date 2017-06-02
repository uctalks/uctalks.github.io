import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-topic-add-popup',
  templateUrl: './topic-add-popup.component.html',
  styleUrls: ['./topic-add-popup.component.scss'],
})
export class TopicAddPopupComponent {
  newTopicProps = { name: '' };

  constructor(public dialogRef: MdDialogRef<TopicAddPopupComponent>) { }

  close() {
    this.dialogRef.close(this.newTopicProps);
  }
}
