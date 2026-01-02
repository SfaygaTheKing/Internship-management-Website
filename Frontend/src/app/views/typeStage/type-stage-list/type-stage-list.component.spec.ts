import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeStageListComponent } from './type-stage-list.component';

describe('TypeStageListComponent', () => {
  let component: TypeStageListComponent;
  let fixture: ComponentFixture<TypeStageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeStageListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TypeStageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
