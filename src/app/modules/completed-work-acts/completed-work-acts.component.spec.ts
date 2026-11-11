import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedWorkActsComponent } from './completed-work-acts.component';

describe('CompletedWorkActsComponent', () => {
  let component: CompletedWorkActsComponent;
  let fixture: ComponentFixture<CompletedWorkActsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompletedWorkActsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompletedWorkActsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
