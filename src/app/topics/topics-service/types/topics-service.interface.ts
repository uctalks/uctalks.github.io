import { Observable } from 'rxjs/Observable';
import { ITopic } from '../../../models/topic';
import { ITopicProps } from '../../../components/topics/topic-props.interface';
import { INewTopicProps } from '../../../components/topics/new-topic-props.interface';

export interface ITopicsService {
  addTopic(newTopicProps: INewTopicProps): Observable<ITopic>;

  deleteTopic(id): Observable<ITopic>;

  updateTopicById(id: string, updatedTopicProps: ITopicProps): Observable<ITopic>;

  getTopics(): Observable<ITopic[]>;

  updateTopicLikesById(id: string, liked: boolean, userId: string | null): Observable<ITopic>;
}
