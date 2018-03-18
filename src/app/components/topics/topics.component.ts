import { Component, Input } from '@angular/core';
import { MatCheckboxChange } from '@angular/material';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers/';
import Topic from '../../models/topic';
import User from '../../models/user';
import TopicProps from './topic-props.interface';
import * as topicsActions from '../../actions/topics';
import { TopicsSortBy, TopicsSortTypes } from '../../topics/types';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss'],
})
export class TopicsComponent {
  @Input() public topics: Topic[];
  @Input() public users: User[];
  @Input() public currentUserId: string;

  public minDate: Date = new Date();

  constructor(private store: Store<fromRoot.State>) {}

  public like(liked: boolean, topicId: string) {
    this.store.dispatch(new topicsActions.LikeAction({ topicId, liked, userId: this.currentUserId }));
  }

  public onSortChange(val: { sortBy: TopicsSortBy, sortType: TopicsSortTypes }) {
    this.store.dispatch(new topicsActions.SortTopicsAction(val));
  }

  public openAddTopicDialog() {
    this.store.dispatch(new topicsActions.OpenAddTopicModalAction());
  }

  public handleInputChange(
    userInput: MatCheckboxChange | FocusEvent | Date | boolean | string, property: keyof TopicProps,
    id: string,
  ) {
    const previousValue = this.topics.find(topic => topic._id === id)[property];

    if (userInput instanceof FocusEvent) {
      userInput = (userInput.target as HTMLInputElement).value;
    } else if (userInput instanceof MatCheckboxChange) {
      userInput = userInput.checked;
    }

    // if previous value was set and it differs from user's input OR if previous value was not set
    if (previousValue
      && new Date(previousValue.toString()).toString() !== userInput.toString()
      || (!previousValue && userInput !== null)) {
      // update the topic's props
      this.updateTopicProps(id, { [property]: userInput });
    }
  }

  public openEditTopicDialog(topic: Topic) {
    this.store.dispatch(new topicsActions.OpenEditTopicModalAction({ topic }));
  }

  public openDeleteTopicDialog(id: string) {
    this.store.dispatch(new topicsActions.OpenDeleteTopicModalAction({ id }));
  }

  private updateTopicProps(id: string, updatedTopicProps: TopicProps ): void {
    this.store.dispatch(new topicsActions.UpdateTopicAction({ id, updatedTopicProps }));
  }
}
