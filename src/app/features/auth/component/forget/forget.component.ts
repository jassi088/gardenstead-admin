import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '@core/services/app.service';
import { ValidatorsService } from 'src/app/core/services/validation.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.scss'],
})
export class ForgetComponent implements OnInit {
  userId: any;
  isLoading!: boolean;

  form: FormGroup = new FormGroup({
    email: new FormControl('', [
      ValidatorsService.required,
      ValidatorsService.emailValidator,
      ValidatorsService.spaceValidator,
    ]),
    authMethod: new FormControl('email'),
  });

  constructor(
    private authsService: AuthService,
    private appService: AppService,
    private route: Router
  ) {}

  ngOnInit() {}

  async forgot() {
    try {
      if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
      }
      this.isLoading = true;
      let d = await this.authsService.auths.create(
        this.form.value,
        'forgotPassword'
      );
      if (d) {
        this.appService.toster('Code sent successfully');
        localStorage.removeItem('verify');
        this.route.navigate(['/auth/verify'], {
          queryParams: { t: d.authTokenId },
        });
        return;
      } else {
        this.appService.toster(
          'sorry, we could not find an account with this email address'
        );
        this.isLoading = false;
        return;
      }
    } catch (err) {
      this.isLoading = false;
      this.appService.toster(err);
    }
  }

  localization = {
    pageTitle: 'ForgotPasswordPage.pageTitle',
    description: 'ForgotPasswordPage.description',
    emailLabel: 'ForgotPasswordPage.emailLabel',
    btnTxt: 'ForgotPasswordPage.btnTxt',
    backbtnTxt: 'ForgotPasswordPage.backbtnTxt',
  };
}
