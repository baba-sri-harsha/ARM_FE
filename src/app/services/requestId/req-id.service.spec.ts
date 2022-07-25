import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ReqIdService } from './req-id.service';

describe('ReqIdService', () => {
  let service: ReqIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule]
    });
    service = TestBed.inject(ReqIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
