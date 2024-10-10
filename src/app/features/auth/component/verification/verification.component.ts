import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '@core/services/app.service';
import { ValidatorsService } from '@core/services/validation.service';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss'],
})
export class VerificationComponent implements OnInit {
  isError!: boolean;
  isLoading!: boolean;
  userId: any;
  inputConfig = {
    length: 4,
    allowNumbersOnly: true,
    inputStyles: {
      font: 'normal normal bold 20px/48px Quicksand',
      outline: 'none',
      textAlign: 'center',
      width: ' 80px !important',
      height: ' 62px !important',
      border: 'none',
      borderRadius: '4px !important',
      color: '#bbb',
      fontWeight: '600',
      backgroundColor: '#F5F5F5',
    },
  };

  form: FormGroup = new FormGroup({
    activationCode: new FormControl('', [ValidatorsService.required]),
    authTokenId: new FormControl(''),
  });

  constructor(
    private appService: AppService,
    private authsService: AuthService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {
    activatedRoute.queryParams.subscribe((params: any) => {
      this.form.controls['authTokenId'].setValue(params.t);
    });
  }

  ngOnInit() {
    if (localStorage.getItem('verify') == 'true') {
      this.route.navigate(['/auth/forget-password']);
    }
  }

  onOtpChange(v: string) {
    this.form.get('activationCode')?.setValue(v);
  }

  async otpVerify() {
    if (this.form.invalid) {
      this.isError = true;
      this.form.markAllAsTouched();
      return;
    }
    if (this.isLoading) {
      return;
    }
    this.isLoading = true;
    this.isError = false;

    this.authsService.auths
      .create(this.form.value, 'verifyOTP')
      .then((d) => {
        console.log(d);
        if (d?.id) {
          // this.appService.toster('Verified successfully');
          // localStorage.setItem('verify', 'true');
          // this.route.navigate(['/auth/reset-password']);
          return;
        } else {
          this.appService.toster(
            'sorry, we could not find an account with this email address'
          );
          this.isLoading = false;
          return;
        }
      })
      .catch((err) => {
        this.isLoading = false;
        this.appService.toster(err);
      });
  }

  error(err: any) {
    return ValidatorsService.error(err, 'code');
  }
  localization = {
    pageTitle: 'VerificationPage.pageTitle',
    description: 'VerificationPage.description',
    btnTxt: 'VerificationPage.btnTxt',
    backbtnTxt: 'VerificationPage.backbtnTxt',
  };
}
