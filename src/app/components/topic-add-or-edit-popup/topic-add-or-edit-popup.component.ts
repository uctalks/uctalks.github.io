import { Component, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdCheckboxChange, MdDialogRef } from '@angular/material';
import Topic from '../../models/topic';
import TopicProps from '../topics/topic-props.interface';
import NewTopicProps from '../topics/new-topic-props.interface';
import { UsefulLink } from '../topics/useful-link.interface';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../reducers/';
import {CloseAddTopicModalAction, CloseAllModals, CloseEditTopicModalAction} from '../../actions/topics';
import {Observable} from 'rxjs/Observable';
import User from '../../models/user';

@Component({
  selector: 'app-topic-add-or-edit-popup',
  templateUrl: './topic-add-or-edit-popup.component.html',
  styleUrls: ['./topic-add-or-edit-popup.component.scss'],
})
export class TopicAddOrEditPopupComponent {
  public topicProps: TopicProps;
  public edited = false;
  public invalid = true;
  public minDate: Date | undefined;
  public newUsefulLink: UsefulLink = { description: '', link: '' };
  public users$: Observable<User[]>;

  constructor(
    public dialogRef: MdDialogRef<TopicAddOrEditPopupComponent>,
    private store: Store<fromRoot.State>,
    @Inject(MD_DIALOG_DATA) public data: { topic?: Topic },
  ) {
    if (this.data && this.data.topic) {
      // set initial properties in 'edit' mode
      const { linkToSlides, name, presentationDate, presented, speakerId, usefulLinks } = this.data.topic;
      this.topicProps = {
        linkToSlides,
        name,
        presentationDate: presentationDate && new Date(presentationDate),
        presented,
        speakerId,
        usefulLinks,
      }
    } else {
      // set minDate in 'add' mode
      this.minDate = new Date();
    }

    this.users$ = store.select(fromRoot.getUsers);
  }

  public closeDialog(isCanceled?: true): void {
    // this.dialogRef.close(this.edited && !isCanceled ? this.topicProps : null);
    this.edited && !isCanceled
    ? this.data && this.data.topic
      ? this.store.dispatch(new CloseEditTopicModalAction({ updatedTopicProps: this.topicProps, id: this.data.topic._id }))
      : this.store.dispatch(new CloseAddTopicModalAction({ newTopicProps: (this.topicProps as NewTopicProps) }))
    : this.store.dispatch(new CloseAllModals());
  }

  public handleChange(userInput: FocusEvent | MdCheckboxChange | Date | string | boolean, property: keyof TopicProps): void {
    const previousValue = this.topicProps && this.topicProps[property];

    if (userInput instanceof FocusEvent) {
      userInput = (userInput.target as HTMLInputElement).value;
    } else if (userInput instanceof MdCheckboxChange) {
      userInput = userInput.checked;
    }

    // if previous value was set and it differs from user's input OR if previous value was not set
    if (previousValue && previousValue.toString() !== userInput.toString() || !previousValue) {
      // update the object of updated props
      if (this.topicProps) {
        this.topicProps[property] = userInput;
      } else {
        this.topicProps = { [property]: userInput };
      }
      // and mark the topic as edited
      this.edited = true;
    }

    this.invalid = this.topicProps.presented
      && !(this.topicProps.speakerId && this.topicProps.presentationDate);
  }

  public updateUsefulLinks(userInput: FocusEvent, property: keyof UsefulLink, usefulLink: string) {
    const _userInput = (userInput.target as HTMLInputElement).value;

    const usefulLinkToBeUpdated = this.topicProps.usefulLinks.find(_usefulLink => _usefulLink.link === usefulLink);

    if (usefulLinkToBeUpdated && usefulLinkToBeUpdated[property] !== _userInput) {
      usefulLinkToBeUpdated[property] = _userInput;
      this.edited = true;
    }
  }

  public resetProperty(property: 'speakerId' | 'presentationDate') {
    // if previousValue was set, reset it to null and mark 'edited' flag as true
    if (this.topicProps[property]) {
      this.topicProps[property] = null;
      this.edited = true;
    }
  }

  public addUsefulLink(): void {
    if (this.topicProps.usefulLinks && this.topicProps.usefulLinks.length) {
      this.topicProps.usefulLinks = [this.newUsefulLink, ...this.topicProps.usefulLinks];
    } else {
      this.topicProps.usefulLinks = [this.newUsefulLink];
    }
    this.edited = true;
    this.newUsefulLink = { description: '', link: '' };
  }

  public deleteUsefulLink(link: string): void {
    this.topicProps.usefulLinks = this.topicProps.usefulLinks.filter(usefulLink => {
      return usefulLink.link !== link;
    });
    this.edited = true;
  }
}
