import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import NewTopicProps from '../../topics/new-topic-props.interface';
import LikeDirection from '../../topics/like-direction.type';
import { Observable } from 'rxjs/Observable';
import Topic from '../../topics/topic.interface';

@Injectable()
export class TopicsService {

  constructor(private http: Http) {
  }

  getTopics(): Observable<Topic[]> {
    return this.http.get('https://uctalks.herokuapp.com/topics')
      .map(res => res.json());
  }

  addTopic(newTopicProps: NewTopicProps): Observable<Topic> {
    return this.http.post('https://uctalks.herokuapp.com/topics', { newTopicProps })
      .map(res => res.json());
  }

  updateTopicById(id: string, updatedTopicProps: Object): Observable<Topic> {
    return this.http.put(`https://uctalks.herokuapp.com/topics/${id}`, { updatedTopicProps })
      .map(res => res.json());
  }

  updateTopicLikesById(id: string, direction: LikeDirection, userId: string | null): Observable<Topic> {
    return this.http.put(`https://uctalks.herokuapp.com/topics/${id}/likes`, { direction, userId })
      .map(res => res.json());
  }
}
