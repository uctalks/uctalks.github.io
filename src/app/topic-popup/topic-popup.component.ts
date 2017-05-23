import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-topic-popup',
  templateUrl: './topic-popup.component.html',
  styleUrls: ['./topic-popup.component.scss'],
})
export class TopicPopupComponent {
  newTopicProps = { name: '' };

  constructor(public dialogRef: MdDialogRef<TopicPopupComponent>) { }

  close() {
    console.log(this.newTopicProps);
    this.dialogRef.close(this.newTopicProps);
  }
}
