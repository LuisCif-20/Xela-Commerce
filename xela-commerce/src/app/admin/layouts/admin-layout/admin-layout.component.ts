import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { MenuOption } from '../../../shared/interfaces/menu-options.interface';
import { AuthStatus } from '../../../auth/interfaces/auth-status.enum';

@Component({
  templateUrl: './admin-layout.component.html',
  styles: ``
})
export class AdminLayoutComponent {


  public color: string = 'warn';

  public options: MenuOption[] = [
    {
      label: 'Revisar Publicaciones',
      icon: 'pageview',
      route: './publications'
    },
    {
      label: 'Publicaciones Reportadas',
      icon: 'report',
      route: './reported-publications'
    },
    {
      label: 'Agregar Administrador',
      icon: 'person_add',
      route: './add-admin'
    }

  ];
}
