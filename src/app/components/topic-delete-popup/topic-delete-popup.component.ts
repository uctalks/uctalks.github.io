import { Component, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers/';
import { CloseAllModals, CloseDeleteTopicModalActionAndDelete } from '../../actions/topics';
import { MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-topic-delete-popup',
  template: `
    <h1 md-dialog-title>Are you sure you want to completely remove the topic?</h1>
    <form>
      <md-dialog-actions>
        <button md-button (click)="close(true)">Yes</button>
        <button md-button (click)="close(false)">No</button>
      </md-dialog-actions>
    </form>
  `,
  styleUrls: ['./topic-delete-popup.component.scss'],
})
export class TopicDeletePopupComponent {
  constructor(private store: Store<fromRoot.State>, @Inject(MD_DIALOG_DATA) public data: { id: string }) {

  }

  public close(toBeDeleted: boolean): void {
    toBeDeleted
      ? this.store.dispatch(new CloseDeleteTopicModalActionAndDelete({id: this.data.id}))
      : this.store.dispatch(new CloseAllModals());
  }
}
