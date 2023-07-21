import { TestBed } from '@angular/core/testing';

import { TableDataFilterService } from './table-data-filter.service';

describe('TableDataFilterService', () => {
  let service: TableDataFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableDataFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
