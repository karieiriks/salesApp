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

  let sellersServiceMock = {
    addedSeller: true,
    editedSeller: true,
    sellers: [{
      id: 1,
      name: 'Kári',
      category: 'Matur',
    }, {
      id: 2,
      name: 'Lúlli',
      category: 'Föt',
    }],

    seller: {
      name: 'Kári',
      category: 'Matur',
      imagePath: 'www.s.is'
    },


    getSellers(): Observable<Seller[]> {
      return Observable.of(this.sellers);
    },

    postSeller: function() {
      return {
        subscribe: function(fnSuccess, fnError) {
          if (sellersServiceMock.addedSeller === true) {
            fnSuccess(sellersServiceMock.seller);
          } else {
            fnError();
          }
        }
      }
    },

    putSeller: function() {
      return {
        subscribe: function(fnSuccess, fnError) {
          if (sellersServiceMock.editedSeller === true) {
            fnSuccess(sellersServiceMock.seller);
          } else {
            fnError();
          }
        }
      }
    }
  };

  const modalMock = {
    success: true,
    seller: {
      name: 'Kári',
      category: 'Matur',
      imagePath: 'www.s.is'
    },
    open: function() {
      return {
        result: {
          then: (fnSuccess, fnError) => {
              if (modalMock.success === true) {
                fnSuccess(modalMock.seller);
              } else {
                fnError();
              }
          }
        },
        componentInstance: {
          title: 'text',
          model: {

          }
        },
      }
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ SellersComponent ],
        imports: [ FormsModule ],
        providers: [{
          provide: SellersService,
          useValue: sellersServiceMock
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

  /*it('should get all sellers', async(() => {
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
  }));*/

  it('should open a modalDialog on addSeller', () => {
    sellersServiceMock.seller = {
      name: 'Kári',
      category: 'Matur',
      imagePath: 'www.s.is'
    };
    component.sellers = [];
    component.addSeller();
    expect(component.sellers[0]).toEqual(sellersServiceMock.seller);
  });

  xit('should open a modalDialog on editSeller', () => {
    mockService.editSeller();
    expect(modalMock.open()).toEqual(true);
  });

});
