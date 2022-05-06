import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPlayerComponent } from './dialog-player.component';

describe('DialogPlayerComponent', () => {
  let component: DialogPlayerComponent;
  let fixture: ComponentFixture<DialogPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
