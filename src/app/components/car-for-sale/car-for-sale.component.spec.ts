import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarForSaleComponent } from './car-for-sale.component';

describe('CarForSaleComponent', () => {
  let component: CarForSaleComponent;
  let fixture: ComponentFixture<CarForSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarForSaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarForSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
