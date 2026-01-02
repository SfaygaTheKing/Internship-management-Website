import { TestBed } from '@angular/core/testing';

import { CompetenceRequiseService } from './competence-requise.service';

describe('CompetenceRequiseService', () => {
  let service: CompetenceRequiseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompetenceRequiseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
