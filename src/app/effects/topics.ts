import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {MdSnackBar, MdDialog} from '@angular/material';
import {TopicsService} from '../services/topics-service/topics.service';
import * as topics from '../actions/topics';
import { TopicDeletePopupComponent } from '../components/topic-delete-popup/topic-delete-popup.component';

@Injectable()
export class TopicsEffects {
  @Effect() loadTopics$ = this.actions$
  // Listen for the topics.LOAD_TOPICS action
    .ofType(topics.LOAD_TOPICS)
    .switchMap(() => this.topicsService.getTopics()
      // If successful, dispatch success action with result
      .map(payload => new topics.LoadTopicsSuccessAction(payload))
        // If request fails, dispatch failed action
      .catch(error => {
        this.snackBar.open('Cannot receive topics', 'close', {duration: 3000});
        return Observable.of(new topics.LoadTopicsFailAction(error));
      }));

  @Effect() removeTopic$ = this.actions$
    .ofType(topics.DELETE_TOPIC)
    .switchMap(action => this.topicsService.deleteTopic(action.payload.id)
      .map(deletedTopic => new topics.DeleteTopicSuccessAction({ id: deletedTopic._id}))
      .catch(error => {
        this.snackBar.open('Cannot delete topic', 'close', {duration: 3000});
        return Observable.of(new topics.DeleteTopicFailAction(error));
      }));


  @Effect({ dispatch: false }) openDeleteTopicModal$ = this.actions$
    .ofType(topics.OPEN_DELETE_TOPIC_MODAL)
    .do(action => this.dialog.open(TopicDeletePopupComponent, { data: { id: action.payload.id } }));

  @Effect() closeDeleteTopicModalAndDelete$ = this.actions$
    .ofType(topics.CLOSE_DELETE_TOPIC_MODAL_AND_DELETE)
    .switchMap(action => {
      const { id } = action.payload;
      this.dialog.closeAll();
      return Observable.of(new topics.DeleteTopicAction({ id }));
    });

  @Effect({ dispatch: false }) closeAllModals$ = this.actions$
    .ofType(topics.CLOSE_ALL_MODALS)
    .do(() => this.dialog.closeAll());


  constructor(
    private actions$: Actions,
    private snackBar: MdSnackBar,
    private dialog: MdDialog,
    private topicsService: TopicsService,
    ) {
  }
}

//   @Effect() openAddOrEditTopalModal$ = this.actions$
//     .ofType(modals.OPEN_ADD_OR_EDIT_TOPIC_MODAL)
//     .do(action => {
//       const dialog = this.dialog.open(TopicAddOrEditPopupComponent, { data: { users: action.payload } });
//       dialog.afterClosed().subscribe(newTopicProps => {
//         newTopicProps && this.addTopic(newTopicProps)
//       });
//     })
//     // If successful, dispatch success action with result
//     .map(payload => new users.LoadUsersSuccessAction(payload))
//     // If request fails, dispatch failed action
//     .catch(error => {
//       this.snackBar.open('Cannot receive users', 'close', {duration: 3000});
//       return Observable.of(new users.LoadUsersFailAction(error))
//     }),
// );
