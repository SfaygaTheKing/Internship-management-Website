import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeStageCreateComponent } from './type-stage-create.component';

describe('TypeStageCreateComponent', () => {
  let component: TypeStageCreateComponent;
  let fixture: ComponentFixture<TypeStageCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeStageCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TypeStageCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
