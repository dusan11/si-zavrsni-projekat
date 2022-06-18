import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DataService } from '../service/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  data:any;

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private toastr: ToastrService) { }

  createForm(){
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required, Validators.minLength(4)],
    })
  }
  ngOnInit(): void {
    this.createForm();
    //this.registerForm();
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    this.submitted = true;
    if(this.form.invalid){
      return;
    }
  }



  registerForm = new FormGroup({
    name:new FormControl('', [Validators.required]),
    email:new FormControl('', [Validators.required, Validators.email]),
    password:new FormControl('', [Validators.required, Validators.minLength(5)])
  });

  registerUser(){
    this.submitted = true;
    if(this.registerForm.invalid){
      return;
    }

    this.dataService.register(this.registerForm.value).subscribe(res => {
      this.data=res;
      console.log(res);
      if(this.data.status === 1){
        this.toastr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.code), {
          timeOut: 2000,
          progressBar: true
        });
      } else {
        this.toastr.error(JSON.stringify(this.data.message), JSON.stringify(this.data.code), {
          timeOut: 2000,
          progressBar: true
        });
      }
      this.submitted = true;
      this.registerForm.reset();
    });
   

  }

  get name(){
    return this.registerForm.get('name');
  }
  get email(){
    return this.registerForm.get('email');
  }
  get password(){
    return this.registerForm.get('password');
  }

}
