import { Component, Input, OnInit } from '@angular/core';
import { MdCheckboxChange, MdDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers/';
import { TopicsService } from '../../services/topics-service/topics.service';
import Topic from '../../models/topic';
import User from '../../models/user';
import TopicProps from './topic-props.interface';
import * as topicsActions from '../../actions/topics';

enum SortOrders { Descending = 1, Ascending }

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss'],
})
export class TopicsComponent implements OnInit {
  @Input() public topics: Topic[];
  @Input() public users: User[];
  @Input() public currentUserId: string;

  public minDate: Date = new Date();

  // update 'likedByUser' property of every topic
  static checkIfTopicsAreLiked(topics: Topic[], userId: string | null) {
    return topics.map(topic => {
      // set true (false) if userId is (not) in array of users, who liked this topic
      topic.likedByUser = topic.usersLikedIds.includes(userId);
      return topic;
    })
  }

  static sortTopics(
    topics: Topic[],
    sortField: 'name' | 'likes' | 'presentationDate' | 'speakerId' | 'presented',
    sortOrder: SortOrders,
  ): Topic[] {
    switch (sortOrder) {
      case SortOrders.Descending:
        switch (sortField) {
          case 'name':
          case 'presentationDate':
          case 'speakerId':
            return topics.sort((a: Topic, b: Topic) => TopicsComponent.compareStrings(a[sortField], b[sortField]));

          case 'likes':
          case 'presented':
            return topics.sort((a: Topic, b: Topic) => TopicsComponent.compareBoolsOrNumbers(a[sortField], b[sortField]));

          default:
            return topics;
        }

      case SortOrders.Ascending:
        switch (sortField) {
          case 'name':
          case 'presentationDate':
          case 'speakerId':
            return topics.sort((a: Topic, b: Topic) => TopicsComponent.compareStrings(b[sortField], a[sortField]));

          case 'likes':
          case 'presented':
            return topics.sort((a: Topic, b: Topic) => TopicsComponent.compareBoolsOrNumbers(b[sortField], a[sortField]));

          default:
            return topics;
        }

      default:
        return topics;
    }
  }

  static compareBoolsOrNumbers(a: boolean | number, b: boolean | number) {
    return Number(b) - Number(a);
  }

  static compareStrings(a: string, b: string) {
    if (a === undefined && b === undefined) {
      return 0;
    } else if (a === undefined && b !== undefined) {
      return 1;
    } else if (a !== undefined && b === undefined) {
      return -1;
    }

    a = a.toLowerCase();
    b = b.toLowerCase();
    return b > a ? 1 : b === a ? 0 : -1;
  }

  constructor(
    private topicsService: TopicsService,
    private dialog: MdDialog,
    private store: Store<fromRoot.State>,
  ) {}

  ngOnInit() {
    // this.topicsService.getTopics().subscribe(
    //   topics => {
    // @TODO implement sorting in reselect
    //     this.topics = TopicsComponent.sortTopics(topics, 'likes', SortOrders.Ascending);
    //
    //     // when the user's details are received, check what topics were already liked by this user
    //     this.auth.profileDetailsReceived$.subscribe(authenticated => {
    //       // check what topics were liked, if user is authenticated and there are at least one topic in topics array
    //       if (authenticated && this.topics && this.topics.length) {
    // @TODO implement `liked` check
    //         this.topics = TopicsComponent.checkIfTopicsAreLiked(this.topics, this.auth.userProfileId);
    //       }
    //     });
    //   },
    // );

    // in background load list of users
    // this.userService.getAllUsers().subscribe(
    //   users => {
    //     this.users = users;
    //
    //     // @TODO implement check of user's log-in
    //     this.auth.newLogin$.subscribe((newLoginData: User) => {
    //       // if new login occurs
    //       if (newLoginData) {
    //         const userLoggenInBefore: User | undefined = this.users.find(user => user._id === newLoginData._id);
    //
    //         this.users = userLoggenInBefore
    //           // if user logged-in before, update the data
    //           ? this.users.map(user => user._id === newLoginData._id ? newLoginData : user)
    //           // if user logged-in for the first time, add the data
    //           : [...this.users, newLoginData];
    //       }
    //     });
    //   },
    // );
  }

  public like(liked: boolean, topicId: string) {
    this.store.dispatch(new topicsActions.LikeAction({ topicId, liked, userId: this.currentUserId }));
  }

  public onSortChange(val) {
    this.topics = TopicsComponent.sortTopics(this.topics, val.sortBy, val.sortType);
  }

  public openAddTopicDialog() {
    this.store.dispatch(new topicsActions.OpenAddTopicModalAction());
  }

  public handleInputChange(
    userInput: MdCheckboxChange | FocusEvent | Date | boolean | string, property: keyof TopicProps,
    id: string,
  ) {
    const previousValue = this.topics.find(topic => topic._id === id)[property];

    if (userInput instanceof FocusEvent) {
      userInput = (userInput.target as HTMLInputElement).value;
    } else if (userInput instanceof MdCheckboxChange) {
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
