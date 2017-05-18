import {Component, EventEmitter, Output} from '@angular/core';
import NewTopicProps from '../topics/new-topic-props.interface';

@Component({
  selector: 'app-topic-popup',
  templateUrl: './topic-popup.component.html',
  styleUrls: ['./topic-popup.component.scss']
})
export class TopicPopupComponent {
  @Output() onTopicAdd: EventEmitter<NewTopicProps> = new EventEmitter();
  newTopicProps: NewTopicProps = { name: '' };
  showModal = false;

  onModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  addTopic() {
    this.onTopicAdd.emit(this.newTopicProps);
    this.closeModal();
  }
}
