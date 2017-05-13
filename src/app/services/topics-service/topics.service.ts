import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import Topic from '../../topic/topic.interface';

@Injectable()
export class TopicsService {

  constructor(private http: Http) {
  }

  getTopics() {
    return this.http.get('https://uctalks.herokuapp.com/topics')
      .map(res => res.json());
  }

  addTopic(newTopic: Topic) {
    console.log('2');
    return this.http.post('https://uctalks.herokuapp.com/topics', {newTopicProps: newTopic},)
      .map(res => res.json());
  }
}
