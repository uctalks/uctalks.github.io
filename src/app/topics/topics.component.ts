import {Component, OnInit} from '@angular/core';
import {TopicsService} from '../services/topics-service/topics.service';
import {Auth} from '../services/auth-service/auth.service';
import Topic from './topic.interface';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss'],
})
export class TopicsComponent implements OnInit {
  topics: Topic[];

  constructor(public topicsService: TopicsService, public auth: Auth) {
  }

  ngOnInit() {
    this.topicsService.getTopics()
      .subscribe(
        topics => {
          this.topics = topics;
        },
        error => console.log(error),
        () => console.log('done')
      );
  }

  addTopic(newTopic: Topic) {
    this.topicsService.addTopic(newTopic)
      .subscribe(addedTopic => this.topics.push(addedTopic));
  }

  // @TODO refactor voting mechanism
  vote(direction: string, id: string) {
    const points = this.topics.find(topic => topic._id === id).points + direction === 'up' ? 1 : -1;

    this.topicsService.updateTopicById(id, { points })
      .subscribe(updatedTopic => {
        this.topics = this.topics.map(topic => {
          if (topic._id === updatedTopic.id) {
            topic.points = updatedTopic.points;
          }
          return topic;
        })
      });
  }
}
