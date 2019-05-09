import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
} from '@angular/material';

interface AnemoError {
  errors?: string[],
}

export type ErrorMessageFormats = string | { _body?: string, error?: string | { message?: string } | AnemoError };

/**
 * The Notification Service
 *
 * Handles notifications (toasts) opening functionality
 * */
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  /**
   * The "constructor"
   * @param {MatSnackBar} snackBar A SnackBar
   * */
  constructor(
    private snackBar: MatSnackBar,
  ) { }

  /**
   * Config and show success notification
   * @param {string} message The message to show in the snackBar.
   * @param {string} action The label for the snackBar action.
   * @param {MatSnackBarConfig} config Additional configuration options for the snackBar.
   * */
  public success(message: string, action?: string, config?: MatSnackBarConfig): void {
    this.openSnack(message, action, {
      ...config,
      panelClass: ['success'],
    });
  }

  /**
   * Config and show error notification
   * @param {string} message The message to show in the snackBar.
   * @param {string} action The label for the snackBar action.
   * @param {MatSnackBarConfig} config Additional configuration options for the snackBar.
   * @returns {string} formatted error
   * */
  public error(message: ErrorMessageFormats, action?: string, config?: MatSnackBarConfig): string {
    const error = this.formatErrorMessage(message) || 'Something went wrong';
    this.openSnack(error, action, {
      ...config,
      panelClass: ['error'],
    });
    return error;
  }

  /**
   * Get and format error message
   * @param {ErrorMessageFormats} error
   * @returns {string} formatted error
   * */
  public formatErrorMessage(error: ErrorMessageFormats): string {
    let message = '';
    if (typeof error === 'string') {
      message = error;
    } else if (error._body) {
      try {
        message = JSON.parse(error._body).message;
      } catch { }
    } else if (typeof error.error === 'string') {
      try {
        message = JSON.parse(error.error).message;
      } catch { }
    } else if (error.error) {
      if (error.error['message']) {
        message = error.error['message'];
      } else { // anemo /rest/ fail :|
        message = error.error['errors'].join('; ');
      }
    }

    return message;
  }

  /**
   * Config and show warning notification
   * @param {string} message The message to show in the snackBar.
   * @param {string} action The label for the snackBar action.
   * @param {MatSnackBarConfig} config Additional configuration options for the snackBar.
   * */
  public warning(message: string, action?: string, config?: MatSnackBarConfig): void {
    this.openSnack(message, action, {
      ...config,
      panelClass: ['warning'],
    });
  }

  /**
   * Config and show information notification
   * @param {string} message The message to show in the snackBar.
   * @param {string} action The label for the snackBar action.
   * @param {MatSnackBarConfig} config Additional configuration options for the snackBar.
   * */
  public info(message: string, action?: string, config?: MatSnackBarConfig): void {
    this.openSnack(message, action, {
      ...config,
      panelClass: ['info'],
    });
  }

  /**
   * Show notification
   * @param {string} message The message to show in the snackBar.
   * @param {string} action The label for the snackBar action.
   * @param {MatSnackBarConfig} config Additional configuration options for the snackBar.
   * */
  private openSnack(message: string, action?: string, config?: MatSnackBarConfig): void {
    if (typeof config.panelClass === 'undefined') {
      config.panelClass = ['info', 'snack-notification'];
    } else {
      if (typeof config.panelClass === 'string') {
        config.panelClass += 'snack-notification';
      } else {
        config.panelClass.push('snack-notification');
      }
    }

    this.snackBar.open(message, action, {
      duration: 6000,
      ...config,
    });
  }

}
