import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedWorkActFormComponent } from './completed-work-act-form.component';

describe('CompletedWorkActFormComponent', () => {
  let component: CompletedWorkActFormComponent;
  let fixture: ComponentFixture<CompletedWorkActFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompletedWorkActFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompletedWorkActFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
