import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';


@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error : string = "   ";

  formLogin : FormGroup;

  constructor(
    public loginService : LoginService,
    public router : Router,
    private fb : FormBuilder,
    private renderer : Renderer2) {
      this.renderer.removeClass(document.body,'home');
      this.renderer.addClass(document.body,'selector');
    }

  ngOnInit(): void {

    this.formLogin = this.fb.group({
      email : ['',[
        Validators.required,
      ]],
      password : ['',[
        Validators.required,
      ]]
    })
  }

  Login(){
    if(this.formLogin.valid){
      this.loginService.login(this.formLogin.get('email').value, this.formLogin.get('password').value,this.router).catch(err => this.error = err);
    }
  }

  Register(){
    this.router.navigate(['/registration']);
  }
}

