import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetenceRequiseViewComponent } from './competence-requise-view.component';

describe('CompetenceRequiseViewComponent', () => {
  let component: CompetenceRequiseViewComponent;
  let fixture: ComponentFixture<CompetenceRequiseViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompetenceRequiseViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompetenceRequiseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
