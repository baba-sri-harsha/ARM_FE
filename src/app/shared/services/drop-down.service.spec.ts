import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { DropDownService } from './drop-down.service';

describe('DropDownService', () => {
  let service: DropDownService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(DropDownService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
