import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AuthComponent } from './auth.component'
import { LogInComponent } from './component/log-in/log-in.component'
import { AuthRoutes } from './auth.routing'
import { ForgetComponent } from './component/forget/forget.component'
import { SharedModule } from 'src/app/shared/shared.module'
import { FormFieldModule } from 'src/app/shared/modules/form-field/form-field.module'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { VerificationComponent } from './component/verification/verification.component'
import { ResetPasswordComponent } from './component/reset-password/reset-password.component'
import { PageComponentsModule } from 'src/app/shared/modules/page-components/page-components.module'
import { NgOtpInputModule } from 'ng-otp-input';
import { HttpClientModule } from '@angular/common/http'
import { LocalizationModule } from '@shared/modules/localization/localization.module'
@NgModule({
  imports: [
    CommonModule,
    AuthRoutes,
    SharedModule,
    FormFieldModule,
    MatProgressSpinnerModule,
    PageComponentsModule,
    NgOtpInputModule,
    HttpClientModule,
    LocalizationModule
  ],
  declarations: [
    AuthComponent,
    LogInComponent,
    ForgetComponent,
    VerificationComponent,
    ResetPasswordComponent,
  ],
})
export class AuthModule {}
