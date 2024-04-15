import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../interfaces/auth.interface';
import { redirectTo } from '../../../shared/utilities/redirect';
import { showSuccess, showError } from '../../../shared/utilities/showSnackBar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Colors } from '../../../shared/interfaces/colores.enum';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  templateUrl: './sign-in-page.component.html',
  styles: ``
})
export class SignInPageComponent implements OnInit, OnDestroy {

  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  private currentUser?: Subscription;

  public signInForm: FormGroup = this.formBuilder.group({
    user_name:  ['nery@rodas', [Validators.required]],
    password:   ['Nbpjxdxd%2', [Validators.required]]
  });
  public role: string = '';

  constructor () { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser().subscribe((user: User|null) => {
      if (user) {
        this.role = user.role.name;
      }
    });
  }

  ngOnDestroy(): void {
      this.currentUser?.unsubscribe();
  }

  private makeFormData() {
    const formData: FormData = new FormData();
    const credentials = this.signInForm.value;
    Object.keys(credentials).forEach((key) => {
      formData.append(key, credentials[key]);
    })
    return formData;
  }

  public onSignIn() {
    this.authService.signIn(this.makeFormData()).subscribe({
      next: () => {
        this.router.navigateByUrl(redirectTo(this.role));
        showSuccess(this.snackBar, 'Sesión iniciada correctamente.');
      },
      error: (err) => showError(this.snackBar, err)
    });
  }

}
