import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  error : string = ' ';
  myForm : FormGroup;

  constructor(
    private loginService : LoginService,
    private router: Router,
    private fb : FormBuilder,
    private renderer : Renderer2
    ) {
    }
  ngOnInit(): void {
    this.myForm = this.fb.group({
      email : ['',[
        Validators.required,
        Validators.email,
      ]],
      password : ['',[
        Validators.required,
        Validators.minLength(6)
      ]],
      username : ['',[
        Validators.required,
      ]],
    })
  }

  ngAfterViewInit(): void {
    this.renderer.addClass(document.body,'selector');
  }

  Cerrar(){
    this.router.navigate(['login']);
  }

  Submit(){
    if(this.myForm.valid){
      this.loginService.registration(this.myForm.get('email').value, this.myForm.get('password').value,this.myForm.get('username').value,this.router)
        .catch(err => this.error = err);
    }
  }
}

