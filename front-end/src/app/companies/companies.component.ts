import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  companies:any;
  company_type:any;
  editCompanyFormSubmitted = false;
  newCompanyFormSubmitted = false;
  data:any;
  editName:any;
  editAdress:any;
  editAccountNo:any;
  editEmail:any;
  editRespPerson:any;
  editCompTypeId:any;
  editCompTypeType:any;
  companyId:any;


  constructor(private router:Router, private dataService:DataService, private formBuilder:FormBuilder, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getAllCompanies();
    this.getAllCompanyTypes();
  }
  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getAllCompanies(){
    this.dataService.getCompanies().subscribe(res => {
      this.companies = res;
    })
  }

  getAllCompanyTypes(){
    this.dataService.getCompanyTypes().subscribe(res => {
      this.company_type = res;
    })
  }

  editCompanySetData(id:any){
    this.dataService.getCompanyById(id).subscribe(res=>{
      this.data=res;
      this.editName = this.data.name;
      this.editAdress = this.data.adress;
      this.editAccountNo = this.data.account_no;
      this.editEmail = this.data.email;
      this.editRespPerson = this.data.responsible_person;
      this.editCompTypeId = this.data.company_type.id;
      this.editCompTypeType = this.data.company_type.type;
      this.companyId=id;
    });


  }

  deleteCompany(id:any){
    this.dataService.deleteCompany(id).subscribe(res=>{
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

  editCompanyForm = new FormGroup({
    name:new FormControl('', [Validators.required]),
    adress:new FormControl('', [Validators.required]),
    account_no:new FormControl('', [Validators.required]),
    email:new FormControl('', [Validators.required, Validators.email]),
    responsible_person:new FormControl('', [Validators.required]),
    company_type:new FormControl('')
  });
  get name(){
    return this.editCompanyForm.get('name');
  }
  get adress(){
    return this.editCompanyForm.get('adress');
  }
  get account_no(){
    return this.editCompanyForm.get('account_no');
  }
  get email(){
    return this.editCompanyForm.get('email');
  }
  get responsible_person(){
    return this.editCompanyForm.get('responsible_person');
  }
  get comp_type(){
    return this.editCompanyForm.get('company_type');
  }

  editCompany(){
    this.editCompanyFormSubmitted = true;
    if(this.editCompanyForm.invalid){
      return;
    }

    this.dataService.editCompany(this.editCompanyForm.value, this.companyId).subscribe(res=>{
      this.data=res;
      console.log(res);
      console.log(this.editCompanyForm.value);
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
      this.editCompanyFormSubmitted = true;
      this.editCompanyForm.reset();
    });
    
  }

  displayStyle = "none";
  
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

  newCompanyForm = new FormGroup({
    name:new FormControl('', [Validators.required]),
    adress:new FormControl('', [Validators.required]),
    account_no:new FormControl('', [Validators.required]),
    email:new FormControl('', [Validators.required, Validators.email]),
    responsible_person:new FormControl('', [Validators.required]),
    company_type:new FormControl('', [Validators.required])
  });
  get nameNew(){
    return this.editCompanyForm.get('name');
  }
  get adressNew(){
    return this.editCompanyForm.get('adress');
  }
  get account_noNew(){
    return this.editCompanyForm.get('account_no');
  }
  get emailNew(){
    return this.editCompanyForm.get('email');
  }
  get responsible_personNew(){
    return this.editCompanyForm.get('responsible_person');
  }
  get comp_typeNew(){
    return this.editCompanyForm.get('company_type');
  }

  saveNewCompany(){
    this.newCompanyFormSubmitted = true;
    if(this.newCompanyForm.invalid){
      return;
    }
    console.log(this.newCompanyForm.value)

    this.dataService.newCompany(this.newCompanyForm.value).subscribe(res => {
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
      this.newCompanyFormSubmitted = true;
      this.newCompanyForm.reset();
    });
  }

}
