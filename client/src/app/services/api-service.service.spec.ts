import { TestBed } from '@angular/core/testing';

import { APIService } from './api-service.service';

describe('ApiServiceService', () => {
  let service: APIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(APIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
