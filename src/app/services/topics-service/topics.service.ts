import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TopicsService {

  constructor(private http: Http) { }

  getTopics() {
    return this.http.get('https://uctalks.herokuapp.com/')
        .map(response => response.json());
  }

}
