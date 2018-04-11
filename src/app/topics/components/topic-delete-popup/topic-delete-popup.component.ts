import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { CloseAllModals, CloseDeleteTopicModalActionAndDelete } from '../../actions/topics';

@Component({
  selector: 'app-topic-delete-popup',
  template: `
    <h1 mat-dialog-title>Are you sure you want to completely remove the topic?</h1>
    <form>
      <mat-dialog-actions>
        <button mat-button (click)="close(true)">Yes</button>
        <button mat-button (click)="close(false)">No</button>
      </mat-dialog-actions>
    </form>
  `,
  styleUrls: ['./topic-delete-popup.component.scss'],
})
export class TopicDeletePopupComponent {
  constructor(private store: Store<fromRoot.IState>, @Inject(MAT_DIALOG_DATA) public data: { id: string }) {

  }

  public close(toBeDeleted: boolean): void {
    toBeDeleted
      ? this.store.dispatch(new CloseDeleteTopicModalActionAndDelete({ id: this.data.id }))
      : this.store.dispatch(new CloseAllModals());
  }
}
