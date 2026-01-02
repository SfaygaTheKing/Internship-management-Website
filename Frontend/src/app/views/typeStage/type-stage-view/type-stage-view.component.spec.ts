import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeStageViewComponent } from './type-stage-view.component';

describe('TypeStageViewComponent', () => {
  let component: TypeStageViewComponent;
  let fixture: ComponentFixture<TypeStageViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeStageViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TypeStageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
