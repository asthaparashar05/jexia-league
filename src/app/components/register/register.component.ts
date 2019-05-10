import { Component, OnInit, Input, ViewChild, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, BehaviorSubject } from 'rxjs';

import { User } from '../../services/model/user';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isSubmitted  =  false;
  authSubject  =  new  BehaviorSubject(false);

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder ) { }

  ngOnInit() {
    this.registerForm  =  this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get formControls() { return this.registerForm.controls; }

  register(form) {
    this.authService.signUp(form.value).subscribe((res) => {
      if (!res) {
        return false;
      }});
  }
}
