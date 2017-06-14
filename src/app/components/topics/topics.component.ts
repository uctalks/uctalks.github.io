import { Component, Input, OnInit } from '@angular/core';
import { MdCheckboxChange, MdDialog, MdSnackBar } from '@angular/material';
import { TopicsService } from '../../services/topics-service/topics.service';
import { AuthService } from '../../services/auth-service/auth.service';
import { SpinnerService } from '../../services/spinner-service/spinner.service';
import NewTopicProps from './new-topic-props.interface';
import Topic from '../../models/topic';

import { UserService } from '../../services/user-service/user.service';
import User from '../user/user.interface';
import { TopicDeletePopupComponent } from '../topic-delete-popup/topic-delete-popup.component';
import { TopicAddOrEditPopupComponent } from '../topic-add-or-edit-popup/topic-add-or-edit-popup.component';
import TopicProps from './topic-props.interface';

enum SortOrders { Descending = 1, Ascending }

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss'],
})
export class TopicsComponent implements OnInit {
  @Input() topics: Topic[];

  public minDate: Date = new Date();
  public users: User[];

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
    public auth: AuthService,
    private topicsService: TopicsService,
    private userService: UserService,
    private spinner: SpinnerService,
    private snackBar: MdSnackBar,
    private dialog: MdDialog,
  ) {}

  ngOnInit() {
    // load topics
    // this.topicsService.getTopics().subscribe(
    //   topics => {
    //     this.topics = TopicsComponent.sortTopics(topics, 'likes', SortOrders.Ascending);
    //
    //     // when the user's details are received, check what topics were already liked by this user
    //     this.auth.profileDetailsReceived$.subscribe(authenticated => {
    //       // check what topics were liked, if user is authenticated and there are at least one topic in topics array
    //       if (authenticated && this.topics && this.topics.length) {
    //         this.topics = TopicsComponent.checkIfTopicsAreLiked(this.topics, this.auth.userProfileId);
    //       }
    //     });
    //   },
    //   error => {
    //     this.snackBar.open('Cannot receive topics', 'close', { duration: 3000 });
    //     this.spinner.toggleVisible(false);
    //     console.error(error);
    //   },
    //   () => this.spinner.toggleVisible(false),
    // );

    // in background load list of users
    this.userService.getAllUsers().subscribe(
      users => {
        this.users = users;

        this.auth.newLogin$.subscribe((newLoginData: User) => {
          // if new login occurs
          if (newLoginData) {
            const userLoggenInBefore: User | undefined = this.users.find(user => user._id === newLoginData._id);

            this.users = userLoggenInBefore
              // if user logged-in before, update the data
              ? this.users.map(user => user._id === newLoginData._id ? newLoginData : user)
              // if user logged-in for the first time, add the data
              : [...this.users, newLoginData];
          }
        });
      },
      error => {
        this.snackBar.open('Cannot receive users', 'close', { duration: 3000 });
        console.error(error);
      },
    );
  }

  public like(liked: boolean, id: string) {
    this.spinner.toggleVisible(true);

    this.topicsService.updateTopicLikesById(id, liked, this.auth.userProfileId)
      .subscribe(
        updatedTopic => {
          this.topics = this.topics
            .map(topic => {
              if (topic._id === updatedTopic._id) {
                // if user liked the topic, mark the topic as liked by this user
                updatedTopic.likedByUser = liked;
                return updatedTopic;
              }
              return topic;
            });

          this.snackBar.open(`'${updatedTopic.name}' has been updated`, 'close', { duration: 3000 });
        },
        error => {
          this.snackBar.open('Cannot save changes', 'close', { duration: 3000 });
          this.spinner.toggleVisible(false);
          console.error(error);
        },
        () => this.spinner.toggleVisible(false),
      );
  }

  public onSortChange(val) {
    this.topics = TopicsComponent.sortTopics(this.topics, val.sortBy, val.sortType);
  }

  public openAddTopicDialog() {
    const dialog = this.dialog.open(TopicAddOrEditPopupComponent, { data: { users: this.users } });

    dialog.afterClosed().subscribe(newTopicProps => newTopicProps && this.addTopic(newTopicProps));
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

  public openEditTopicDialog(id: string) {
    const dialog = this.dialog.open(TopicAddOrEditPopupComponent, {
      data: {
        topic: this.topics.find(topic => topic._id === id),
        users: this.users,
      },
    });

    dialog.afterClosed().subscribe(updatedTopicProps => {
      updatedTopicProps && this.updateTopicProps(id, updatedTopicProps)
    });
  }

  public openDeleteTopicDialog(id: string) {
    const dialog = this.dialog.open(TopicDeletePopupComponent);

    dialog.afterClosed().subscribe(toBeDeleted => toBeDeleted && this.deleteTopic(id));
  }

  private addTopic(newTopicProps: NewTopicProps) {
    this.spinner.toggleVisible(true);

    this.topicsService.addTopic(newTopicProps)
      .subscribe(
        addedTopic => {
          this.topics.push(addedTopic);
          this.snackBar.open('New topic saved', 'close', { duration: 3000 });
        },
        error => {
          this.snackBar.open('Cannot add new topic', 'close', { duration: 3000 });
          this.spinner.toggleVisible(false);
          console.error(error);
        },
        () => this.spinner.toggleVisible(false),
      );
  }

  private deleteTopic(id: string) {
    this.spinner.toggleVisible(true);

    this.topicsService.deleteTopic(id)
      .subscribe(
        deletedTopic => {
          this.topics = this.topics.filter(topic => topic._id !== deletedTopic._id);
          this.snackBar.open('Topic deleted', 'close', { duration: 3000 });
        },
        error => {
          this.snackBar.open('Cannot delete topic', 'close', { duration: 3000 });
          this.spinner.toggleVisible(false);
          console.error(error);
        },
        () => this.spinner.toggleVisible(false),
      );
  }

  private updateTopicProps(topicId: string, updatedTopicProps: TopicProps ): void {
    this.spinner.toggleVisible(true);

    this.topicsService.updateTopicById(topicId, updatedTopicProps).subscribe(
      updatedTopic => {
        this.topics = this.topics.map(topic => {
          if (topic._id === updatedTopic._id) {
            // if user liked the topic, mark the topic as liked by this user
            updatedTopic.likedByUser = updatedTopic.usersLikedIds.includes(this.auth.userProfileId);
            return updatedTopic;
          }
          return topic;
        });
        this.snackBar.open(`'${updatedTopic.name}' has been updated`, 'close', { duration: 3000 });
      },
      error => {
        this.snackBar.open('Cannot update topic', 'close', { duration: 3000 });
        this.spinner.toggleVisible(false);
        console.error(error);
      },
      () => this.spinner.toggleVisible(false),
    );
  }
}
