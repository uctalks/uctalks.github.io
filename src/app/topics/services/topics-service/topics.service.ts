import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { restPrefix } from '../../../core/rest-prefix';
import { ITopic } from '../../models';
import { INewTopicProps } from '../../components/topics/new-topic-props.interface';
import { ITopicProps } from '../../components/topics/topic-props.interface';
import { ITopicsService } from './types';

@Injectable()
export class TopicsService implements ITopicsService {
  constructor(private readonly http: HttpClient) {
  }

  public addTopic(newTopicProps: INewTopicProps): Observable<ITopic> {
    return this.http.post<ITopic>(`${restPrefix}/topics`, { newTopicProps });
  }

  public deleteTopic(id): Observable<ITopic> {
    return this.http.delete<ITopic>(`${restPrefix}/topics/${id}`);
  }

  public getTopics(): Observable<ReadonlyArray<ITopic>> {
    return this.http.get<ReadonlyArray<ITopic>>(`${restPrefix}/topics`);
  }

  public updateTopicById(id: string, updatedTopicProps: ITopicProps): Observable<ITopic> {
    return this.http.put<ITopic>(`${restPrefix}/topics/${id}`, { updatedTopicProps });
  }

  public updateTopicLikesById(id: string, liked: boolean, userId: string | null): Observable<ITopic> {
    return this.http.put<ITopic>(`${restPrefix}/topics/${id}/likes`, { liked, userId });
  }
}
