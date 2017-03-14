/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { ProductDialogComponent } from './product-dialog.component';

describe('ProductDialogComponent', () => {
  let component: ProductDialogComponent;
  let fixture: ComponentFixture<ProductDialogComponent>;

  const mockModal = {
    close: jasmine.createSpy('close'),
    dismiss: jasmine.createSpy('dismiss')
  }


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDialogComponent ],
      imports: [FormsModule],
      providers: [{
        provide: NgbActiveModal,
        useValue: mockModal
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send the content from the modal', () => {
    component.activeModal = mockModal;
    component.isTesting = true;
    component.input = 'test';
    component.name = 'Buxur';
    component.price = 100;
    component.quantitySold = 100;
    component.quantityInStock = 100;
    component.onSave();
    expect(mockModal.close).toHaveBeenCalled;
  });

  it('should test bad input in modal', () => {
    component.activeModal = mockModal;
    component.name = '111###';
    component.onSave();
    expect(mockModal.close).not.toHaveBeenCalled;
  });

  it('should test bad name in modal', () => {
    component.activeModal = mockModal;
    component.name = '1111';
    component.onEdit();
    expect(mockModal.close).not.toHaveBeenCalled;
  });

  it('should send edited content from the modal', () => {
    component.activeModal = mockModal;
    component.isTesting = true;
    component.input = 'test';
    component.name = 'Buxur';
    component.price = 100;
    component.quantitySold = 100;
    component.quantityInStock = 100;
    component.onEdit();
    expect(mockModal.close).toHaveBeenCalled;
  });

  it('should cancel the modal', () => {
    component.activeModal = mockModal;
    component.onCancel();
    expect(mockModal.dismiss).toHaveBeenCalled;
  });
});
