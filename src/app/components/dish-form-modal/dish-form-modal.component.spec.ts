import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishFormModalComponent } from './dish-form-modal.component';

describe('DishFormModalComponent', () => {
  let component: DishFormModalComponent;
  let fixture: ComponentFixture<DishFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DishFormModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DishFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
