import { Component, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdCheckboxChange, MdDialogRef } from '@angular/material';
import Topic from '../topics/topic.interface';
import UpdatedTopicProps from '../topics/edited-topic-props.interface';
import User from '../user/user.interface';

interface InputData {
  topic?: Topic; // no topic in 'add' mode
  users: User[];
}

@Component({
  selector: 'app-topic-add-or-edit-popup',
  templateUrl: './topic-add-or-edit-popup.component.html',
  styleUrls: ['./topic-add-or-edit-popup.component.scss'],
})
export class TopicAddOrEditPopupComponent {
  public updatedTopicProps: UpdatedTopicProps;
  public edited = false;
  public invalid = true;
  public minDate: Date | undefined;

  constructor(
    public dialogRef: MdDialogRef<TopicAddOrEditPopupComponent>,
    @Inject(MD_DIALOG_DATA) public data: InputData,
  ) {
    if (this.data.topic) {
      // set initial properties in 'edit' mode
      const { name, presentationDate, presented, speakerId } = this.data.topic;
      this.updatedTopicProps = { name, presentationDate: presentationDate && new Date(presentationDate), presented, speakerId };
    } else {
      // set minDate in 'add' mode
      this.minDate = new Date();
    }
  }

  public closeDialog(isCanceled?: true): void {
    this.dialogRef.close(this.edited && !isCanceled ? this.updatedTopicProps : null);
  }

  public handleChange(userInput: FocusEvent | MdCheckboxChange | Date | string | boolean, property: keyof UpdatedTopicProps): void {
    const previousValue = this.updatedTopicProps && this.updatedTopicProps[property];

    if (userInput instanceof FocusEvent) {
      userInput = (userInput.target as HTMLInputElement).value;
    } else if (userInput instanceof MdCheckboxChange) {
      userInput = userInput.checked;
    }

    // if previous value was set and it differs from user's input OR if previous value was not set
    if (previousValue && previousValue.toString() !== userInput.toString() || !previousValue) {
      // update the object of updated props
      if (this.updatedTopicProps) {
        this.updatedTopicProps[property] = userInput;
      } else {
        this.updatedTopicProps = { [property]: userInput };
      }
      // and mark the topic as edited
      this.edited = true;
    }

    this.invalid = this.updatedTopicProps.presented
      && !(this.updatedTopicProps.speakerId && this.updatedTopicProps.presentationDate);
  }

  public resetProperty(property: 'speakerId' | 'presentationDate') {
    // if previousValue was set, reset it to null and mark 'edited' flag as true
    if (this.updatedTopicProps[property]) {
      this.updatedTopicProps[property] = null;
      this.edited = true;
    }
  }
}
