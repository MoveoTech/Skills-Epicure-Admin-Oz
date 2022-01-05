import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantFormModalComponent } from './restaurant-form-modal.component';

describe('RestaurantFormModalComponent', () => {
  let component: RestaurantFormModalComponent;
  let fixture: ComponentFixture<RestaurantFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantFormModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
