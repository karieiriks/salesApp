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

  ngOnInit() {}

}
