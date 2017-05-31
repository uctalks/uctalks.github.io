import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicAddPopupComponent } from './topic-add-popup.component';

describe('TopicAddPopupComponent', () => {
  let component: TopicAddPopupComponent;
  let fixture: ComponentFixture<TopicAddPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicAddPopupComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicAddPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
