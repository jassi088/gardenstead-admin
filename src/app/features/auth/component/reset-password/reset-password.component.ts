import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '@core/services/app.service';
import { ValidatorsService } from 'src/app/core/services/validation.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  showPassword: boolean = false;
  showPassword2: boolean = false;
  isLoading?: boolean;
  btnDisabled?: boolean;
  id: any;

  form: FormGroup = new FormGroup(
    {
      newPassword: new FormControl('', [
        ValidatorsService.required,
        ValidatorsService.spaceValidator,
        ValidatorsService.passwordValidator,
      ]),
      confirmPassword: new FormControl('', [
        ValidatorsService.required,
        ValidatorsService.spaceValidator,
      ]),
    },
    {
      validators: [
        ValidatorsService.compareValidator('newPassword', 'confirmPassword'),
      ],
    }
  );
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private appService: AppService,
    private router: Router
  ) {
    activatedRoute.queryParams.subscribe((params: any) => {
      this.id = params.id;
    });
  }
  ngOnInit() {}

  resetPassword() {
    // if (this.form.invalid) {
    //   this.form.markAllAsTouched();
    //   return;
    // }
    // this.isLoading = true;
    // this.userService.users
    //   .update(
    //     this.id,
    //     this.form.value,
    //     null as any,
    //     'updatePassword/' + this.id
    //   )
    //   .then((d: any) => {
    //     this.appService.toster('Password reset successfully.');
    //     this.btnDisabled = false;
    //     this.isLoading = false;
    //     localStorage.removeItem('verify');
    this.router.navigate(['/auth/log-in']);
    // })
    // .catch((err: any) => {
    //   this.btnDisabled = false;
    //   this.appService.toster(err, 2000000);
    // });
  }

  localization = {
    pageTitle: 'ResetPasswordPage.pageTitle',
    passwordLabel: 'ResetPasswordPage.passwordLabel',
    confirmPasswordLabel: 'ResetPasswordPage.confirmPasswordLabel',
    forgettxt: 'ResetPasswordPage.forgettxt',
    btnTxt: 'ResetPasswordPage.btnTxt',
  };
}
