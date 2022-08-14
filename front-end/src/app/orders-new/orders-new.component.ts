import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../service/data.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';


@Component({
  selector: 'app-orders-new',
  templateUrl: './orders-new.component.html',
  styleUrls: ['./orders-new.component.css'],

})
export class OrdersNewComponent implements OnInit {

  data:any;

  newOrderFormSubmitted = false;
  companies:any;
  products:any;

  orderStatuses:any;
  amount:any;
  amountParsed:any;
  priceParsed:any;

  productsMap = new Map<string, number>();
  productsArray:any;

  totalPrice:number=0;
  tempProduct:any;

  constructor(private router:Router, private dataService:DataService, private formBuilder:FormBuilder, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getCompanies();
    this.getProducts();
    
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  goBack(){
    this.router.navigate(['/orders']);
  }

  newOrderForm = new FormGroup({
    date:new FormControl('', [Validators.required, Validators.pattern(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)]),
    company:new FormControl('', [Validators.required]),
    orderStatus:new FormControl(1, [Validators.required]),
    totalPrice:new FormControl(0),

  });

  get date(){
    return this.newOrderForm.get('date');
  }
  get company(){
    return this.newOrderForm.get('company_id');
  }
  get orderStatus(){
    return this.newOrderForm.get('order_status_id');
  }

  saveOrder(){
    this.newOrderFormSubmitted = true;
    if(this.newOrderForm.invalid){
      return;
    }
    console.log(this.newOrderForm.value);
    this.toggleShowSpinner();
    this.dataService.newOrder(this.newOrderForm.value).subscribe(res => {
      this.data=res;
      console.log(res);
      if(this.data.status === 201){
        this.toastr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.status), {
          timeOut: 4000,
          progressBar: true
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        this.toastr.error(JSON.stringify("There was an error while processing that request."), JSON.stringify(501), {
          timeOut: 4000,
          progressBar: true
        });
      }
      this.newOrderFormSubmitted = true;
      this.newOrderForm.reset();
    });
  }

  isShownSpinner: boolean = false ; // hidden by default

  toggleShowSpinner() {
    this.isShownSpinner = ! this.isShownSpinner;
  }

  getCompanies(){
    this.dataService.getCompanies().subscribe(res => {
      this.companies = res;
    })
  }

  getProducts(){
    this.dataService.getProducts().subscribe(res => {
      this.products = res;
    })
  }


/*   addProductToOrder(product:any){

    if(this.productsMap.has(product.id)){
      
      this.amountParsed=this.productsMap.get(product.id);
      this.totalPrice=this.totalPrice-this.amountParsed*product.price;
      this.productsMap.delete(product.id);

      console.log(this.amountParsed);
      console.log(this.productsMap);
      alert("You have removed the product");
    }else{
      this.amount = prompt("Please enter the amount for this product");
      this.amountParsed=parseFloat(this.amount);
      if(this.amountParsed!=0 && this.amountParsed!=null && this.amountParsed>0 && !isNaN(this.amountParsed)){
        this.productsMap.set(product.id, this.amountParsed);
        this.totalPrice=this.totalPrice+this.amountParsed*product.price;
        
      }else{
        alert("Please enter number greater than 0!");
        return;
      }
    }
  } */




}









  

