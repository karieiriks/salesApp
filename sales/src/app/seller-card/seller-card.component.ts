import { Component, OnInit, Input } from '@angular/core';
import { Seller, SellersService, Product } from '../sellers.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seller-card',
  templateUrl: './seller-card.component.html',
  styleUrls: ['./seller-card.component.css']
})
export class SellerCardComponent implements OnInit {

  sellerId: number;
  seller: Seller;
  sellerProducts: Product[];

  constructor(private activatedRoute: ActivatedRoute, 
              private sellerService: SellersService) { }

  ngOnInit() {
    const route = this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.sellerId = <number> id;
    });
    this.getSeller(this.sellerId);
    this.sellerService.getSellersProduct(this.sellerId).subscribe(result => {
      this.sellerProducts = result;
    });
  }

  getSeller(id: number) {
    this.sellerService.getSellerById(this.sellerId).subscribe(result => {
      this.seller = result;
      console.log(result);
    });
    console.log(this.seller);
  }
}
