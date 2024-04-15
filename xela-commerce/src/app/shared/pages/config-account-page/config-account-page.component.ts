import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../../../auth/interfaces/auth.interface';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'shared-config-account',
  templateUrl: './config-account-page.component.html',
  styles: ``
})
export class ConfigAccountPageComponent implements OnInit, OnDestroy {

  private readonly imgUrl: string = environment.IMAGES_URL;

  private authService = inject(AuthService);
  private currentUser?: Subscription;

  public pfp?: string;
  public user?: User;

  constructor() { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser().subscribe((user: User | null) => {
      if (user) {
        this.pfp = `${this.imgUrl}/profile-pictures/${user.profile_picture}`;
        this.user = user;
      }      
    });
  }

  ngOnDestroy(): void {
    this.currentUser?.unsubscribe();
  }

}
