import { Component, OnInit, Input } from '@angular/core';
import { Seller } from '../sellers.service';

@Component({
  selector: 'app-seller-card',
  templateUrl: './seller-card.component.html',
  styleUrls: ['./seller-card.component.css']
})
export class SellerCardComponent implements OnInit {

  @Input()
  seller: Seller;

  constructor() { }

  ngOnInit() {
  }

}
