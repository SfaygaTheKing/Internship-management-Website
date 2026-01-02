import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DureeStageCreateComponent } from './duree-stage-create.component';

describe('DureeStageCreateComponent', () => {
  let component: DureeStageCreateComponent;
  let fixture: ComponentFixture<DureeStageCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DureeStageCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DureeStageCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
