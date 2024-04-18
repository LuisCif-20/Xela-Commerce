import { Component, ElementRef, OnDestroy, OnInit, ViewChild, computed, inject } from '@angular/core';
import { MenuOption } from '../../../shared/interfaces/menu-options.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { AuthStatus } from '../../../auth/interfaces/auth-status.enum';
import { Subscription } from 'rxjs';
import { showError, showErrorMsg, showSuccess } from '../../../shared/utilities/showSnackBar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CurrencyService } from '../../services/currency.service';
import { PublicationService } from '../../../shared/services/publication.service';
import { Publication } from '../../../shared/interfaces/publication.interface';
import { ReportPublicationComponent } from '../../../shared/components/report-publication/report-publication.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  templateUrl: './common-user-layout.component.html',
  styleUrl: './common-user-layout.component.css'
})
export class CommonUserLayoutComponent implements OnInit, OnDestroy {

  @ViewChild('text') public input?: ElementRef<HTMLInputElement> ;

  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private authService = inject(AuthService);
  private pubsService = inject(PublicationService);
  private currencyService = inject(CurrencyService);
  
  private currSub?: Subscription;
  private pubsSub?: Subscription;
  private authStatus?: Subscription;
  private status: AuthStatus = AuthStatus.checking;
  private id?: number;
  private disabled: boolean = true;
  
  private _publications: Publication[] = [];

  public publications: Publication[] = this._publications;
  public color: string = 'primary';
  public options: MenuOption[] = [];
  public search: boolean = false;

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
    this.authService.currentUser().subscribe((user) => {
      if (user) {
        this.id = user.id;
        this.disabled = false;
      }
    })
    if (this.status === AuthStatus.authenticated) {
      this.currSub = this.currencyService.getCurrencies().subscribe();
    }
    this.pubsSub = this.pubsService.publications().subscribe((pubs) => {
      this._publications = pubs.filter(pub => pub.state === 'approved');
      if (this.id) {
        this._publications = this._publications.filter(pub => pub.user.id !== this.id)
      }
    })
  }

  ngOnDestroy(): void {
    this.currSub?.unsubscribe();
    this.pubsSub?.unsubscribe();
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

  onChat(pub_id: number) {
    if (this.disabled) {
      showErrorMsg(this.snackBar, 'Necesitas crear una cuenta.')
    }
  }

  reportPublication(pub_id: number) {
    if (this.disabled) {
      showErrorMsg(this.snackBar, 'Necesitas crear una cuenta.')
    } else {
      this.dialog.open(ReportPublicationComponent, {
        data: {
          user_id: this.id,
          pub_id
        }
      });
    }
  }

  onInputChange() {
    const value: string = this.input!.nativeElement.value;
    if (value.length !== 0) {
      this.search = true;
      setTimeout(() => {
        this.publications = this._publications.filter(pub => pub.title.toLowerCase().includes(value.toLowerCase()));
      }, 500);
    } else {
      this.search = false;
    }
  }

}
