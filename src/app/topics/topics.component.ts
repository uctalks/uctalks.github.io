import { Component, OnInit } from '@angular/core';
import { MdDialog, MdSnackBar } from '@angular/material';
import { TopicsService } from '../services/topics-service/topics.service';
import { AuthService } from '../services/auth-service/auth.service';
import { SpinnerService } from '../services/spinner-service/spinner.service';
import NewTopicProps from './new-topic-props.interface';
import Topic from './topic.interface';
import { TopicAddPopupComponent } from '../topic-add-popup/topic-add-popup.component';

import { UserService } from '../services/user-service/user.service';
import User from '../user/user.interface';
import { TopicDeletePopupComponent } from '../topic-delete-popup/topic-delete-popup.component';
import { TopicEditPopupComponent } from '../topic-edit-popup/topic-edit-popup.component';
import UpdatedTopicProps from './edited-topic-props.interface';

enum SortOrders { None, Descending, Ascending }

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss'],
})
export class TopicsComponent implements OnInit {
  public topics: Topic[];
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

  static sortTopics(topics: Topic[], sortField: 'name' | 'likes', sortOrder: SortOrders): Topic[] {
    switch (sortOrder) {
      case SortOrders.None:
        return topics;

      case SortOrders.Ascending:
        switch (sortField) {
          case 'name':
            return topics.sort((a: Topic, b: Topic): SortOrders => TopicsComponent.compareStrings(a.name, b.name));

          case 'likes':
            return topics.sort((a: Topic, b: Topic): SortOrders => TopicsComponent.compareNumbers(a.likes, b.likes));
        }
        break;

      case SortOrders.Descending:
        switch (sortField) {
          case 'name':
            return topics.sort((a: Topic, b: Topic): SortOrders => TopicsComponent.compareStrings(b.name, a.name));

          case 'likes':
            return topics.sort((a: Topic, b: Topic): SortOrders => TopicsComponent.compareNumbers(b.likes, a.likes));
        }
    }
  }

  static compareNumbers(a: number, b: number): SortOrders {
    return b - a;
  }

  static compareStrings(a: string, b: string): SortOrders {
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
    this.topicsService.getTopics().subscribe(
      topics => {
        this.topics = TopicsComponent.sortTopics(topics, 'likes', SortOrders.Ascending);

        // when the user's details are received, check what topics were already liked by this user
        this.auth.profileDetailsReceived$.subscribe(authenticated => {
          // check what topics were liked, if user is authenticated and there are at least one topic in topics array
          if (authenticated && this.topics && this.topics.length) {
            this.topics = TopicsComponent.checkIfTopicsAreLiked(this.topics, this.auth.userProfileId);
          }
        });
      },
      error => {
        this.snackBar.open('Cannot receive topics', 'close', { duration: 3000 });
        this.spinner.toggleVisible(false);
        console.error(error);
      },
      () => this.spinner.toggleVisible(false),
    );

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
    const dialog = this.dialog.open(TopicAddPopupComponent);

    dialog.afterClosed().subscribe(newTopicProps => this.addTopic(newTopicProps));
  }

  public handleInputChange(userInput: FocusEvent | Date | string, property: keyof UpdatedTopicProps, id: string) {
    const previousValue = this.topics.find(topic => topic._id === id)[property];

    if (userInput instanceof FocusEvent) {
      userInput = (userInput.target as HTMLInputElement).value;
    }

    // if previous value was set and it differs from user's input OR if previous value was not set
    if (previousValue && new Date(previousValue).toString() !== userInput.toString() || (!previousValue && userInput)) {
      // update the topic's props
      this.updateTopicProps(id, { [property]: userInput });
    }
  }

  public openEditTopicDialog(id: string) {
    const dialog = this.dialog.open(TopicEditPopupComponent, {
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

    dialog.afterClosed().subscribe(toBeDeleted => this.deleteTopic(id));
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

  private updateTopicProps(topicId: string, updatedTopicProps: UpdatedTopicProps ): void {
    this.spinner.toggleVisible(true);

    this.topicsService.updateTopicById(topicId, updatedTopicProps).subscribe(
      updatedTopic => {
        this.topics = this.topics.map(topic => topic._id === updatedTopic._id ? updatedTopic : topic);
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
