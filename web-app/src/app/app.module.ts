import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CarsComponent } from './cars/cars.component';
import { CarService } from './cars/cars.service';
import { ClientIdComponent } from './client-id/client-id.component';
import { HomeComponent } from './home/home.component';
import { PaymentComponent } from './payment/payment.component';
import { AddpaymentComponent } from './addpayment/addpayment.component';
import { InsertcreditComponent } from './insertcredit/insertcredit.component';
import { InsertdebitComponent } from './insertdebit/insertdebit.component';
import { ClientIdService } from './client-id/client-id.service';
import { PaymentService } from './payment/payment.service';
import { InsertcreditService } from './insertcredit/insertcredit.service';
import { PixComponent } from './pix/pix.component';
import { PicpayComponent } from './picpay/picpay.component';
import { PaypalComponent } from './paypal/paypal.component';
import { RemoveComponent } from './remove/remove.component';
import { ErasepayComponent } from './erasepay/erasepay.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CarsComponent,
    ClientIdComponent,
    HomeComponent,
    PaymentComponent,
    AddpaymentComponent,
    InsertcreditComponent,
    InsertdebitComponent,
    PixComponent,
    PicpayComponent,
    PaypalComponent,
    RemoveComponent,
    ErasepayComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: 'cars',
        component: CarsComponent
      },
      {
        path: 'user',
        component: ClientIdComponent
      },
      {
        path: 'user/pay',
        component: PaymentComponent
      },
      {
        path: 'addpayment',
        component: AddpaymentComponent
      },
      {
        path: 'addpayment/insertcredit',
        component: InsertcreditComponent
      },
      {
        path: 'addpayment/insertdebit',
        component: InsertdebitComponent
      },
      {
        path: 'home',
        component: HomeComponent
      }
    ])
  ],
  providers: [CarService,ClientIdService,PaymentService,InsertcreditService],
  bootstrap: [AppComponent]
})
export class AppModule { }
