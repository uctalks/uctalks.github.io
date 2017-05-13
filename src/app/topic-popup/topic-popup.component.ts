import {Component, EventEmitter, Output} from "@angular/core";
import Topic from "../topic/topic.interface";

@Component({
  selector: 'app-topic-popup',
  templateUrl: './topic-popup.component.html',
  styleUrls: ['./topic-popup.component.scss']
})
export class TopicPopupComponent {
  @Output() onTopicAdd: EventEmitter<Topic> = new EventEmitter();
  newTopic: Topic = {name: ''};
  showModal = false;

  onModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  addTopic() {
    this.onTopicAdd.emit(this.newTopic);
    this.closeModal();
  }
}
