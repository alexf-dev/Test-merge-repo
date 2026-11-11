import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MskRequestFormComponent } from './msk-request-form.component';

describe('MskRequestFormComponent', () => {
  let component: MskRequestFormComponent;
  let fixture: ComponentFixture<MskRequestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MskRequestFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MskRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
