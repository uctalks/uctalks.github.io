import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import NewTopicProps from '../../components/topics/new-topic-props.interface';
import Topic from '../../models/topic';
import restPrefix from '../../../core/rest-prefix';
import TopicProps from '../../components/topics/topic-props.interface';
import { ITopicsService } from './types/index';

@Injectable()
export abstract class BaseTopicsService implements ITopicsService {

  constructor(protected http: Http) {
  }

  public abstract addTopic(newTopicProps: NewTopicProps): Observable<Topic>;

  public abstract deleteTopic(id): Observable<Topic>;

  public abstract updateTopicById(id: string, updatedTopicProps: TopicProps): Observable<Topic>;

  public getTopics(): Observable<Topic[]> {
    return this.http.get(`${restPrefix}/topics`)
      .map(res => res.json());
  }

  public abstract updateTopicLikesById(id: string, liked: boolean, userId: string | null): Observable<Topic>;
}
