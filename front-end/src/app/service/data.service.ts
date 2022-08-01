import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  register(data: any){
    return this.http.post(environment.apiUrl+'/api/register', data);
  }

  login(data: any){
    return this.http.post(environment.apiUrl+'/api/login', data)
  }

  userInfo(userId:any){
    return this.http.get(environment.apiUrl+'/api/user/'+userId);
  }

  changeUserName(data: any, userId:any){
    return this.http.put(environment.apiUrl+'/api/user/'+userId+'/change-name', data);
  }

  changeUserEmail(data: any, userId:any){
    return this.http.put(environment.apiUrl+'/api/user/'+userId+'/change-email', data);
  }

  getProducts(){
    return this.http.get(environment.apiUrl+'/api/product');
  }

  getProductsById(id:any){
    return this.http.get(environment.apiUrl+'/api/product/'+id);
  }

  newProduct(data:any){
    return this.http.post(environment.apiUrl+'/api/product', data);
  }

  deleteProduct(id:any){
    return this.http.delete(environment.apiUrl+'/api/product/'+id);
  }

  editProduct(data:any, id:any){
    return this.http.put(environment.apiUrl+'/api/product/'+id, data);
  }

  getCompanies(){
    return this.http.get(environment.apiUrl+'/api/company');
  }

  getCompanyTypes(){
    return this.http.get(environment.apiUrl+'/api/company-type');
  }

  getCompanyById(id:any){
    return this.http.get(environment.apiUrl+'/api/company/'+id);
  }

  newCompany(data:any){
    return this.http.post(environment.apiUrl+'/api/company', data);
  }

  deleteCompany(id:any){
    return this.http.delete(environment.apiUrl+'/api/company/'+id);
  }

  editCompany(data:any, id:any){
    return this.http.put(environment.apiUrl+'/api/company/'+id, data);
  }

  getCompanyTypeById(id:any){
    return this.http.get(environment.apiUrl+'/api/company-type/'+id);
  }

  newCompanyType(data:any){
    return this.http.post(environment.apiUrl+'/api/company-type', data);
  }

  editCompanyType(data:any, id:any){
    return this.http.put(environment.apiUrl+'/api/company-type/'+id, data);
  }

  getOrderStatuses(){
    return this.http.get(environment.apiUrl+'/api/order-status');
  }

  getOrderStatusById(id:any){
    return this.http.get(environment.apiUrl+'/api/order-status/'+id);
  }

  newOrderStatus(data:any){
    return this.http.post(environment.apiUrl+'/api/order-status', data);
  }

  editOrderStatus(data:any, id:any){
    return this.http.put(environment.apiUrl+'/api/order-status/'+id, data);
  }


}
