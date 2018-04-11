import { TestBed, inject } from '@angular/core/testing';
import { TopicsService } from './topics.service';

describe('TopicsServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TopicsService]
    });
  });

  it('should ...', inject([TopicsService], (service: TopicsService) => {
    expect(service).toBeTruthy();
  }));
});
