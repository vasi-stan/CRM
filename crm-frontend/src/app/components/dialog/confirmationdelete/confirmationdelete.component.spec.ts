import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationdeleteComponent } from './confirmationdelete.component';

describe('ConfirmationdeleteComponent', () => {
  let component: ConfirmationdeleteComponent;
  let fixture: ComponentFixture<ConfirmationdeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationdeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationdeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
