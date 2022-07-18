import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { TalentService } from './talent.service';

describe('TalentService', () => {
  let service: TalentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(TalentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
