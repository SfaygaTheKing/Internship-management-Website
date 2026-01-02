import { TestBed } from '@angular/core/testing';

import { DureeStageService } from './duree-stage.service';

describe('DureeStageService', () => {
  let service: DureeStageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DureeStageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
