import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicPopupComponent } from './topic-popup.component';

describe('TopicPopupComponent', () => {
  let component: TopicPopupComponent;
  let fixture: ComponentFixture<TopicPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
