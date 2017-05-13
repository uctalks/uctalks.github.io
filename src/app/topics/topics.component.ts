import {Component, OnInit} from '@angular/core';
import {TopicsService} from '../services/topics-service/topics.service';
import Topic from '../topic/topic.interface';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss'],
})
export class TopicsComponent implements OnInit {
  topics: Topic[];

  constructor(public topicsService: TopicsService) {
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
}
