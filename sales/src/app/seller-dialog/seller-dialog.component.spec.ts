/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { SellersService } from '../sellers.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, FormBuilder } from '@angular/forms';

import { SellerDialogComponent } from './seller-dialog.component';

describe('SellerDialogComponent', () => {
  let component: SellerDialogComponent;
  let fixture: ComponentFixture<SellerDialogComponent>;

  let serviceMock = {
    nextId: 0
  };

  const mockModal = {
    close: jasmine.createSpy('close'),
    dismiss: jasmine.createSpy('dismiss')
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerDialogComponent ],
      imports: [ FormsModule ],
      providers: [{
        provide: SellersService,
        useValue: serviceMock
      }, {
        provide: NgbActiveModal,
        useValue: mockModal
      }, FormBuilder]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send new data from the modal', () => {
    component.activeModal = mockModal;
    component.onSave();
    expect(mockModal.dismiss).toHaveBeenCalled;
  });

  it('should send edited data from the modal', () => {
    component.activeModal = mockModal;
    component.onEdit();
    expect(mockModal.dismiss).toHaveBeenCalled;
  });

  it('should cancel the modal', () => {
    component.activeModal = mockModal;
    component.onCancel();
    expect(mockModal.dismiss).toHaveBeenCalled;
  });

});
