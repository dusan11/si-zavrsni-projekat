import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  token:any;
  userData:any;
  userEmail:any;
  userId:any;

  userInfo:any;
  userName:any;
  createdAt:any;
  constructor(private router:Router, private dataService:DataService) { }

  ngOnInit(): void {
    this.token = sessionStorage.getItem('token');
    this.userData = jwt_decode(this.token);
  //  console.log(this.userData);

    this.userEmail = this.userData.email;
    this.userId = this.userData.user_id;

    this.dataService.userInfo(this.userId).subscribe(res => {
      this.userInfo = res;
      this.userName = this.userInfo.name;
    //  console.log(res);
    });

  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
