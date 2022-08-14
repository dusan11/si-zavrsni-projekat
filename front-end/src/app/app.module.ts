import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';

import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth.guard';

import { MaterialModule } from './material/material.module';


import { UserComponent } from './user/user.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyTypeComponent } from './company-type/company-type.component';
import { OrderStatusComponent } from './order-status/order-status.component';
import { OrdersNewComponent } from './orders-new/orders-new.component';
import { OrdersEditComponent } from './orders-edit/orders-edit.component';


const routes:Routes = [
  {
    path: '', component:HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register', component:RegisterComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login', component:LoginComponent
  },
  {
    path: 'account', component:UserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'companies', component:CompaniesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'company-type', component:CompanyTypeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'order-status', component:OrderStatusComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'orders', component:OrdersComponent,
    children: [
      {
        path:'new', component:OrdersNewComponent
      },
      {
        path:'edit/:id', component:OrdersEditComponent
      }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'products', component:ProductsComponent,
    canActivate: [AuthGuard]
  }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    OrdersComponent,
    ProductsComponent,
    CompaniesComponent,
    CompanyTypeComponent,
    OrderStatusComponent,
    OrdersNewComponent,
    OrdersEditComponent,

  ],
  imports: [
    MaterialModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
