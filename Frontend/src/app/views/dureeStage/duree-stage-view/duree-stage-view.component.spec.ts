import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DureeStageViewComponent } from './duree-stage-view.component';

describe('DureeStageViewComponent', () => {
  let component: DureeStageViewComponent;
  let fixture: ComponentFixture<DureeStageViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DureeStageViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DureeStageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
