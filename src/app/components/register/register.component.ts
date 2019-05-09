import { Component, ElementRef, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { finalize } from 'rxjs/operators/finalize';
import { LoginService, NotificationService, User } from '../../services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  ngOnInit() {
  }

  /**
   * Flag for toggling styles on submit button
   * */
  public submitted = false;
  /**
   * Store message from server in case of register failure
   * */
  public errorMessage: string;
  /**
   * Whether the form was submitted successfully
   * */
  public submitSuccess = false;
  /**
   * User register form
   * @type {FormGroup}
   */
  public readonly userRegisterForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.pattern(/^(?!\s+$).+/)]],
  });

  /**
   * The "constructor"
   * @param {LoginService} loginService A LoginService
   * @param {NotificationService} notificationService A Notification Service
   * @param {FormBuilder} fb Reactive Form Builder
   * @param {MatDialog} dialog Material Dialog
   * */
  constructor(
    private loginService: LoginService,
    private notificationService: NotificationService,
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) {}

  /**
   * The user object from the form values
   * @returns {RegisterUser} the user
   */
  public get user(): User {
    return {
      email: this.userRegisterForm.controls.email.value,
      password: this.userRegisterForm.controls.password.value,
    }
  }

  /**
   * Register a user
   */
  public register() {
    this.submitted = true;

    this.loginService.register(this.user)
      .pipe(finalize(() => this.submitted = false))
      .subscribe(
        () => this.registerSuccess(),
        err => this.registerFailure(err),
    );
  }

  /**
   * Sets success flag to true and cleans error message.
   */
  private registerSuccess(): void {
    this.errorMessage = '';
    this.submitSuccess = true;
  }

  /**
   * Manages request Failure
   *
   * @param data {HttpErrorResponse} Failure response from UMS
   */
  private registerFailure(data: HttpErrorResponse) {
    this.errorMessage = this.notificationService.formatErrorMessage(data);
    this.submitSuccess = false;
  }

  /**
   * Check if submit button is disabled
   * @returns {boolean} disabled
   * */
  public get isSubmitDisabled(): boolean {
    return this.userRegisterForm.invalid || this.submitted;
  }

  /**
   * The e-mail form control
   * @returns {AbstractControl}
   */
  public get emailControl(): AbstractControl {
    return this.userRegisterForm.controls.email;
  }

  /**
   * The password form control
   * @returns {AbstractControl}
   */
  public get passwordControl(): AbstractControl {
    return this.userRegisterForm.controls.password;
  }

}
