import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StageViewComponent } from './stage-view.component';

describe('StageViewComponent', () => {
  let component: StageViewComponent;
  let fixture: ComponentFixture<StageViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StageViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
