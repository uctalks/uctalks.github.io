import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import NewTopicProps from '../../topics/new-topic-props.interface';
import VoteDirection from '../../topics/vote-direction.type';
import { Observable } from 'rxjs/Observable';
import Topic from '../../topics/topic.interface';

@Injectable()
export class TopicsService {

  constructor(private http: Http) {
  }

  getTopics() {
    return this.http.get('https://uctalks.herokuapp.com/topics')
      .map(res => res.json());
  }

  addTopic( newTopicProps: NewTopicProps ) {
    return this.http.post('https://uctalks.herokuapp.com/topics', { newTopicProps })
      .map(res => res.json());
  }

  updateTopicById(id: string, updatedTopicProps: Object) {
    return this.http.put(`http://localhost:5000/topics/${id}`, { updatedTopicProps })
      .map(res => res.json());
  }

  updateTopicPointsById(id: string, direction: VoteDirection): Observable<Topic> {
    return this.http.put(`http://localhost:5000/topics/${id}/points`, { direction })
      .map(res => res.json());
  }
}
