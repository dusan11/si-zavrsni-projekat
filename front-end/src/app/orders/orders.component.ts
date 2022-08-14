import { Template } from '@angular/compiler/src/render3/r3_ast';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders:any;
  data:any;

  constructor(private router:Router, private dataService:DataService, private formBuilder:FormBuilder, private toastr:ToastrService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllOrders();
  }
  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getAllOrders(){
    this.dataService.getOrder().subscribe(res => {
      this.orders = res;
    })
  }

  newOrder(){
    this.router.navigate(['new'], {relativeTo:this.route});
  }

  editOrder(order:any){
    this.router.navigate(['edit/'+order.id], {relativeTo:this.route});
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    

  }


}
