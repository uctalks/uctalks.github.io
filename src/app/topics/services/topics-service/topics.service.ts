import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import NewTopicProps from '../../components/topics/new-topic-props.interface';
import { Observable } from 'rxjs/Observable';
import Topic from '../../models/topic';
import restPrefix from '../../../core/rest-prefix';
import TopicProps from '../../components/topics/topic-props.interface';
import { BaseTopicsService } from './topics-service.base';

@Injectable()
export class TopicsService extends BaseTopicsService {
  public addTopic(newTopicProps: NewTopicProps): Observable<Topic> {
    return this.http.post(`${restPrefix}/topics`, { newTopicProps })
      .map(res => res.json());
  }

  public deleteTopic(id): Observable<Topic> {
    return this.http.delete(`${restPrefix}/topics/${id}`)
      .map(res => res.json());
  }

  public updateTopicById(id: string, updatedTopicProps: TopicProps): Observable<Topic> {
    return this.http.put(`${restPrefix}/topics/${id}`, { updatedTopicProps })
      .map(res => res.json());
  }

  public updateTopicLikesById(id: string, liked: boolean, userId: string | null): Observable<Topic> {
    return this.http.put(`${restPrefix}/topics/${id}/likes`, { liked, userId })
      .map(res => res.json());
  }
}
