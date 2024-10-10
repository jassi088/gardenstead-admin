import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidatorsService } from 'src/app/core/services/validation.service';
import { AppService } from 'src/app/core/services/app.service';
import { LocalStorageService } from '@core/services/localStorage.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit {
  isLoading: boolean = false;

  form: FormGroup = new FormGroup({
    email: new FormControl('', [
      ValidatorsService.required,
      ValidatorsService.emailValidator,
      ValidatorsService.spaceValidator,
    ]),
    password: new FormControl('', [
      ValidatorsService.required,
      ValidatorsService.spaceValidator,
    ]),
  });

  constructor(
    private localStorageService: LocalStorageService,
    private route: Router,
    private authsService: AuthService,
    private appService: AppService
  ) {}

  ngOnInit() {}

  async signIn() {
    try {
      if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
      }
      this.isLoading = true;
      let d = await this.authsService.auths.create(this.form.value, 'login');
      if (d) {
        this.appService.setUser(d);
        this.localStorageService.token = d.session.accessToken;
        this.route.navigate(['/admin/user']);
        this.isLoading = false;
      }
    } catch (err) {
      this.isLoading = false;
      this.appService.toster(err);
    }
  }

  localization = {
    pageTitle: 'LoginPage.pageTitle',
    description: 'LoginPage.description',
    emailLabel: 'LoginPage.emailLabel',
    passwordLabel: 'LoginPage.passwordLabel',
    forgettxt: 'LoginPage.forgettxt',
    btnTxt: 'LoginPage.btnTxt',
  };
}
