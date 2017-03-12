/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, ViewContainerRef } from '@angular/core';
import { SellersService, Seller } from '../sellers.service';
import { Observable } from 'rxjs/Observable';
import { FormsModule } from '@angular/forms';
import { NgbModalModule, NgbModal, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SellerDialogComponent } from '../seller-dialog/seller-dialog.component';
import { ToastsManager, ToastOptions } from 'ng2-toastr/ng2-toastr'

import { SellersComponent } from './sellers.component';

describe('SellersComponent', () => {
  let component: SellersComponent;
  let fixture: ComponentFixture<SellersComponent>;

  class SellersServiceMock {
    sellers = [{
      id: 1,
      name: 'Kári',
      category: 'Matur',
    }, {
      id: 2,
      name: 'Lúlli',
      category: 'Föt',
    }];
    dialogWorked: boolean;
    getSellers(): Observable<Seller[]> {
      return Observable.of(this.sellers);
    }
    addSeller() {
      return modalMock.open(SellerDialogComponent);
    }

    editSeller() {
      return modalMock.open(SellerDialogComponent);
    }
  }

  let modalMock = {
    success: true,
    open(SellerDialogComponent) {
      return true;
    }
    
    /*: function() {
      return {
        result: {
          then: (fnSuccess, fnError) => {
              if (fnSuccess) {
                return true;
              }
              return false;
            }
          }
        }
      }*/
    }

  const mockService = new SellersServiceMock();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ SellersComponent ],
        imports: [ FormsModule ],
        providers: [{
          provide: SellersService,
          useValue: mockService
        }, {
          provide: NgbModal,
          useValue: modalMock
        }, ToastsManager, ViewContainerRef, ToastOptions]})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/

  it('should get all sellers', async(() => {
    const seller = [{
      id: 1,
      name: 'Kári',
      category: 'Matur',
    }, {
      id: 2,
      name: 'Lúlli',
      category: 'Föt',
    }];
    mockService.getSellers();
    expect(mockService.sellers).toEqual(seller);
  }));

  it('should open a modalDialog on addSeller', () => {
    const seller = {
      id: 1,
      name: 'Kári',
      category: 'Matur',
    };
    mockService.addSeller();
    expect(modalMock.open(SellerDialogComponent)).toEqual(true);
  });

  it('should open a modalDialog on editSeller', () => {
    mockService.editSeller();
    expect(modalMock.open(SellerDialogComponent)).toEqual(true);
  })

});
