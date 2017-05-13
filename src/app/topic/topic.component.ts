import { Component, OnInit, Input } from '@angular/core';
import { Auth } from '../services/auth-service/auth.service';
import Topic from './topic.interface';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {
  @Input() topic: Topic;
  points = 0;
  myVote = 0;

  constructor(public auth: Auth) { }

  ngOnInit() {
  }

  voteUp() {
    if (this.myVote === 1) {
      return;
    }

    this.myVote++;
    this.points++;

    return false;
  }

  voteDown() {
    if (this.myVote === -1) {
      return;
    }

    if (this.points) {
      this.myVote--;
      this.points--;
    }

    return false;
  }
}
