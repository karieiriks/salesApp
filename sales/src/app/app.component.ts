import { Component, OnInit } from '@angular/core';
import { SellersService, Seller } from './sellers.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SellerDialogComponent } from './seller-dialog/seller-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sölusíðan sveittir bændur';

  constructor() {}

<<<<<<< HEAD
  addSeller() {
    console.log('addSeller() clicked');
    const modalInstance = this.modalService.open(SellerDialogComponent);
    modalInstance.componentInstance.sellerName = 'Lúlli';
    modalInstance.componentInstance.category = 'Flokkur';
    modalInstance.componentInstance.imgPath = 'Mynd';
    modalInstance.result.then(obj => {
      console.log('When pressed OK');
      console.log('Dialog object :', obj);
    }).catch(err => {
      console.log('When pressed Cancel');
      console.log(err);
    });
  }

  editSeller(s: Seller) {
    console.log(s);
    const modelInstance = this.modalService.open(SellerDialogComponent);
    modelInstance.componentInstance.id = s.id;
    modelInstance.componentInstance.sellerName = s.name;
    modelInstance.componentInstance.category = s.category;
    modelInstance.componentInstance.imgPath = s.imagePath;
    modelInstance.result.then(obj => {
      console.log('When pressed OK');
      console.log(obj);
    }).catch(err => {
      console.log('When presses Cancel');
      console.log(err);
    });
  }*/
=======
  ngOnInit() {}
>>>>>>> 72c8491900b99363bd40ae43cb6c1696cdeac161
}
