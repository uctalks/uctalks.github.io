import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicAddOrEditPopupComponent } from './topic-add-or-edit-popup.component';

describe('TopicAddOrEditPopupComponent', () => {
  let component: TopicAddOrEditPopupComponent;
  let fixture: ComponentFixture<TopicAddOrEditPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicAddOrEditPopupComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicAddOrEditPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
