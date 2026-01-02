import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesseurEditComponent } from './professeur-edit.component';

describe('ProfesseurEditComponent', () => {
  let component: ProfesseurEditComponent;
  let fixture: ComponentFixture<ProfesseurEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfesseurEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfesseurEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
