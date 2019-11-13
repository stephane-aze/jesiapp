import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { FetchUserService } from './fetch-user.service';

describe('FetchUserService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FetchUserService],
    }),
  );

  it('should be created', () => {
    const service: FetchUserService = TestBed.get(FetchUserService);
    expect(service).toBeTruthy();
  });
});
