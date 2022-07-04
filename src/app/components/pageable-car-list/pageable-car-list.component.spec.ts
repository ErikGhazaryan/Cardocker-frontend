import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageableCarListComponent } from './pageable-car-list.component';

describe('PageableCarListComponent', () => {
  let component: PageableCarListComponent;
  let fixture: ComponentFixture<PageableCarListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageableCarListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageableCarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
