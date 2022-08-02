import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-company-type',
  templateUrl: './company-type.component.html',
  styleUrls: ['./company-type.component.css']
})
export class CompanyTypeComponent implements OnInit {

  companyType:any;
  editCompanyTypeFormSubmitted = false;
  newCompanyTypeFormSubmitted = false;
  data:any;
  editType:any;
  companyTypeID:any;

  constructor(private router:Router, private dataService:DataService, private formBuilder:FormBuilder, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getAllCompanyTypes();
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getAllCompanyTypes(){
    this.dataService.getCompanyTypes().subscribe(res => {
      this.companyType = res;
    })
  }

  editCompanyTypeSetData(id:any){
    this.dataService.getCompanyTypeById(id).subscribe(res=>{
      this.data=res;
      this.editType = this.data.type;
      this.companyTypeID=id;
    })
  }

  editCompanyTypeForm = new FormGroup({
    type:new FormControl('', [Validators.required])
  });
  get type(){
    return this.editCompanyTypeForm.get('type');
  }

  
  editCompanyType(){
    this.editCompanyTypeFormSubmitted = true;
    if(this.editCompanyTypeForm.invalid){
      return;
    }
    this.toggleShowSpinner();
    this.dataService.editCompanyType(this.editCompanyTypeForm.value, this.companyTypeID).subscribe(res=>{
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
      this.editCompanyTypeFormSubmitted = false;
      this.editCompanyTypeForm.reset();
    });
  }

  newCompanyTypeForm = new FormGroup({
    type:new FormControl('', [Validators.required])
  });
  get typeNew(){
    return this.newCompanyTypeForm.get('type');
  }

  saveNewCompanyType(){
    this.newCompanyTypeFormSubmitted = true;
    if(this.newCompanyTypeForm.invalid){
      return;
    }
    this.toggleShowSpinner();
    console.log(this.newCompanyTypeForm.value);
    this.dataService.newCompanyType(this.newCompanyTypeForm.value).subscribe(res => {
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
      this.newCompanyTypeFormSubmitted = false;
      this.newCompanyTypeForm.reset();
    });
  }

  isShownSpinner: boolean = false ; // hidden by default

  toggleShowSpinner() {
    this.isShownSpinner = ! this.isShownSpinner;
  }
}
