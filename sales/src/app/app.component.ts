import { Component, OnInit } from '@angular/core';
import { SellersService, Seller } from './sellers.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!!!!';

  private sellers: Seller[];
  private seller: Seller;

  constructor(private service: SellersService){}

  ngOnInit() {
    var successHandler = (result) => {
      this.seller = result;
    };

    var errorHandler = (err) => {
      // TODO display toastr!
      console.log('Something failed');
    };

    console.log("this.sellers");
    this.service.getSellers().subscribe(result => {
      this.sellers = result;
    }/*,(err) => {
      // TODO display toastr!
      console.log('Something failed');
    }*/ );
    /*this.service.getSellers().subscribe(successHandler, errorHandler);*/
    this.service.getSellerById(2).subscribe(result => {
      this.seller = result;
    });
  }
}
