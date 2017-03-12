/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SellersService } from './sellers.service';
import { FormsModule } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import { Observable} from 'rxjs/Observable';
import { Seller, Product } from './sellers.service';

describe('SellersService', () => {
  
  class MockHttp {
    sellers = [{
      id: 1,
      name: 'Kári',
      category: 'Matur',
    }, {
      id: 2,
      name: 'Lúlli',
      category: 'Föt',
    }];

    getSellers(): Observable<Seller[]> {
      return Observable.of(this.sellers);
    }

    post() {

    }

    put() {

    }
  }

  let mockHttp = new MockHttp();

  beforeEach(() => {
    TestBed.configureTestingModule({
       imports: [ FormsModule ],
      providers: [{
        provide: Http,
        useValue: mockHttp
      }]
    });
  });

  /*xit('should ...', inject([SellersService], (service: SellersService) => {
    expect(service).toBeTruthy();
  }));*/

  it('should get all sellers from Api', () => {
    let sellers = [{
      id: 1,
      name: 'Kári',
      category: 'Matur',
    }, {
      id: 2,
      name: 'Lúlli',
      category: 'Föt',
    }];
    expect(mockHttp.getSellers()).toEqual(sellers);
  })
});
