import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import Topic from '../../topics/topic.interface';

@Injectable()
export class TopicsService {

  constructor(private http: Http) {
  }

  getTopics() {
    return this.http.get('https://uctalks.herokuapp.com/topics')
      .map(res => res.json());
  }

  addTopic(newTopic: Topic) {
    return this.http.post('https://uctalks.herokuapp.com/topics', {newTopicProps: newTopic})
      .map(res => res.json());
  }

  updateTopicById(id: string, updatedTopicProps: Object) {
    return this.http.put(`https://uctalks.herokuapp.com/topics/${id}`, { updatedTopicProps })
      .map(res => res.json());
  }
}
