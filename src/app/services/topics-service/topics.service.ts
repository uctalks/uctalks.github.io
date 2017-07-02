import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import NewTopicProps from '../../components/topics/new-topic-props.interface';
import {Observable} from 'rxjs/Observable';
import Topic from '../../models/topic';
import restPrefix from '../../rest-prefix';
import TopicProps from '../../components/topics/topic-props.interface';

export type TopicsSortBy = 'name' | 'likes' | 'presentationDate' | 'speakerId' | 'presented';

export enum TopicsSortTypes { Descending = 1, Ascending }

@Injectable()
export class TopicsService {

  static sortTopics(topics: Topic[], { sortBy, sortType }: { sortBy: TopicsSortBy, sortType: TopicsSortTypes }): Topic[] {
    switch (sortType) {
      case TopicsSortTypes.Descending:
        switch (sortBy) {
          case 'name':
          case 'presentationDate':
          case 'speakerId':
            return topics.sort((a: Topic, b: Topic) => TopicsService.compareStrings(a[sortBy], b[sortBy]));

          case 'likes':
          case 'presented':
            return topics.sort((a: Topic, b: Topic) => TopicsService.compareBoolsOrNumbers(a[sortBy], b[sortBy]));

          default:
            return topics;
        }

      case TopicsSortTypes.Ascending:
        switch (sortBy) {
          case 'name':
          case 'presentationDate':
          case 'speakerId':
            return topics.sort((a: Topic, b: Topic) => TopicsService.compareStrings(b[sortBy], a[sortBy]));

          case 'likes':
          case 'presented':
            return topics.sort((a: Topic, b: Topic) => TopicsService.compareBoolsOrNumbers(b[sortBy], a[sortBy]));

          default:
            return topics;
        }

      default:
        return topics;
    }
  }

  static compareBoolsOrNumbers(a: boolean | number, b: boolean | number) {
    return Number(b) - Number(a);
  }

  static compareStrings(a: string, b: string) {
    if (!a && !b) {
      return 0;
    } else if (!a && b) {
      return 1;
    } else if (a && !b) {
      return -1;
    }

    a = a.toLowerCase();
    b = b.toLowerCase();
    return b > a ? 1 : b === a ? 0 : -1;
  }

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

  updateTopicById(id: string, updatedTopicProps: TopicProps): Observable<Topic> {
    return this.http.put(`${restPrefix}/topics/${id}`, { updatedTopicProps })
      .map(res => res.json());
  }

  updateTopicLikesById(id: string, liked: boolean, userId: string | null): Observable<Topic> {
    return this.http.put(`${restPrefix}/topics/${id}/likes`, { liked, userId })
      .map(res => res.json());
  }
}
