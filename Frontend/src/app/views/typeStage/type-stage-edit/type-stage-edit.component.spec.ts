import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeStageEditComponent } from './type-stage-edit.component';

describe('TypeStageEditComponent', () => {
  let component: TypeStageEditComponent;
  let fixture: ComponentFixture<TypeStageEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeStageEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TypeStageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
