import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetenceRequiseListComponent } from './competence-requise-list.component';

describe('CompetenceRequiseListComponent', () => {
  let component: CompetenceRequiseListComponent;
  let fixture: ComponentFixture<CompetenceRequiseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompetenceRequiseListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompetenceRequiseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
