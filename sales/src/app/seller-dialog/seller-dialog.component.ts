import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SellersService } from '../sellers.service';

@Component({
  selector: 'app-seller-dialog',
  templateUrl: './seller-dialog.component.html',
  styleUrls: ['./seller-dialog.component.css']
})

export class SellerDialogComponent implements OnInit {
  title: string;
  id: number;
  sellerName: string;
  category: string;
  imgPath: string;

  constructor(public activeModal: NgbActiveModal, private sellerService: SellersService) { }

  ngOnInit() {
  }

  onSave(): any {
    console.log(this);
    const sellerObj = {
      id: this.sellerService.nextId,
      name: this.sellerName,
      category: this.category,
      imagePath: this.imgPath
    };
    this.sellerService.postSeller(sellerObj);
    this.activeModal.close(sellerObj);
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
