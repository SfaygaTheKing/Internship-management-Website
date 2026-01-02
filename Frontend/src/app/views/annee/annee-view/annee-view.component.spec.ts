import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnneeViewComponent } from './annee-view.component';

describe('AnneeViewComponent', () => {
  let component: AnneeViewComponent;
  let fixture: ComponentFixture<AnneeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnneeViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnneeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
