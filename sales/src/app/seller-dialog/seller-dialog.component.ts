import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SellersService } from '../sellers.service';
import { FormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Seller } from '../seller.model';

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

  form: FormGroup;

  model = new Seller(0,'','','');

  constructor(public activeModal: NgbActiveModal, 
              private sellerService: SellersService, 
              public fb: FormBuilder) {
    
    this.form = this.fb.group({
      sellerName: ['', Validators.required],
      category: ['', Validators.required],
      imgPath: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onSave(): any {
    console.log(this);
    const sellerObj = {
      id: this.sellerService.nextId,
      name: this.model.sellerName,
      category: this.model.category,
      imagePath: this.model.imgPath
    };
    this.sellerService.nextId++;
    //this.sellerService.postSeller(sellerObj);
    this.activeModal.close(sellerObj);
  }

  onEdit() {
    console.log(this);
    const sellerObj = {
      id: this.model.id,
      name: this.model.sellerName,
      category: this.model.category,
      imagePath: this.model.imgPath
    };
    console.log('Seller obj :', sellerObj);
    //this.sellerService.putSeller(sellerObj);
    this.activeModal.close(sellerObj);
  }

  onCancel() {
    this.activeModal.dismiss();
  }
}
