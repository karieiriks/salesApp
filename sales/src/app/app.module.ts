import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { AppComponent } from './app.component';
import { SellersService } from './sellers.service';
import { SellerCardComponent } from './seller-card/seller-card.component';
import { SellerDialogComponent } from './seller-dialog/seller-dialog.component';
import { SellersComponent } from './sellers/sellers.component';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { ProductCardComponent } from './product-card/product-card.component';


@NgModule({
  declarations: [
    AppComponent,
    SellerCardComponent,
    SellerDialogComponent,
    SellersComponent,
    ProductDialogComponent,
    ProductCardComponent
  ],
  imports: [
    [BrowserModule, ToastModule.forRoot()],
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    ToastModule.forRoot(),
    RouterModule.forRoot([{
      path: '',
      redirectTo: 'sellers',
      pathMatch: 'full'
    }, {
      path: 'sellers',
      component: SellersComponent,
    }, {
      path: 'sellers/:id',
      component: SellerCardComponent
    }])
  ],
  /*
      RouterModule.forRoot([{
      path: '',
      redirectTo: 'sellers',
      pathMatch: 'full'
    }, {
      path: 'sellers',
      component: AppComponent,
    }, {
      path: 'sellers/:id',
      component: SellerCardComponent
    }])
  ],
  */
  providers: [SellersService],
  bootstrap: [AppComponent],
  entryComponents: [SellerDialogComponent, ProductDialogComponent]
})
export class AppModule { }

