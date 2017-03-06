import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http'
import { Observable} from 'rxjs/Observable'
import 'rxjs/rx'

export interface Seller {
  id: number;
  name: string;
  category: string;
  imagePath: string;
}

@Injectable()
export class SellersService {

  constructor(private http: Http) { }

  getSellers(): Observable<Seller[]> {
    console.log('Calling getSellers');
    return this.http.get('http://localhost:5000/api/sellers')
    .map(response =>{
      return <Seller[]> response.json();
    });
  }

  getSellerById(id: number) : Observable<Seller> {
    return this.http.get(`http://localhost:5000/api/sellers/${id}`)
    .map(response => {
      return <Seller> response.json();
    });
  }

  postSeller(sellerInfo: any) {
    console.log('Inside service :', sellerInfo);
    console.log('Sending POST request for a new seller');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const obj = JSON.stringify(sellerInfo);
    return this.http.post('http://localhost:5000/api/sellers',obj, {headers: headers}).toPromise();
  }

  putSeller(sellerUpdatedInfo: any) {
    console.log('Inside service :', sellerUpdatedInfo);
    console.log('Sending PUT request for a new seller');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const id = sellerUpdatedInfo.id;
    const obj = JSON.stringify(sellerUpdatedInfo);
    return this.http.put(`http://localhost:5000/api/sellers/${id}`,obj, {headers: headers}).toPromise();
  }

}
