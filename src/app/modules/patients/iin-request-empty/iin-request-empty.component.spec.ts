import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IinRequestEmptyComponent } from './iin-request-empty.component';

describe('IinRequestEmptyComponent', () => {
  let component: IinRequestEmptyComponent;
  let fixture: ComponentFixture<IinRequestEmptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IinRequestEmptyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IinRequestEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
