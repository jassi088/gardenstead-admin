import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorage } from '@core/constants/local-storage.enum';
import { User } from '@models/user.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(private router: Router) {}
  get token() {
    return localStorage.getItem(LocalStorage.TOKEN) || '';
  }

  set token(token: string) {
    localStorage.setItem(LocalStorage.TOKEN, token);
  }

  get user() {
    if (localStorage?.getItem(LocalStorage.USER)) {
      return JSON.parse(localStorage?.getItem(LocalStorage.USER) || '');
    } else {
      return new User();
    }
  }

  set user(u: User) {
    localStorage.setItem(LocalStorage.USER, JSON.stringify(u));
  }

  formGroupSetValue(form: FormGroup, value: { [key: string]: any }) {
    Object.keys(form.controls).forEach((key) => {
      const control = form.get(key);
      if (value && value[key] !== undefined) {
        if (control instanceof FormControl) {
          control.setValue(value[key]);
        } else if (control instanceof FormGroup) {
          this.formGroupSetValue(control, value[key]);
        } else if (control instanceof FormArray) {
          control.controls.forEach((arrayControl, index) => {
            const arrayItem: Array<any> = value[key][index];
            if (arrayControl instanceof FormControl) {
              arrayControl.setValue(arrayItem);
            } else if (arrayControl instanceof FormGroup) {
              this.formGroupSetValue(arrayControl, arrayItem);
            }
          });
        }
      }
    });
  }
  clearAdmin() {
    localStorage.clear();
    this.router.navigate(['/auth/log-in']);
  }
}
