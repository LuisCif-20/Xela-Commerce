import { Component, Input, inject } from '@angular/core';
import { catchFile } from '../../utilities/catchFile';
import { CatchFileResponse } from '../../interfaces/catch-file-response.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { showSuccess, showError } from '../../utilities/showSnackBar';

@Component({
  selector: 'shared-set-profile-picture',
  templateUrl: './set-profile-picture.component.html',
  styleUrl: './set-profile-picture.component.css'
})
export class SetProfilePictureComponent {

  @Input({ required: true }) public currentPfp!: string;

  private snackBar = inject(MatSnackBar);
  private authService = inject(AuthService);
  private file?: File;

  constructor () { }

  public onCatchFile(event: Event): void {
    const response: CatchFileResponse = catchFile(event);
    this.currentPfp = response.url;
    this.file = response.file;
  }

  public onSetPfp() {
    if (this.file) {
      const formData = new FormData();
      formData.append('profile_picture', this.file);
      this.authService.setPfp(formData).subscribe({
        next: () => showSuccess(this.snackBar, 'Foto de perfil actualizada.'),
        error: (err) => showError(this.snackBar, err)
      });
    }
  }

}
