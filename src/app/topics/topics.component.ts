import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { TopicsService } from '../services/topics-service/topics.service';
import { Auth } from '../services/auth-service/auth.service';
import { SpinnerService } from '../services/spinner-service/spinner.service';
import NewTopicProps from './new-topic-props.interface';
import Topic from './topic.interface';
import VoteDirection from './vote-direction.type';

enum SortOrders { None, Ascending, Descending }

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss'],
})
export class TopicsComponent implements OnInit {
  public topics: Topic[];

  static sortTopics(topics: Topic[], sortField: 'name' | 'points', sortOrder: SortOrders): Topic[] {
    switch (sortOrder) {
      case SortOrders.None:
        return topics;

      case SortOrders.Ascending:
        switch (sortField) {
          case 'name':
            return topics.sort((a: Topic, b: Topic): SortOrders => TopicsComponent.compareStrings(a.name, b.name));

          case 'points':
            return topics.sort((a: Topic, b: Topic): SortOrders => TopicsComponent.compareNumbers(a.points, b.points));
        }
        break;

      case SortOrders.Descending:
        switch (sortField) {
          case 'name':
            return topics.sort((a: Topic, b: Topic): SortOrders => TopicsComponent.compareStrings(b.name, a.name));

          case 'points':
            return topics.sort((a: Topic, b: Topic): SortOrders => TopicsComponent.compareNumbers(b.points, a.points));
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
    public auth: Auth,
    private spinner: SpinnerService,
    private snackBar: MdSnackBar,
  ) {}

  ngOnInit() {
    this.topicsService.getTopics()
      .subscribe(
        topics => {
          this.topics = TopicsComponent.sortTopics(topics, 'points', 0);
        },
        error => {
          this.snackBar.open('Cannot receive topics', 'close', { duration: 3000 });
          this.spinner.toggleVisible(false);
          console.error(error);
        },
        () => this.spinner.toggleVisible(false),
      );
  }

  addTopic(newTopicProps: NewTopicProps) {
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

  vote(direction: VoteDirection, id: string) {
    this.spinner.toggleVisible(true);

    this.topicsService.updateTopicPointsById(id, direction)
      .subscribe(
        updatedTopic => {
          this.topics = this.topics
            .map(topic => {
              if (topic._id === updatedTopic._id) {
                topic.points = updatedTopic.points;

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

  onSelectionChange(val) {
    // @TODO find out what can be done
    console.log(val);
  }

  onSortChange(val) {
    this.topics = TopicsComponent.sortTopics(this.topics, val.sortBy, val.sortType);
  }
}
