import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefFormModalComponent } from './chef-form-modal.component';

describe('ChefModalComponent', () => {
  let component: ChefFormModalComponent;
  let fixture: ComponentFixture<ChefFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChefFormModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChefFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
