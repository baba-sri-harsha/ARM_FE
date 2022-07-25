import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReqIdService } from '../requestId/req-id.service';

import { RequestService } from './request.service';

describe('RequestService', () => {
  let service: RequestService;

  const MockReqIdService = {
    getAllRequest: jasmine.createSpy().and.returnValue([])
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule,HttpClientTestingModule]
    });
    service = TestBed.inject(RequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
