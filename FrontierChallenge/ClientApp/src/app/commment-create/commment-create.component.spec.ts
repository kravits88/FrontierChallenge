import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommmentCreateComponent } from './commment-create.component';

describe('CommmentCreateComponent', () => {
  let component: CommmentCreateComponent;
  let fixture: ComponentFixture<CommmentCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommmentCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommmentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
