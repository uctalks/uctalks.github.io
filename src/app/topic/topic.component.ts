import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {
  @Input() topic: Object[];
  points: number = 0;

  voteUp() {
    this.points++;
    return false;
  }

  voteDown() {
    if (this.points !== 0) {
      this.points--;
    }

    return false;
  }

  constructor() { }

  ngOnInit() {
  }

}