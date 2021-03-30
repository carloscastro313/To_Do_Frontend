import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private jwt : JwtHelperService) { }

  public login (email, password, router : Router){
    return new Promise<any>((resolve,rejects) =>{
      this.http.post('https://examen-todo-app.herokuapp.com/login/',{
      email,
      password
      }).subscribe((data : any) => {

        resolve('');
        localStorage.setItem('token',data.token);
        localStorage.setItem('id',data.user.id);
        localStorage.setItem('username',data.user.username);
        router.navigate(['/home']);
      },({error})=>{
        console.log(error);
        rejects(error.msg);
      });
    })
  }

  public registration(email, password, username, router : Router){
    return new Promise<any>((resolve,rejects) =>{
      this.http.post('https://examen-todo-app.herokuapp.com/user/',{
      email,
      password,
      username
      }).subscribe((data : any) => {

        resolve('');
        router.navigate(['/login']);
      },({error})=>{
        console.log(error);
        rejects(error.msg);
      });
    })
  }

  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('username');
  }

  public isLog(){
    const token = localStorage.getItem('token');
    return this.jwt.isTokenExpired(token);
  }
}

