import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SellersService } from '../sellers.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit {

  title: string;
  sellerID: number;
  id = 0;
  name: string;
  price: number;
  quantitySold: number;
  quantityInStock: number;
  imagePath: string;

  // Validation vars
  invalidName: boolean;
  priceIsInvalid: boolean;
  quantitySoldIsInvalid: boolean;
  quantityInStockIsInvalid: boolean;

  nameError: string;
  priceError: string;
  quantitySoldError: string;
  quantityStockError: string;
  input: string;
  isTesting = false;

  constructor(public activeModal: NgbActiveModal) {
               }


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

    if (this.validateProductInfo()) {
      this.activeModal.close(productObj);
    }
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

    if (this.validateProductInfo()) {
      this.activeModal.close(productObj);
    }
  }

  onCancel() {
    this.activeModal.dismiss('Dismissed by user');
  }

  validateProductInfo() {
    this.invalidName = false;
    this.priceIsInvalid = false;
    this.quantityInStockIsInvalid = false;
    this.quantitySoldIsInvalid = false;
    let res = true;
    if (this.isTesting !== true) {
      this.input = (<HTMLInputElement>document.getElementById('nameField')).value;
    }
    if(this.input === '') {
      this.invalidName = true;
      this.nameError = 'Vinsamlegast sláðu inn nafn...';
      res = false;
    }

    if(this.isNumeric(this.name)) {
      this.invalidName = true;
      this.nameError = 'Nafn verður að innihalda bókstafi...';
      res = false;
    }

    if(this.hasInvalidSymbols(this.name)) {
      this.invalidName = true;
      this.nameError = 'Fjarlægið ólögleg tákn...';
      res = false;
    }

    if(!this.isNumeric(this.price) || this.price < 0) {
      this.priceIsInvalid = true;
      this.priceError = 'Verð verður að vera jákvæð tala...';
      res = false;
    }

    if(!this.isNumeric(this.quantitySold) || this.quantitySold < 0) {
      this.quantitySoldIsInvalid = true;
      this.quantitySoldError = 'Magn selt verður að vera jákvæð tala...';
      res = false;
    }

    if(!this.isNumeric(this.quantityInStock) || this.quantityInStock < 0) {
      this.quantityInStockIsInvalid = true;
      this.quantityStockError = 'Birgðamagn verður að vera jákvæð tala...';
      res = false;
    }
    return res;
  }

  // Check if string
  isNumeric(word) {
    return !isNaN(parseFloat(word)) && isFinite(word);
    // Lánað frá stackoverflow http://stackoverflow.com/questions/18082/validate-decimal-numbers-in-javascript-isnumeric
  }

  hasInvalidSymbols(word) {
    const patt = new RegExp(/[~`!#$%\^&*+=\-\([\])\\';,/{}|\\":<>\?]/);
    if (patt.test(word)) {
      return true;
    } else {
      return false;
    }
  }
}