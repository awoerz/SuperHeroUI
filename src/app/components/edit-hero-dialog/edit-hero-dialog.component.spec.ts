import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHeroDialogComponent } from './edit-hero-dialog.component';

describe('EditHeroDialogComponent', () => {
  let component: EditHeroDialogComponent;
  let fixture: ComponentFixture<EditHeroDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditHeroDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditHeroDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
