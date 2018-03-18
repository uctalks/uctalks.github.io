import { NgModule } from '@angular/core';
import { environment } from '../../environments/environment';
import { TOPICS_SERVICE } from './topics-service/types';
import { TopicsService } from './topics-service/topics.service';
import { TopicsServiceMock } from './topics-service/topics.service.mock';

@NgModule({
  providers: [
    {
      provide: TOPICS_SERVICE,
      useClass: environment.withMocks ? TopicsServiceMock : TopicsService
    },
  ]
})
export class TopicsModule { }
