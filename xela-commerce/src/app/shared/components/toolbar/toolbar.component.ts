import { Component, Input, OnDestroy, OnInit, computed, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { MenuOption } from '../../interfaces/menu-options.interface';
import { Subscription } from 'rxjs';
import { AuthStatus } from '../../../auth/interfaces/auth-status.enum';

@Component({
  selector: 'shared-toolbar',
  templateUrl: './toolbar.component.html',
  styles: `
    .tool {
      display: flex;
      align-items: center;
    }
  `
})
export class ToolbarComponent implements OnInit, OnDestroy {

  @Input({ required: true }) public color!: string;
  @Input({ required: true }) public options!: MenuOption[];

  private router = inject(Router);
  private authService = inject(AuthService);
  private authStatus?: Subscription;

  public status?: string;

  constructor() { }

  ngOnInit(): void {
    this.authStatus = this.authService.isLoggedIn().subscribe((status: AuthStatus) => {
      this.status = status;
    });
  }
  
  ngOnDestroy(): void {
    this.authStatus?.unsubscribe();
  }

  public onLogOut() {
    this.authService.logOut();
    this.router.navigateByUrl('/common');
  }

}
