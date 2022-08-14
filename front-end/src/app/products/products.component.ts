import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products:any;
  editProductFormSubmitted = false;
  newProductFormSubmitted = false;
  data:any;
  editName:any;
  editManifacturer:any;
  editCertificate:any;
  editPrice:any;
  productId:any;


  constructor(private router:Router, private dataService:DataService, private formBuilder:FormBuilder, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }
  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getAllProducts(){
    this.dataService.getProducts().subscribe(res => {
      this.products = res;
    })
  }

  editProductSetData(id:any){
    this.dataService.getProductsById(id).subscribe(res=>{
      this.data=res;
      this.editName = this.data.name;
      this.editManifacturer = this.data.manifacturer;
      this.editCertificate = this.data.certificate_number;
      this.editPrice = this.data.price;
      this.productId=id;

      this.editProductForm.setValue({
        name:this.editName,
        manifacturer:this.editManifacturer,
        certificate_number:this.editCertificate,
        price:this.editPrice
  
      })
    })


  }

  deleteProduct(id:any){
    this.dataService.deleteProduct(id).subscribe(res=>{
      this.data=res;
      console.log(res);
      if(this.data.status === 204){
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
    })
  }

  editProductForm = new FormGroup({
    name:new FormControl('', [Validators.required]),
    manifacturer:new FormControl('', [Validators.required]),
    certificate_number:new FormControl('', [Validators.required]),
    price:new FormControl('', [Validators.required])
  });
  get name(){
    return this.editProductForm.get('name');
  }
  get manifacturer(){
    return this.editProductForm.get('manifacturer');
  }
  get certificate_number(){
    return this.editProductForm.get('certificate_number');
  }
  get price(){
    return this.editProductForm.get('price');
  }

  editProduct(){
    this.editProductFormSubmitted = true;
    if(this.editProductForm.invalid){
      return;
    }
    this.toggleShowSpinnerEdit();
    this.dataService.editProduct(this.editProductForm.value, this.productId).subscribe(res=>{
      this.data=res;
      console.log(res);
      if(this.data.status === 204){
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
      this.editProductFormSubmitted = true;
      this.editProductForm.reset();
    });
    
  }

  displayStyle = "none";
  
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

  newProductForm = new FormGroup({
    name:new FormControl('', [Validators.required]),
    manifacturer:new FormControl('', [Validators.required]),
    certificate_number:new FormControl('', [Validators.required]),
    price:new FormControl('', [Validators.required, Validators.pattern('^\[0-9]+(\.[0-9][0-9])?')])
  });

  get nameNew(){
    return this.newProductForm.get('name');
  }
  get manifacturerNew(){
    return this.newProductForm.get('manifacturer');
  }
  get certificate_numberNew(){
    return this.newProductForm.get('certificate_number');
  }
  get priceNew(){
    return this.newProductForm.get('price');
  }

  saveNewProduct(){
    this.newProductFormSubmitted = true;
    if(this.newProductForm.invalid){
      return;
    }
    this.toggleShowSpinnerNew();
    this.dataService.newProduct(this.newProductForm.value).subscribe(res => {
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
      this.newProductFormSubmitted = true;
      this.newProductForm.reset();
    });
  }

  isShownSpinnerEdit: boolean = false ; // hidden by default
  isShownSpinnerNew: boolean = false ; // hidden by default

  toggleShowSpinnerEdit() {
    this.isShownSpinnerEdit = ! this.isShownSpinnerEdit;
  }

  toggleShowSpinnerNew() {
    this.isShownSpinnerNew = ! this.isShownSpinnerNew;
  }

}
