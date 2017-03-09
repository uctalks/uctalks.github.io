import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {
  @Input() topic: Object[];
  points: number = 0;
  voteCheck: boolean = false;

  voteUp() {
    if (!this.voteCheck) {
      this.points++;
      this.voteCheck = true;
    }

    return false;
  }

  voteDown() {
    if (this.points !== 0) {
      this.points--;
      this.voteCheck = false;
    }

    return false;
  }

  constructor() { }

  ngOnInit() {
  }

}
