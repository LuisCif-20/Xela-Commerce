import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackBarComponent } from "../components/snack-bar/snack-bar.component";
import { Colors } from "../interfaces/colores.enum";
import { HttpErrorResponse } from "@angular/common/http";

const showSnackBar = (snackBar: MatSnackBar, message: string, color:Colors = Colors.accent) => {
    let icon: string = 'check_circle';
    if (color === Colors.primary) {
        icon = 'info';
    } else if (color === Colors.warn) {
        icon = 'cancel';
    }
    snackBar.openFromComponent(SnackBarComponent, {
        duration: 1500,
        data: {
            message,
            color,
            icon,
        },
    });
}

const makeMsg = (err: HttpErrorResponse): string => {
    if (typeof err.error['reason'] === 'object') {
        return 'Prueba cambiar tus datos';
    }
    return err.error['reason'];
}

export const showSuccess = (snackBar: MatSnackBar, message: string) => {
    showSnackBar(snackBar, message);
}

export const showError = (snackBar: MatSnackBar, err: HttpErrorResponse) => {
    showSnackBar(snackBar, makeMsg(err), Colors.warn);
}
