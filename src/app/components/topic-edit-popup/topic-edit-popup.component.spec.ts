import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicEditPopupComponent } from './topic-edit-popup.component';

describe('TopicEditPopupComponent', () => {
  let component: TopicEditPopupComponent;
  let fixture: ComponentFixture<TopicEditPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicEditPopupComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicEditPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
