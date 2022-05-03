import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogScoreComponent } from './dialog-score.component';

describe('DialogScoreComponent', () => {
  let component: DialogScoreComponent;
  let fixture: ComponentFixture<DialogScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogScoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
