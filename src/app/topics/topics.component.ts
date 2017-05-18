import {Component, OnInit} from '@angular/core';
import {MdSnackBar} from '@angular/material';
import {TopicsService} from '../services/topics-service/topics.service';
import {Auth} from '../services/auth-service/auth.service';
import {SpinnerService} from '../services/spinner-service/spinner.service';
import NewTopicProps from './new-topic-props.interface';
import Topic from './topic.interface';
import VoteDirection from './vote-direction.type';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss'],
})
export class TopicsComponent implements OnInit {
  topics: Topic[];

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
          this.topics = topics;
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
}
