import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../material/material.module';

import { TopicsPageComponent } from './containers/topics-page';
import { TOPICS_SERVICE } from './services/topics-service/types';
import { TopicsService } from './services/topics-service/topics.service';
import { TopicAddOrEditPopupComponent } from './components/topic-add-or-edit-popup/topic-add-or-edit-popup.component';
import { TopicDeletePopupComponent } from './components/topic-delete-popup/topic-delete-popup.component';
import { TopicsComponent } from './components/topics/topics.component';
import { TopicsEffects, UsersEffects } from './effects';
import { reducers } from './reducers';
import { USER_SERVICE } from './services/users-service/types';
import { UserService } from './services/users-service/user.service';
import { UserDropdownComponent } from './components/user-dropdown/user-dropdown.component';
import { UserComponent } from './components/user/user.component';

@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    EffectsModule.forFeature([TopicsEffects, UsersEffects]),
    FormsModule,
    HttpClientModule,
    MaterialModule,
    StoreModule.forFeature('topics', reducers),
  ],
  declarations: [
    TopicsComponent,
    TopicDeletePopupComponent,
    TopicAddOrEditPopupComponent,
    TopicsPageComponent,
    UserComponent,
    UserDropdownComponent,
  ],
  entryComponents: [
    TopicDeletePopupComponent,
    TopicAddOrEditPopupComponent,
  ],
  providers: [
    {
      provide: TOPICS_SERVICE,
      useClass: TopicsService
    },
    {
      provide: USER_SERVICE,
      useClass: UserService
    },
  ]
})
export class TopicsModule {
}
