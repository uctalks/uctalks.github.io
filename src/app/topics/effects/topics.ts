import { Inject, Injectable } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as topics from '../actions/topics';
import {
  AddTopicAction,
  CloseAddTopicModalAction,
  CloseDeleteTopicModalActionAndDelete,
  CloseEditTopicModalAction,
  DeleteTopicAction,
  LikeAction,
  OpenDeleteTopicModalAction,
  OpenEditTopicModalAction,
  TopicsActions,
  UpdateTopicAction
} from '../actions/topics';
import { TopicDeletePopupComponent } from '../components/topic-delete-popup/topic-delete-popup.component';
import { TopicAddOrEditPopupComponent } from '../components/topic-add-or-edit-popup/topic-add-or-edit-popup.component';
import NewTopicProps from '../components/topics/new-topic-props.interface';
import TopicProps from '../components/topics/topic-props.interface';
import { ITopicsService, TOPICS_SERVICE } from '../services/topics-service/types';

@Injectable()
export class TopicsEffects {
  @Effect()
  public readonly loadTopics$ = this.actions$.pipe(
    ofType(TopicsActions.Load),
    switchMap(() => this.topicsService.getTopics().pipe(
      map(payload => new topics.LoadTopicsSuccessAction(payload)),
      catchError(error => {
        this.snackBar.open('Cannot receive topics', 'close', { duration: 3000 });
        return of(new topics.LoadTopicsFailAction(error));
      })),
    )
  );

  @Effect()
  public readonly addTopic$ = this.actions$.pipe(
    ofType(TopicsActions.Add),
    switchMap((action: AddTopicAction) => this.topicsService.addTopic(action.payload.newTopicProps).pipe(
      map(addedTopic => {
        this.snackBar.open('New topic has been added', 'close', { duration: 3000 });
        return new topics.AddTopicSuccessAction({ addedTopic });
      }),
      catchError(error => {
        this.snackBar.open('Cannot add topic', 'close', { duration: 3000 });
        return of(new topics.AddTopicFailAction(error));
      })),
    )
  );

  @Effect()
  public readonly updateTopic$ = this.actions$.pipe(
    ofType(TopicsActions.Update),
    switchMap((action: UpdateTopicAction) => this.topicsService.updateTopicById(action.payload.id, action.payload.updatedTopicProps)
      .pipe(
        map(updatedTopic => {
          this.snackBar.open('Topic has been updated', 'close', { duration: 3000 });
          return new topics.UpdateTopicSuccessAction({ id: updatedTopic._id, changes: updatedTopic });
        }),
        catchError(error => {
          this.snackBar.open('Cannot update topic', 'close', { duration: 3000 });
          return of(new topics.UpdateTopicFailAction(error));
        })),
    ),
  );

  // @TODO think how we can combine with updateTopic$
  @Effect()
  public readonly likeTopic$ = this.actions$.pipe(
    ofType(TopicsActions.Like),
    switchMap((action: LikeAction) => {
      const { topicId, userId, liked } = action.payload;
      return this.topicsService.updateTopicLikesById(topicId, liked, userId).pipe(
        map(updatedTopic => {
          this.snackBar.open('Topic has been updated', 'close', { duration: 3000 });
          return new topics.LikeSuccessAction({ id: updatedTopic._id, changes: updatedTopic });
        }),
        catchError(error => {
          this.snackBar.open('Cannot update topic', 'close', { duration: 3000 });
          return of(new topics.LikeFailAction(error));
        }),
      );
    }),
  );

  @Effect()
  public readonly removeTopic$ = this.actions$.pipe(
    ofType(TopicsActions.Delete),
    switchMap((action: DeleteTopicAction) => this.topicsService.deleteTopic(action.payload.id).pipe(
      map(deletedTopic => {
        this.snackBar.open('Topic has been deleted', 'close', { duration: 3000 });
        return new topics.DeleteTopicSuccessAction({ id: deletedTopic._id });
      }),
      catchError(error => {
        this.snackBar.open('Cannot delete topic', 'close', { duration: 3000 });
        return of(new topics.DeleteTopicFailAction(error));
      })),
    )
  );

  @Effect({ dispatch: false })
  public readonly openAddTopicModal$ = this.actions$.pipe(
    ofType(TopicsActions.OpenAddModal),
    tap(() => this.dialog.open(TopicAddOrEditPopupComponent)),
  );

  @Effect()
  public readonly closeAddTopicModalAndAdd$ = this.actions$.pipe(
    ofType(TopicsActions.CloseAddModal),
    switchMap((action: CloseAddTopicModalAction) => {
      const { newTopicProps }: { newTopicProps: NewTopicProps } = action.payload;
      this.dialog.closeAll();
      return of(new topics.AddTopicAction({ newTopicProps }));
    }),
  );

  @Effect({ dispatch: false })
  public readonly openEditTopicModal$ = this.actions$.pipe(
    ofType(TopicsActions.OpenEditModal),
    tap((action: OpenEditTopicModalAction) => this.dialog.open(
      TopicAddOrEditPopupComponent,
      { data: { topic: action.payload.topic } })
    ),
  );

  @Effect()
  public readonly closeEditTopicModalAndUpdate$ = this.actions$.pipe(
    ofType(TopicsActions.CloseEditModal),
    switchMap((action: CloseEditTopicModalAction) => {
      const { updatedTopicProps, id }: { updatedTopicProps: TopicProps, id: string } = action.payload;
      this.dialog.closeAll();
      return of(new topics.UpdateTopicAction({ updatedTopicProps, id }));
    }),
  );

  @Effect({ dispatch: false })
  public readonly openDeleteTopicModal$ = this.actions$.pipe(
    ofType(TopicsActions.OpenDeleteModal),
    tap((action: OpenDeleteTopicModalAction) => this.dialog.open(TopicDeletePopupComponent, { data: { id: action.payload.id } })),
  );

  @Effect()
  public readonly closeDeleteTopicModalAndDelete$ = this.actions$.pipe(
    ofType(TopicsActions.CloseDeleteModal),
    switchMap((action: CloseDeleteTopicModalActionAndDelete) => {
      const { id } = action.payload;
      this.dialog.closeAll();
      return of(new topics.DeleteTopicAction({ id }));
    }),
  );

  @Effect({ dispatch: false })
  public readonly closeAllModals$ = this.actions$.pipe(
    ofType(TopicsActions.CloseAllModals),
    tap(() => this.dialog.closeAll()),
  );

  constructor(
    private readonly actions$: Actions,
    private readonly snackBar: MatSnackBar,
    private readonly dialog: MatDialog,
    @Inject(TOPICS_SERVICE) private readonly topicsService: ITopicsService,
  ) {
  }
}
