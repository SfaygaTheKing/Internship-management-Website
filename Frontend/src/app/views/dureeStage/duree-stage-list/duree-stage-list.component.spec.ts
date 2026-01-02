import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DureeStageListComponent } from './duree-stage-list.component';

describe('DureeStageListComponent', () => {
  let component: DureeStageListComponent;
  let fixture: ComponentFixture<DureeStageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DureeStageListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DureeStageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
