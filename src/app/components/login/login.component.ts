import { Component, OnInit, Input, ViewChild, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from  '@angular/router';

import { Observable, BehaviorSubject } from  'rxjs';

import { AuthService } from  '../../services/auth/auth.service';
import { Ums } from  '../../services/model/ums';
import { User } from  '../../services/model/user';
import { Users } from  '../../services/model/users';
import { Project } from  '../../services/model/project';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitted  =  false;
  authSubject  =  new  BehaviorSubject(false);

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder ) { }

  ngOnInit() {
    this.loginForm  =  this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get formControls() { return this.loginForm.controls; }

  login(form){
    this.authService.register(form.value).subscribe((res)=>{
      console.log("Logged in!");
      // this.router.navigateByUrl('sports');
    });    

    // this.isSubmitted = true;
    // if(this.loginForm.invalid){
    //   return;
    // }
    // this.authService.login(this.loginForm.value);
    // this.router.navigateByUrl('/sports');
  }
}

