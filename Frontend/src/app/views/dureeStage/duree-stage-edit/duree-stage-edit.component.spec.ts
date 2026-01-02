import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DureeStageEditComponent } from './duree-stage-edit.component';

describe('DureeStageEditComponent', () => {
  let component: DureeStageEditComponent;
  let fixture: ComponentFixture<DureeStageEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DureeStageEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DureeStageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
