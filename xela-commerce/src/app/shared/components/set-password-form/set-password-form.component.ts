import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';
import { passwordPattern } from '../../validators/patterns';
import { isFieldOneEqualsFieldTwo } from '../../validators/validators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { showSuccess, showError } from '../../utilities/showSnackBar';

@Component({
  selector: 'shared-set-password-form',
  templateUrl: './set-password-form.component.html',
  styles: ``
})
export class SetPasswordFormComponent {

  private snackBar = inject(MatSnackBar);
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);

  public setPwdForm: FormGroup = this.formBuilder.group({
    old_password: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.pattern(passwordPattern)]],
    c_password: ['', [Validators.required]]
  }, {
    validators: [
      isFieldOneEqualsFieldTwo('password', 'c_password')
    ]
  });

  constructor () { }

  public onSetPwd() {
    if (this.setPwdForm.valid) {
      const formData: FormData = new FormData();
      const form = this.setPwdForm.value;
      Object.keys(form).forEach((key) => {
        if (key !== 'c_password') {
          formData.append(key, form[key]);
        }
      });
      this.authService.setPwd(formData).subscribe({
        next: () => showSuccess(this.snackBar, 'Contraseña actualizada con exito.'),
        error: (err) => showError(this.snackBar, err)
      });
    }
  }

}
