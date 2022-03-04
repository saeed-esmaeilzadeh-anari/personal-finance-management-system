import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { merge } from 'lodash-es';
import { FuseConfirmationDialogComponent } from '@Components/services/confirmation/dialog/dialog.component';
import { FuseConfirmationConfig } from '@Components/services/confirmation/confirmation.types';

@Injectable()
export class FuseConfirmationService {
  private _defaultConfig: FuseConfirmationConfig = {
    title: 'Confirm action',
    message: 'Are you sure you want to confirm this action?',
    icon: {
      show: true,
      name: 'heroicons_outline:exclamation',
      color: 'warn',
    },
    actions: {
      confirm: {
        show: true,
        label: 'Confirm',
        color: 'warn',
      },
      cancel: {
        show: true,
        label: 'Cancel',
      },
    },
    dismissible: false,
  };

  /**
   * Constructor
   */
  constructor(private _matDialog: MatDialog) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  open(
    config: FuseConfirmationConfig = {
      title: '',
      message: '',
      icon: {
        show: false,
        name: '',
        color: 'primary',
      },
      actions: {
        confirm: {
          show: false,
          label: '',
          color: 'primary',
        },
        cancel: {
          show: false,
          label: '',
        },
      },
      dismissible: false,
    }
  ): MatDialogRef<FuseConfirmationDialogComponent> {
    // Merge the user config with the default config
    const userConfig = merge({}, this._defaultConfig, config);

    // Open the dialog
    return this._matDialog.open(FuseConfirmationDialogComponent, {
      autoFocus: false,
      disableClose: !userConfig.dismissible,
      data: userConfig,
      panelClass: 'fuse-confirmation-dialog-panel',
    });
  }
}
