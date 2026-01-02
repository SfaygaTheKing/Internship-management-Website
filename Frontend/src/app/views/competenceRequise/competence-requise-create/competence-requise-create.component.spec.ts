import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetenceRequiseCreateComponent } from './competence-requise-create.component';

describe('CompetenceRequiseCreateComponent', () => {
  let component: CompetenceRequiseCreateComponent;
  let fixture: ComponentFixture<CompetenceRequiseCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompetenceRequiseCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompetenceRequiseCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
