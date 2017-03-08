import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SellersService } from '../sellers.service';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit {

  sellerID: number;
  id = 0;
  name: string;
  price: number;
  quantitySold: number;
  quantityInStock: number;
  imagePath: string;

  constructor(public activeModal: NgbActiveModal,
              private sellerService: SellersService) { }

  ngOnInit() {
  }

  onSave() {
    console.log(this);
    const productObj = {
      name: this.name,
      price: this.price,
      quantitySold: this.quantitySold,
      quantityInStock: this.quantityInStock,
      imagePath: this.imagePath
    };

    console.log('Seller obj :', productObj);
    console.log('sellerID :', this.sellerID);
    this.sellerService.postProduct(productObj, this.sellerID);
    this.activeModal.close();
  }

  onEdit() {
    console.log(this);
    const productObj = {
      id: this.id,
      name: this.name,
      price: this.price,
      quantitySold: this.quantitySold,
      quantityInStock: this.quantityInStock,
      imagePath: this.imagePath
    };
    
    this.sellerService.putProduct(productObj, this.sellerID);
    this.activeModal.close();
  }

  onCancel() {
    this.activeModal.dismiss();
  }

}
