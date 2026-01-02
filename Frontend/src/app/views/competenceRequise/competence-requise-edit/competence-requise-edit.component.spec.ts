import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetenceRequiseEditComponent } from './competence-requise-edit.component';

describe('CompetenceRequiseEditComponent', () => {
  let component: CompetenceRequiseEditComponent;
  let fixture: ComponentFixture<CompetenceRequiseEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompetenceRequiseEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompetenceRequiseEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
