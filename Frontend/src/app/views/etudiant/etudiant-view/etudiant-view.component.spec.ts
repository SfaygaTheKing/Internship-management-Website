import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudiantViewComponent } from './etudiant-view.component';

describe('EtudiantViewComponent', () => {
  let component: EtudiantViewComponent;
  let fixture: ComponentFixture<EtudiantViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtudiantViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EtudiantViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
