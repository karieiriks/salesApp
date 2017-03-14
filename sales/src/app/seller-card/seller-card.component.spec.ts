/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA, ViewContainerRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SellersService, Seller, Product } from '../sellers.service';
import { NgbModalModule, NgbModal, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SellerCardComponent } from './seller-card.component';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { ToastsManager, ToastOptions, ToastContainer } from 'ng2-toastr/ng2-toastr';
import { Observable } from 'rxjs/Observable';


describe('SellerCardComponent', () => {
  let component: SellerCardComponent;
  let fixture: ComponentFixture<SellerCardComponent>;

  const mockService = {
    addedProduct: true,
    editedProduct: true,
    getSeller: true,
    getProducts: true,
    seller: {
      id: '1',
      name: 'Kári',
      category: 'Föt',
      imagePath: 'http://www.s.is'
    },
    products: [],
    add: {
      id: 1,
      name: 'Buxur',
      price: 100,
      quantitySold: 100,
      quantityInStock: 100,
      imagePath: 'www.s.is'
    },

    getSellerById: function() {
      return {
        subscribe: function(fnSuccess) {
          if (mockService.getSeller === true) {
            fnSuccess(mockService.seller);
          }
        }
      };
    },

    getSellersProduct: function() {
      return {
        subscribe: function(fnSuccess) {
          if (mockService.getProducts === true) {
            fnSuccess(mockService.products);
          }
        }
      };
    },

    postProduct: function() {
      return {
        subscribe: function(fnSuccess, fnError) {
          if (mockService.addedProduct === true) {
            fnSuccess(mockService.add);
          } else {
            fnError();
          }
        },
        then: (fn) => {
          fn();
        }
      };
    },

    putProduct: function() {
      return {
        subscribe: function(fnSuccess, fnError) {
          if (mockService.editedProduct === true) {
            fnSuccess(mockService.add);
          } else {
            fnError();
          }
        },
        then: (fn) => {
          fn();
        }
      };
    }

  };

  const modalMock = {
    success: true,
    product: {
      id: 1,
      name: 'Buxur',
      price: 100,
      quantitySold: 100,
      quantityInStock: 100,
      imagePath: 'www.s.is'
    },
    open: function() {
      return {
        result: {
          then: (fnSuccess) => {
              if (modalMock.success === true) {
                fnSuccess(modalMock.product);
              }
              return {
                catch: (fnError) => {
                  if (!modalMock.success) {
                    fnError('Dismissed by user');
                  }
                }
              };
          }
        },
        componentInstance: {
          title: 'text',
          model: {
          }
        },
      };
    }
  };


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerCardComponent ],
      imports: [ FormsModule, ReactiveFormsModule ],
      providers: [{
        provide: SellersService,
        useValue: mockService
      }, {
        provide: NgbModal,
        useValue: modalMock
      }, {
        provide: ActivatedRoute,
        useValue: { 'params': Observable.from([{ 'id': 1 }]) }
      }, ToastsManager, ViewContainerRef, ToastOptions],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open a modalDialog on add product', () => {
    mockService.add = {
      id: 1,
      name: 'Buxur',
      price: 100,
      quantitySold: 100,
      quantityInStock: 100,
      imagePath: 'www.s.is'
    };
    modalMock.success = true;
    component.products = [];
    component.addProduct();
    expect(component.products[0]).toEqual(mockService.add);
  });

  it('should close a modalDialog on add product', () => {
    modalMock.success = false;
    component.products = [];
    component.addProduct();
    expect(component.products).toEqual([]);
  });

  it('should open a modalDialog on edit product', () => {
    modalMock.success = true;
    const editedProduct = {
      id: 2,
      name: 'Sokkar',
      price: 300,
      quantitySold: 100,
      quantityInStock: 100,
      imagePath: 'www.s.is'
    };
    component.products = [{
      id: 1,
      name: 'Buxur',
      price: 100,
      quantitySold: 100,
      quantityInStock: 100,
      imagePath: 'www.s.is'
    }, {
      id: 2,
      name: 'Sokkar',
      price: 200,
      quantitySold: 100,
      quantityInStock: 100,
      imagePath: 'www.s.is'
    }];
    component.onEditProduct(editedProduct);
    expect(component.products[editedProduct.id - 1]).toEqual(editedProduct);
  });

  it('should close a modalDialog on edit product', () => {
    modalMock.success = false;
    const editedSeller = {
      id: 1,
      name: 'Buxur',
      price: 100,
      quantitySold: 100,
      quantityInStock: 100,
      imagePath: 'www.s.is'
    };
    component.products = [{
      id: 1,
      name: 'Buxur',
      price: 100,
      quantitySold: 100,
      quantityInStock: 100,
      imagePath: 'www.s.is'
    }, {
      id: 2,
      name: 'Sokkar',
      price: 200,
      quantitySold: 100,
      quantityInStock: 100,
      imagePath: 'www.s.is'
    }];
    component.onEditProduct(editedSeller);
    expect(component.products).toEqual(component.products);
  });

  it('should switch tab to see top ten products', () => {
    component.showTopTen();
    expect(component.showTopTenTab).toEqual(true);
  });

  it('should switch tab to see products', () => {
    component.showProducts();
    expect(component.showProductsTab).toEqual(true);
  });
});
