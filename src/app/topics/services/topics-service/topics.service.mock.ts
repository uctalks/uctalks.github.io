import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import NewTopicProps from '../../components/topics/new-topic-props.interface';
import { Observable } from 'rxjs/Observable';
import TopicProps from '../../components/topics/topic-props.interface';
import { BaseTopicsService } from './topics-service.base';
import { ITopic } from '../../models/topic';
import { of } from 'rxjs/observable/of';

@Injectable()
export class TopicsServiceMock extends BaseTopicsService {
  public addTopic(newTopicProps: NewTopicProps): Observable<ITopic> {
    return of({
      ...newTopicProps,
      _id: Date.now().toString(),
      likes: 0,
      presented: false,
      usefulLinks: [],
      usersLikedIds: []
    });
  }

  public deleteTopic(id): Observable<ITopic> {
    return of({
      name: 'name',
      _id: id,
      likes: 0,
      presented: false,
      usefulLinks: [],
      usersLikedIds: []
    });
  }

  public updateTopicById(id: string, updatedTopicProps: TopicProps): Observable<ITopic> {
    const defaultProps = {
      name: 'name',
      _id: id,
      likes: 0,
      presented: false,
      usefulLinks: [],
      usersLikedIds: [],
    };

    return of({
      ...defaultProps,
      ...updatedTopicProps,
      presentationDate: 'date', // TODO refactor Date to string casting
    });
  }

  public updateTopicLikesById(id: string, liked: boolean, userId: string | null): Observable<ITopic> {
    return of({
      liked,
      name: 'name',
      _id: id,
      likes: 0, // TODO find a way to update likes
      presented: false,
      presentationDate: 'date',
      usefulLinks: [],
      usersLikedIds: []
    });
  }
}
