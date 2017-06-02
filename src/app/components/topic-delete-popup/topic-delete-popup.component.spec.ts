import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicDeletePopupComponent } from './topic-delete-popup.component';

describe('TopicDeletePopupComponent', () => {
  let component: TopicDeletePopupComponent;
  let fixture: ComponentFixture<TopicDeletePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicDeletePopupComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicDeletePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
