import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-type',
  templateUrl: './company-type.component.html',
  styleUrls: ['./company-type.component.css']
})
export class CompanyTypeComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
