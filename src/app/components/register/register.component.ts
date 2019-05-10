import { Component, OnInit, Input, ViewChild, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from  '@angular/router';

import { Observable, BehaviorSubject } from  'rxjs';

import { User } from  '../../services/model/user';
import { Users } from  '../../services/model/users';
import { Project } from  '../../services/model/project';
import { AuthService } from  '../../services/auth/auth.service';

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
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get formControls() { return this.registerForm.controls; }

  register(form){
    this.authService.signUp(form.value).subscribe((res) => {
      if(!res) {
        return false;
      }
    });

    this.authService.getAuthToken().subscribe((res) => {
      if(!res) {
        return false;
      }
    });
 
    this.authService.addProject(form.value.name).subscribe((res) => {
      if(!res) {
        return false;
      }
    });
 
    this.authService.addUser(form.value).subscribe((res) => {
      if(!res) {
        return false;
      }
    });

    if (this.authService.authToken && this.authService.projectId && this.authService.userId) {
      localStorage.setItem('ACCESS_TOKEN', this.authService.authToken);
      this.authSubject.next(true);
      this.router.navigateByUrl('sports');
    }
  }
}
