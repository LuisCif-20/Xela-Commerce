import { Component, OnDestroy, OnInit, computed, inject } from '@angular/core';
import { MenuOption } from '../../../shared/interfaces/menu-options.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { AuthStatus } from '../../../auth/interfaces/auth-status.enum';
import { Subscription } from 'rxjs';
import { showError, showSuccess } from '../../../shared/utilities/showSnackBar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CurrencyService } from '../../services/currency.service';
import { PublicationService } from '../../../shared/services/publication.service';


@Component({
  templateUrl: './common-user-layout.component.html',
  styles: ``
})
export class CommonUserLayoutComponent implements OnInit, OnDestroy {

  private authService = inject(AuthService);
  private pubsService = inject(PublicationService);
  private currencyService = inject(CurrencyService);
  private currSub?: Subscription;
  private authStatus?: Subscription;
  private pubsSubs?: Subscription;
  private status: AuthStatus = AuthStatus.checking;
  public color: string = 'primary';
  public options: MenuOption[] = [];

  constructor() { }

  ngOnInit(): void {
    this.authStatus = this.authService.isLoggedIn().subscribe((status: AuthStatus) => {
      const defaultOption: MenuOption = {
        label: 'Ver Publicaciones',
        icon: 'visibility',
        route: './publications'
      };
      this.options = [defaultOption, ...this.checkStatus(status)];
      this.status = status;
    });
    if (this.status === AuthStatus.authenticated) {
      this.currSub = this.currencyService.getCurrency().subscribe();
    }
    this.pubsSubs = this.pubsService.getPublications().subscribe();
  }

  ngOnDestroy(): void {
    this.pubsSubs?.unsubscribe();
    this.currSub?.unsubscribe();
    this.authStatus?.unsubscribe();
  }

  private checkStatus(status: AuthStatus): MenuOption[] {
    if (status === AuthStatus.authenticated) {
      return [
        {
          label: 'Mis Publicaciones',
          icon: 'folder_shared',
          route: './my-publications'
        },
        {
          label: 'Agregar Publicacion',
          icon: 'library_add',
          route: './add-publication'
        },
        {
          label: 'Gestionar Monedas',
          icon: 'savings',
          route: './currencies'
        },
        {
          label: 'Realizar Transacción',
          icon: 'receipt_long',
          route: './transactions'
        }
      ];
    }
    return [];
  }

}
