import { Component, OnInit } from '@angular/core';
import {MdDialog, MdSnackBar} from '@angular/material';
import { TopicsService } from '../services/topics-service/topics.service';
import { AuthService } from '../services/auth-service/auth.service';
import { SpinnerService } from '../services/spinner-service/spinner.service';
import NewTopicProps from './new-topic-props.interface';
import Topic from './topic.interface';
import LikeDirection from './like-direction.type';
import {TopicPopupComponent} from '../topic-popup/topic-popup.component';

enum SortOrders { None, Ascending, Descending }

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss'],
})
export class TopicsComponent implements OnInit {
  public topics: Topic[];
  public minDate: Date = new Date();

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
    private topicsService: TopicsService,
    public auth: AuthService,
    private spinner: SpinnerService,
    private snackBar: MdSnackBar,
    private dialog: MdDialog,
  ) {}

  ngOnInit() {
    this.topicsService.getTopics()
      .subscribe(
        topics => {
          this.topics = TopicsComponent.sortTopics(topics, 'likes', 0);
        },
        error => {
          this.snackBar.open('Cannot receive topics', 'close', { duration: 3000 });
          this.spinner.toggleVisible(false);
          console.error(error);
        },
        () => this.spinner.toggleVisible(false),
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

  public like(direction: LikeDirection, id: string) {
    this.spinner.toggleVisible(true);

    this.topicsService.updateTopicLikesById(id, direction)
      .subscribe(
        updatedTopic => {
          this.topics = this.topics
            .map(topic => {
              if (topic._id === updatedTopic._id) {
                topic.likes = updatedTopic.likes;

                this.snackBar.open(`'${updatedTopic.name}' has been updated`, 'close', { duration: 3000 });
              }
              return topic;
            });
        },
        error => {
          this.snackBar.open('Cannot save changes', 'close', { duration: 3000 });
          this.spinner.toggleVisible(false);
          console.error(error);
        },
        () => this.spinner.toggleVisible(false),
      );
  }

  public onSelectionChange(val) {
    // @TODO find out what can be done
    console.log(val);
  }

  public onSortChange(val) {
    this.topics = TopicsComponent.sortTopics(this.topics, val.sortBy, val.sortType);
  }

  public openDialog() {
    const dialog = this.dialog.open(TopicPopupComponent);

    dialog.afterClosed().subscribe(newTopicProps => this.addTopic(newTopicProps));
  }
}
