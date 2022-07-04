import { TestBed } from '@angular/core/testing';

import { PageableCarService } from './pageable-car.service';

describe('PageableCarService', () => {
  let service: PageableCarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageableCarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
