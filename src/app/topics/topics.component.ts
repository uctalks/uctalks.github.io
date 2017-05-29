import { Component, OnInit } from '@angular/core';
import { MdDialog, MdSnackBar } from '@angular/material';
import { TopicsService } from '../services/topics-service/topics.service';
import { AuthService } from '../services/auth-service/auth.service';
import { SpinnerService } from '../services/spinner-service/spinner.service';
import NewTopicProps from './new-topic-props.interface';
import Topic from './topic.interface';
import { TopicPopupComponent } from '../topic-popup/topic-popup.component';

import { UserService } from '../services/user-service/user.service';
import User from '../user/user.interface';

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
    this.topicsService.getTopics()
      .subscribe(
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
    this.userService.getAllUsers()
      .subscribe(
        users => {
          this.users = users;
        },
        error => {
          this.snackBar.open('Cannot receive users', 'close', { duration: 3000 });
          console.error(error);
        },
      );
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

  public openDialog() {
    const dialog = this.dialog.open(TopicPopupComponent);

    dialog.afterClosed().subscribe(newTopicProps => this.addTopic(newTopicProps));
  }

  public updateTopicById(speakerId: string, topicId: string): void {
    this.topicsService.updateTopicById(topicId, { speakerId })
      .subscribe(updatedTopic => {
        this.topics = this.topics.map(topic => topic._id === updatedTopic._id ? updatedTopic : topic);
      })
  }
}
