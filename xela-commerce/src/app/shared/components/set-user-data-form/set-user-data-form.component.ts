import { Component, Input, OnInit, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interfaces/auth.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fullNamePattern } from '../../validators/patterns';
import { MatSnackBar } from '@angular/material/snack-bar';
import { showSuccess, showError } from '../../utilities/showSnackBar';

import moment from 'moment';

@Component({
  selector: 'shared-set-user-data-form',
  templateUrl: './set-user-data-form.component.html',
  styles: ``
})
export class SetUserDataFormComponent implements OnInit {

  @Input({ required: true }) public user!: User;

  private snackBar = inject(MatSnackBar);
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);

  public maxDate = new Date();
  public userForm: FormGroup = this.formBuilder.group({
    full_name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern(fullNamePattern)]],
    birthdate: [null, [Validators.required]],
    user_name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]]
  });

  constructor () { }

  ngOnInit(): void {
    this.userForm.setValue({ 
      full_name: this.user.full_name,
      birthdate: this.returnDate(this.user.birthdate),
      user_name: this.user.user_name
    });
  }

  private returnDate(date: string) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    return newDate;
  }

  public onSetInfo() {
    if (this.userForm.valid) {
      const formData: FormData = new FormData();
      const form = this.userForm.value;
      Object.keys(form).forEach((key) => {
        if (key === 'birthdate') {
          const date: string = moment(form[key]).format('YYYY-MM-DD');
          formData.append(key, date);
        } else {
          formData.append(key, form[key]);
        }
      });
      this.authService.setInfo(formData).subscribe({
        next: () => showSuccess(this.snackBar, 'Tu información a sido actualizada.'),
        error: (err) => showError(this.snackBar, err)
      })
    }
  }

}
