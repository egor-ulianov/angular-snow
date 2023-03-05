import { TestBed } from '@angular/core/testing';

import { NgxSnowService } from './ngx-snow.service';

describe('NgxSnowService', () => {
  let service: NgxSnowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxSnowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
