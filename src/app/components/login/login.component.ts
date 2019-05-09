import { Component, OnInit, Input, ViewChild, } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators/finalize';
import { LoginService, NotificationService, User } from '../../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  /**
   * User store, comes from parent component
   * */
  @Input() user: User;
  /**
   * Form view
   * */
  @ViewChild('f') form: NgForm;

  /**
   * Recaptcha token
   */
  private recaptchaToken: string = null;
  /**
   * Flag for toggling styles on submit button
   * disabled until recaptcha token will be loaded
   * */
  public disabled = true;

  /**
   * The "constructor"
   * @param {LoginService} loginService A LoginService
   * @param {NotificationService} notificationService A LoginService
   * @param {Router} router A Router
   * */
  constructor(
    private loginService: LoginService,
    private notificationService: NotificationService,
    private router: Router,
  ) {}

  ngOnInit() {
  }

  /**
   * Handle the form data to log a user
   */
  public login() {
    if (!this.form.valid) {
      return
    }

    this.disabled = true;

    this.loginService.login(this.user)
      .pipe(finalize(() => this.disabled = false))
      .subscribe(
        () => {
          this.router.navigateByUrl('/dashboard');
        },
        e => {
          const errorMessage = e.status === '401' || '403' ? 'incorrect email or password' : e;
          this.notificationService.error(errorMessage);
        },
      );
  }

  /**
   * Resets the form and removes errors
   */
  public resetForm() {
    this.form.reset();
  }
}

