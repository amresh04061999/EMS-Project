import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConfirmBoxComponent } from './delete-confirm-box.component';

describe('DeleteConfirmBoxComponent', () => {
  let component: DeleteConfirmBoxComponent;
  let fixture: ComponentFixture<DeleteConfirmBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteConfirmBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteConfirmBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
