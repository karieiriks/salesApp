/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SellerDialogComponent } from './seller-dialog.component';

describe('SellerDialogComponent', () => {
  let component: SellerDialogComponent;
  let fixture: ComponentFixture<SellerDialogComponent>;

  class SellerServiceMock {
    fakeModel = {
      id: 0,
      name: 'newName',
      category: 'newCategory',
      imgPath: 'newImgPath'
    }
    onSave() {

    }

    onEdit() {

    }

    onCancel() {

    }
  }

  const mockModal = {
    onSavePressed: true,
    seller: {
      id: 5,
      name: 'newName',
      category: 'newCategory',
      imgPath: 'imgPath'
    },
    onSave: function() {
      return {
        result: {
          then: function(fnSave, fnCancel) {
            if(mockModal.onSavePressed === true) {
              fnSave(mockModal.seller);
            } else {
              fnCancel()
            }
          }
        }
      };
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should add a new seller onSave()', () => {
    let seller: {
      id: 5,
      name: 'newName',
      category: 'newCategory',
      imgPath: 'imgPath'
    };

    expect(mockModal.onSave()).toEqual(seller);
  });

});
