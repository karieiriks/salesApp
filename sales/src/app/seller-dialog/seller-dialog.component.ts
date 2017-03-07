import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SellersService } from '../sellers.service';

@Component({
  selector: 'app-seller-dialog',
  templateUrl: './seller-dialog.component.html',
  styleUrls: ['./seller-dialog.component.css']
})

export class SellerDialogComponent implements OnInit {
  id = 0;
  sellerName: string;
  category: string;
  imgPath: string;

  constructor(public activeModal: NgbActiveModal, private sellerService: SellersService) { }

  ngOnInit() {
  }

  onSave() {
    console.log(this);
    const sellerObj = {
      name: this.sellerName,
      category: this.category,
      imagePath: this.imgPath
    };
    this.sellerService.postSeller(sellerObj);
    this.activeModal.close();

    /*
    let newID = sellers.length + 1;
    
    this.activeModal.close({
      id: newID,
      name: this.sellerName,
      category: this.category,
      imgPath: this.imgPath
    });
    */
  }

  onEdit() {
    console.log(this);
    const sellerObj = {
      id: this.id,
      name: this.sellerName,
      category: this.category,
      imagePath: this.imgPath
    };
    console.log('Seller obj :', sellerObj);
    this.sellerService.putSeller(sellerObj);
    this.activeModal.close();
  }

  onCancel() {
    this.activeModal.dismiss();
  }

}
