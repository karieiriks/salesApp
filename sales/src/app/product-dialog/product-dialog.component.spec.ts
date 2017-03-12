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

  it('should save', () => {
    component.activeModal = mockModal;
    component.input = 'test';
    component.name = 'Buxur';
    component.price = 100;
    component.quantitySold = 100;
    component.quantityInStock = 100;
    //component.onSave();
    expect(component.validateProductInfo()).toEqual(true);
  });
});
