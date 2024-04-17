import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fullNamePattern, passwordPattern } from '../../../shared/validators/patterns';
import { isFieldOneEqualsFieldTwo } from '../../../shared/validators/validators';
import moment from 'moment';
import { AuthService } from '../../../auth/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { showError, showSuccess } from '../../../shared/utilities/showSnackBar';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-add-admin-page',
  templateUrl: './add-admin-page.component.html',
  styles: ``
})
export class AddAdminPageComponent {

  private fBuilder = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private authService = inject(AuthService);
  

  public maxDate = new Date();
  public adminForm: FormGroup = this.fBuilder.group({
    c_password: ['', [Validators.required]],
    birthdate:  [null, [Validators.required]],
    user_name:  ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
    password:   ['', [Validators.required, Validators.minLength(5), Validators.pattern(passwordPattern)]],
    full_name:  ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern(fullNamePattern)]]
  }, {
    validators: [
      isFieldOneEqualsFieldTwo('password', 'c_password')
    ]
  });

  private makeFormData(): FormData {
    const formData = new FormData();
    const data = this.adminForm.value;
    Object.keys(data).forEach((key) => {
      if (key !== 'c_password') {
        if (key === 'birthdate') {
          const date: string = moment(data[key]).format('YYYY-MM-DD');
          formData.append(key, date);
        } else {
          formData.append(key, data[key]);
        }
      }
    });
    formData.append('role_id', '1');
    return formData;
  }

  onRegister() {
    if (this.adminForm.valid) {
      this.authService.regAdmin(this.makeFormData()).subscribe({
        next: () => {
          this.onCancel();
          showSuccess(this.snackBar, 'Administrador creado correctamente.')
        },
        error: (err) => showError(this.snackBar, err)
      })
    }
  }

  onCancel() {
    this.adminForm.reset();
  }
}
