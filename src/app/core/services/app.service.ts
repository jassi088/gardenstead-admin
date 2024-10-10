import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '@models/user.model';
import { LocalStorageService } from './localStorage.service';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  user!: User;

  constructor(
    public _snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog,
    public http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    if (this.localStorageService.user) {
      this.user = this.localStorageService.user;
    }
  }

  toster(message: any, duration?: number) {
    this._snackBar.open(message, 'Close', {
      duration: duration || 1000,
    });
  }

  setUser(userModel: User) {
    this.user = userModel;
    this.localStorageService.user = userModel;
  }
}
