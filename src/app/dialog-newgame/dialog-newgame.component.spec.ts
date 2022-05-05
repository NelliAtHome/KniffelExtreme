import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewgameComponent } from './dialog-newgame.component';

describe('DialogNewgameComponent', () => {
  let component: DialogNewgameComponent;
  let fixture: ComponentFixture<DialogNewgameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogNewgameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNewgameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
