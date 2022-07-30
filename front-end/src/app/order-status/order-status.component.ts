import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css']
})
export class OrderStatusComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  
  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
