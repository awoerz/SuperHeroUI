import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationTestComponent } from './pagination-test.component';

describe('PaginationTestComponent', () => {
  let component: PaginationTestComponent;
  let fixture: ComponentFixture<PaginationTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaginationTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
