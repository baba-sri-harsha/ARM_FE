import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { UploadService } from './upload.service';

describe('UploadService', () => {
  let service: UploadService;

  const MockUploadService = {
    uploadFiles: () => {
      return of('Uploaded Successfully');
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        {
          provide: UploadService,
          useValue: MockUploadService
        }
      ]
    });
    service = TestBed.inject(UploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
