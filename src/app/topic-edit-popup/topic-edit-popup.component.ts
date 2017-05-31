import { Component, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import Topic from '../topics/topic.interface';
import UpdatedTopicProps from '../topics/edited-topic-props.interface';
import User from '../user/user.interface';

interface InputData {
  topic: Topic;
  users: User[];
}

@Component({
  selector: 'app-topic-edit-popup',
  templateUrl: './topic-edit-popup.component.html',
  styleUrls: ['./topic-edit-popup.component.scss'],
})
export class TopicEditPopupComponent {
  public updatedTopicProps: UpdatedTopicProps;
  public edited = false;
  public minDate: Date | undefined;

  constructor(
    public dialogRef: MdDialogRef<TopicEditPopupComponent>,
    @Inject(MD_DIALOG_DATA) public data: InputData,
  ) {
    const { name, presentationDate, speakerId } = this.data.topic;
    this.updatedTopicProps = { name, presentationDate: presentationDate && new Date(presentationDate), speakerId };

    this.minDate = !this.data.topic.presented && new Date();
  }

  public closeDialog(isCanceled?: true): void {
    this.dialogRef.close(this.edited && !isCanceled ? this.updatedTopicProps : null);
  }

  public handleChange(userInput: FocusEvent | Date | string, property: keyof UpdatedTopicProps): void {
    const previousValue = this.updatedTopicProps[property];

    if (userInput instanceof FocusEvent) {
      userInput = (userInput.target as HTMLInputElement).value;
    }

    // if previous value was set and it differs from user's input OR if previous value was not set
    if (previousValue && previousValue.toString() !== userInput.toString() || !previousValue) {
      // update the object of updated props
      this.updatedTopicProps[property] = userInput;
      // and mark the topic as edited
      this.edited = true;
    }
  }

  public resetProperty(property: 'speakerId' | 'presentationDate') {
    // if previousValue was set, reset it to null and mark 'edited' flag as true
    if (this.updatedTopicProps[property]) {
      this.updatedTopicProps[property] = null;
      this.edited = true;
    }
  }
}
