import { Component, OnInit, Input } from '@angular/core';
import Topic from './topic.interface';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {
  @Input() topic: Topic;
  points: number = 0;
  myVote: number = 0;

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

  constructor() { }

  ngOnInit() {
  }

}
