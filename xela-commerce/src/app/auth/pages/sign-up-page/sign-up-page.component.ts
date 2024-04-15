import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { fullNamePattern, passwordPattern } from '../../../shared/validators/patterns';
import { isFieldOneEqualsFieldTwo } from '../../../shared/validators/validators';
import moment from 'moment';
import { showSuccess, showError } from '../../../shared/utilities/showSnackBar';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  templateUrl: './sign-up-page.component.html',
  styles: ``
})
export class SignUpPageComponent {

  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private formbuilder = inject(FormBuilder);
  private authService = inject(AuthService);

  public maxDate = new Date();
  public firstForm: FormGroup = this.formbuilder.group({
    full_name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern(fullNamePattern)]],
    birthdate: [null, [Validators.required]]
  });
  public secondForm: FormGroup = this.formbuilder.group({
    user_name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
    password: ['', [Validators.required, Validators.minLength(5), Validators.pattern(passwordPattern)]],
    c_password: ['', [Validators.required]]
  }, {
    validators: [
      isFieldOneEqualsFieldTwo('password', 'c_password')
    ]
  });

  private makeFormData(): FormData {
    const formData: FormData = new FormData();
    const form_1 = this.firstForm.value;
    const form_2 = this.secondForm.value;
    Object.keys(form_1).forEach((key) => {
      if (key === 'birthdate') {
        const date: string = moment(form_1[key]).format('YYYY-MM-DD');
        formData.append(key, date);
      } else {
        formData.append(key, form_1[key]);
      }
    });
    Object.keys(form_2).forEach((key) => {
      if (key !== 'c_password') {
        formData.append(key, form_2[key]);
      }
    })
    formData.append('role_id', '2');
    return formData;
  }

  public onSignUp() {
    if (this.firstForm.valid && this.secondForm.valid) {
      this.authService.signUp(this.makeFormData()).subscribe({
        next: () => {
          this.router.navigateByUrl('/common');
          showSuccess(this.snackBar, 'Cuenta creada con exito.');
        },
        error: (err) => showError(this.snackBar, err)
      });
    }
  }

}
