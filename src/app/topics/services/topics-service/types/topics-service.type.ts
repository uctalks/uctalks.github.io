import { InjectionToken } from '@angular/core';
import { ITopicsService } from './topics-service.interface';

export const TOPICS_SERVICE = new InjectionToken<ITopicsService>('TopicsService');
