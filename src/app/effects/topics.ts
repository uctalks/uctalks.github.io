import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {MdSnackBar, MdDialog} from '@angular/material';
import {TopicsService} from '../services/topics-service/topics.service';
import * as topics from '../actions/topics';
import {TopicDeletePopupComponent} from '../components/topic-delete-popup/topic-delete-popup.component';
import {TopicAddOrEditPopupComponent} from '../components/topic-add-or-edit-popup/topic-add-or-edit-popup.component';
import NewTopicProps from '../components/topics/new-topic-props.interface';
import TopicProps from '../components/topics/topic-props.interface';
import {
  AddTopicAction, CloseAddTopicModalAction, CloseDeleteTopicModalActionAndDelete, CloseEditTopicModalAction, DeleteTopicAction, LikeAction,
  OpenDeleteTopicModalAction, OpenEditTopicModalAction, UpdateTopicAction,
} from '../actions/topics';

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

  @Effect() addTopic$ = this.actions$
    .ofType(topics.ADD_TOPIC)
    .switchMap((action: AddTopicAction) => this.topicsService.addTopic(action.payload.newTopicProps)
      .map(addedTopic => {
        this.snackBar.open('New topic has been added', 'close', {duration: 3000});
        return new topics.AddTopicSuccessAction({addedTopic})
      })
      .catch(error => {
        this.snackBar.open('Cannot add topic', 'close', {duration: 3000});
        return Observable.of(new topics.AddTopicFailAction(error));
      }));

  @Effect() updateTopic$ = this.actions$
    .ofType(topics.UPDATE_TOPIC)
    .switchMap((action: UpdateTopicAction) => this.topicsService.updateTopicById(action.payload.id, action.payload.updatedTopicProps)
      .map(updatedTopic => {
        this.snackBar.open('Topic has been updated', 'close', {duration: 3000});
        return new topics.UpdateTopicSuccessAction({updatedTopic})
      })
      .catch(error => {
        this.snackBar.open('Cannot update topic', 'close', {duration: 3000});
        return Observable.of(new topics.UpdateTopicFailAction(error));
      }));

  // @TODO think how we can combine with updateTopic$
  @Effect() likeTopic$ = this.actions$
    .ofType(topics.LIKE_TOPIC)
    .switchMap((action: LikeAction) => {
      const { topicId, userId, liked } = action.payload;
      return this.topicsService.updateTopicLikesById(topicId, liked, userId)
        .map(updatedTopic => {
          this.snackBar.open('Topic has been updated', 'close', {duration: 3000});
          return new topics.LikeSuccessAction({ updatedTopic })
        })
        .catch(error => {
          this.snackBar.open('Cannot update topic', 'close', {duration: 3000});
          return Observable.of(new topics.LikeFailAction(error));
        })
    });

  @Effect() removeTopic$ = this.actions$
    .ofType(topics.DELETE_TOPIC)
    .switchMap((action: DeleteTopicAction) => this.topicsService.deleteTopic(action.payload.id)
      .map(deletedTopic => {
        this.snackBar.open('Topic has been deleted', 'close', {duration: 3000});
        return new topics.DeleteTopicSuccessAction({id: deletedTopic._id})
      })
      .catch(error => {
        this.snackBar.open('Cannot delete topic', 'close', {duration: 3000});
        return Observable.of(new topics.DeleteTopicFailAction(error));
      }));


  @Effect({dispatch: false}) openAddTopicModal$ = this.actions$
    .ofType(topics.OPEN_ADD_TOPIC_MODAL)
    .do(() => this.dialog.open(TopicAddOrEditPopupComponent));

  @Effect() closeAddTopicModalAndAdd$ = this.actions$
    .ofType(topics.CLOSE_ADD_TOPIC_MODAL_AND_ADD)
    .switchMap((action: CloseAddTopicModalAction) => {
      const {newTopicProps}: { newTopicProps: NewTopicProps } = action.payload;
      this.dialog.closeAll();
      return Observable.of(new topics.AddTopicAction({newTopicProps}));
    });

  @Effect({dispatch: false}) openEditTopicModal$ = this.actions$
    .ofType(topics.OPEN_EDIT_TOPIC_MODAL)
    .do((action: OpenEditTopicModalAction) => this.dialog.open(TopicAddOrEditPopupComponent, {data: {topic: action.payload.topic}}));

  @Effect() closeEditTopicModalAndUpdate$ = this.actions$
    .ofType(topics.CLOSE_EDIT_TOPIC_MODAL_AND_UPDATE)
    .switchMap((action: CloseEditTopicModalAction) => {
      const {updatedTopicProps, id}: { updatedTopicProps: TopicProps, id: string } = action.payload;
      this.dialog.closeAll();
      return Observable.of(new topics.UpdateTopicAction({updatedTopicProps, id}));
    });

  @Effect({dispatch: false}) openDeleteTopicModal$ = this.actions$
    .ofType(topics.OPEN_DELETE_TOPIC_MODAL)
    .do((action: OpenDeleteTopicModalAction) => this.dialog.open(TopicDeletePopupComponent, {data: {id: action.payload.id}}));

  @Effect() closeDeleteTopicModalAndDelete$ = this.actions$
    .ofType(topics.CLOSE_DELETE_TOPIC_MODAL_AND_DELETE)
    .switchMap((action: CloseDeleteTopicModalActionAndDelete) => {
      const {id} = action.payload;
      this.dialog.closeAll();
      return Observable.of(new topics.DeleteTopicAction({id}));
    });

  @Effect({dispatch: false}) closeAllModals$ = this.actions$
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
