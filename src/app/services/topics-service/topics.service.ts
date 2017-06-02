import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import NewTopicProps from '../../components/topics/new-topic-props.interface';
import { Observable } from 'rxjs/Observable';
import Topic from '../../models/topic';
import restPrefix from '../../rest-prefix';

@Injectable()
export class TopicsService {

  constructor(private http: Http) {
  }

  getTopics(): Observable<Topic[]> {
    return this.http.get(`${restPrefix}/topics`)
      .map(res => res.json());
  }

  addTopic(newTopicProps: NewTopicProps): Observable<Topic> {
    return this.http.post(`${restPrefix}/topics`, { newTopicProps })
      .map(res => res.json());
  }

  deleteTopic(id): Observable<Topic> {
    return this.http.delete(`${restPrefix}/topics/${id}`)
      .map(res => res.json());
  }

  updateTopicById(id: string, updatedTopicProps: Object): Observable<Topic> {
    return this.http.put(`${restPrefix}/topics/${id}`, { updatedTopicProps })
      .map(res => res.json());
  }

  updateTopicLikesById(id: string, liked: boolean, userId: string | null): Observable<Topic> {
    return this.http.put(`${restPrefix}/topics/${id}/likes`, { liked, userId })
      .map(res => res.json());
  }
}
