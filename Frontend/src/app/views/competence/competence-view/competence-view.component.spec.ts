import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetenceViewComponent } from './competence-view.component';

describe('CompetenceViewComponent', () => {
  let component: CompetenceViewComponent;
  let fixture: ComponentFixture<CompetenceViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompetenceViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompetenceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
