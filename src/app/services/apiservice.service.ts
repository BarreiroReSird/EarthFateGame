import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private http: HttpClient) {}

  linkLogin: string = "http://moreiramoises.pt/server/apis/login.php";

  login(){
    let bodyData: FormData = new FormData();
    bodyData.append("username", "Moises");
    bodyData.append("password", "Gato");

    return this.http.get(this.linkLogin, );
  }
}
